import type { Event, Store } from 'src/store/store'
import type { ApiDeltaMsg, ApiMsg } from 'src/store/types'
import type { Middleware } from 'src/util-types'

let webSocket: WebSocket
const queue: (() => void | boolean)[] = []

// Basic queue manager. It's polling, and shifts the queue unless the
// current item returns false. It could've been done with an event listener.
setInterval(() => {
  while (queue.length && queue[0]() !== false) {
    queue.shift()
  }
}, 200)

const middleware: Middleware<Store, Event> = (api) => (next) => (event) => {
  if (event.type === 'INIT' || event.type === 'FOCUSED') {
    queue.push(
      // Some tear down steps
      () => webSocket?.close?.(),
      () =>
        Boolean(
          !webSocket?.close || webSocket?.readyState === webSocket.CLOSED
        ),
      // Build up the connection
      () => {
        webSocket = new WebSocket('wss://www.cryptofacilities.com/ws/v1')
      },
      () => webSocket.readyState === WebSocket.OPEN,
      () => {
        webSocket.send(
          JSON.stringify({
            event: 'subscribe',
            feed: 'book_ui_1',
            product_ids: [api.getState().main.productId]
          })
        )
      },
      () => {
        api.dispatch({ type: 'CONNECTED' })

        webSocket.onmessage = function (event) {
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
      }
    )
  }

  if (event.type === 'BLURRED') {
    queue.push(() => {
      webSocket.close()
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
      },
      () => {
        api.dispatch({ type: 'INIT' })
      }
    )
  }

  return next(event)
}

export default middleware
