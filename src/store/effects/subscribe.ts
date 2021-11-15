import type { Event, Store } from 'src/store/store'
import type { ApiDeltaMsg, ApiMsg } from 'src/store/types'
import type { Middleware } from 'src/util-types'

let webSocket: WebSocket

const middleware: Middleware<Store, Event> = (api) => (next) => (event) => {
  if (event.type === 'INIT' || event.type === 'FOCUSED') {
    webSocket = new WebSocket('wss://www.cryptofacilities.com/ws/v1')

    webSocket.onopen = function (event) {
      var msg = {
        event: 'subscribe',
        feed: 'book_ui_1',
        product_ids: [api.getState().main.productId]
      }

      if (webSocket.readyState === WebSocket.OPEN) {
        webSocket.send(JSON.stringify(msg))
      } else {
      }

      // webSocket.send(JSON.stringify(msg))
    }

    webSocket.onmessage = function (event) {
      const data: ApiMsg = JSON.parse(event.data)

      if (data.feed === 'book_ui_1_snapshot') {
        api.dispatch({ type: 'SNAPSHOT_UPDATE', data })
        // @ts-ignore
      } else if (data.feed === 'book_ui_1' && !data.event) {
        // @ts-ignore
        api.dispatch({ type: 'DELTA_UPDATE', data: data as ApiDeltaMsg })
      }
    }
  }

  if (event.type === 'BLURRED') {
    webSocket.close()
  }

  return next(event)
}

export default middleware
