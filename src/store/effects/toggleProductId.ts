import type { Event, Store } from 'src/store/store';
import type { Middleware } from 'src/util-types';

const middleware: Middleware<Store, Event> = (api) => (next) => (event) => {
  if (event.type === 'feed/TOGGLE') {
    api.dispatch({ type: 'feed/UNSUB' })

    // Let the reducer flip productId.
    // A bit quirky, but this is how Redux works...
    const res = next(event)

    api.dispatch({ type: 'feed/SUB' })

    return res
  }

  return next(event)
}

export default middleware
