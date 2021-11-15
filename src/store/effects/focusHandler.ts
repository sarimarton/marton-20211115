import type { Event, Store } from 'src/store/store';
import type { Middleware } from 'src/util-types';

// Simple message relaying
const middleware: Middleware<Store, Event> = (api) => (next) => (event) => {
  if (event.type === 'app/BLURRED') {
    api.dispatch({ type: 'feed/UNSUB' })
  }

  if (event.type === 'app/FOCUSED') {
    api.dispatch({ type: 'feed/SUB' })
  }

  return next(event)
}

export default middleware
