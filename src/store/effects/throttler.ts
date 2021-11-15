import { throttle } from 'lodash';
import type { Event, Store } from 'src/store/store';
import type { Middleware } from 'src/util-types';

const middleware: Middleware<Store, Event> = (api) => {
  const fn = () => {
    api.dispatch({ type: 'app/RENDER_TICK' })
  }

  let throttledFn = fn

  return (next) => (event) => {
    if (event.type === 'feed/DELTA_UPDATE') {
      throttledFn()
    }

    // A 40ms render time of half of the panel results in a 400ms throttle,
    // seems safe enough.
    if (event.type === 'app/RENDER_TIME_UPDATE') {
      throttledFn = throttle(fn, Math.round(event.data * 10), { leading: false })
    }

    return next(event)
  }
}

export default middleware
