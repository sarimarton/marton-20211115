import type { Event, Store } from 'src/store/store'
import type { ApiDeltaMsg, ApiMsg } from 'src/store/types'
import type { Middleware } from 'src/util-types'

let webSocket: WebSocket
const queue: (() => boolean)[] = []

setInterval(() => {
  if (queue.length && queue[0]()) {
    queue.shift()
  }
}, 250)

const middleware: Middleware<Store, Event> = (api) => (next) => (event) => {
  if (event.type === 'INIT' || event.type === 'FOCUSED') {
    queue.push(() => {
      webSocket = new WebSocket('wss://www.cryptofacilities.com/ws/v1')
      webSocket.onopen = function (event) {
        var msg = {
          event: 'subscribe',
          feed: 'book_ui_1',
          product_ids: [api.getState().main.productId]
        }

        queue.push(() => {
          return webSocket.readyState === WebSocket.OPEN
        })

        queue.push(() => {
          webSocket.send(JSON.stringify(msg))
          api.dispatch({ type: 'CONNECTED' })

          webSocket.onmessage = function (event) {
            const data: ApiMsg = JSON.parse(event.data)

            if (data.feed === 'book_ui_1_snapshot') {
              api.dispatch({ type: 'SNAPSHOT_UPDATE', data })
              // @ts-ignore
            } else if (data.feed === 'book_ui_1' && !data.event) {
              api.dispatch({ type: 'DELTA_UPDATE', data: data as ApiDeltaMsg })
            }
          }

          return true
        })
      }

      return true
    })
  }

  if (event.type === 'BLURRED') {
    queue.push(() => {
      webSocket.close()
      return true
    })
  }

  return next(event)
}

export default middleware
