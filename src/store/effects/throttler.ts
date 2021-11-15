import type { Event, Store } from 'src/store/store'
import type { Middleware } from 'src/util-types'
import { throttle } from 'lodash'

let webSocket: WebSocket

const middleware: Middleware<Store, Event> = (api) => {
  const fn = () => {
    api.dispatch({ type: 'RENDER_TICK' })
  }

  let throttledFn = fn

  return (next) => (event) => {
    if (event.type === 'DELTA_UPDATE') {
      throttledFn()
    }

    // A 40-ms render time of half of the panel results in a 400-ms throttle,
    // sounds safe enough.
    if (event.type === 'RENDER_TIME_UPDATE') {
      throttledFn = throttle(fn, event.data * 10)
    }

    return next(event)
  }
}

export default middleware
