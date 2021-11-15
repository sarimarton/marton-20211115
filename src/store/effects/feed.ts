import type { Event, Store } from 'src/store/store'
import type { ApiDeltaMsg, ApiMsg } from 'src/store/types'
import type { Middleware } from 'src/util-types'

let webSocket: WebSocket
const queue: (() => boolean)[] = []

setInterval(() => {
  while (queue.length && queue[0]()) {
    queue.shift()
  }
}, 250)

const middleware: Middleware<Store, Event> = (api) => (next) => (event) => {
  if (event.type === 'INIT' || event.type === 'FOCUSED') {
    queue.push(
      // Some tear down steps
      () => {
        webSocket?.close?.()
        return true
      },
      () => {
        return !webSocket?.close || webSocket?.readyState === webSocket.CLOSED
      },
      () => {
        webSocket = new WebSocket('wss://www.cryptofacilities.com/ws/v1')
        webSocket.onopen = function (event) {
          queue.push(
            () => {
              return webSocket.readyState === WebSocket.OPEN
            },
            () => {
              webSocket.send(
                JSON.stringify({
                  event: 'subscribe',
                  feed: 'book_ui_1',
                  product_ids: [api.getState().main.productId]
                })
              )
              return true
            },
            () => {
              api.dispatch({ type: 'CONNECTED' })

              webSocket.onmessage = function (event) {
                console.log(webSocket.readyState)
                const data: ApiMsg = JSON.parse(event.data)

                if (data.feed === 'book_ui_1_snapshot') {
                  api.dispatch({ type: 'SNAPSHOT_UPDATE', data })
                  // @ts-ignore
                } else if (data.feed === 'book_ui_1' && !data.event) {
                  api.dispatch({
                    type: 'DELTA_UPDATE',
                    data: data as ApiDeltaMsg
                  })
                }
              }

              return true
            }
          )
        }

        return true
      }
    )
  }

  if (event.type === 'BLURRED') {
    queue.push(() => {
      webSocket.close()
      return true
    })
  }

  if (event.type === 'FEED_TOGGLED') {
    const currentProductId = api.getState().main.productId
    queue.push(
      () => {
        webSocket.send(
          JSON.stringify({
            event: 'unsubscribe',
            feed: 'book_ui_1',
            product_ids: [currentProductId]
          })
        )
        webSocket.close()
        return true
      },
      () => {
        api.dispatch({ type: 'INIT' })
        return true
      }
    )
  }

  return next(event)
}

export default middleware
