import type { Event, Store } from 'src/store/store';
import type { ApiOrderbook } from 'src/store/types';
import type { Middleware } from 'src/util-types'

const webSocket = new WebSocket('wss://www.cryptofacilities.com/ws/v1')

const middleware: Middleware<Store, Event> = (api) => (next) => (event) => {
  if (event.type === 'INIT') {
    webSocket.onopen = function (event) {
      var msg = {
        event: 'subscribe',
        feed: 'book_ui_1',
        product_ids: ['PI_XBTUSD']
      }

      webSocket.send(JSON.stringify(msg))
    }

    webSocket.onmessage = function (event) {
      const data: ApiOrderbook = JSON.parse(event.data)

      switch (data.feed) {
        case 'book_ui_1_snapshot':
          api.dispatch({ type: 'SNAPSHOT_UPDATE', data })
          break
        case 'book_ui_1':
          if (api.getState().main.orderbook.feed !== '') {
            api.dispatch({ type: 'DELTA_UPDATE', data })
          }
          break
      }
    }
  }

  return next(event)
}

export default middleware
