# marton-20211115

- [Live Demo](https://b51d3.sse.codesandbox.io/)
- [Live Demo with editor](https://codesandbox.io/s/github/sarimarton/orderbook)

- If the above doesn't work, possibly it'll work at [here](https://codesandbox.io/s/github/sarimarton/marton-20211115). (I just renamed the repo recently, codesandbox seems to cache the old one.

## Available Scripts

#### npm install

Installs the app.

#### npm start

Runs the app in development mode.
Open http://localhost:8080 to view it in the browser.

#### npm run build

Builds a static copy to the `build/` folder.

## Notes

- I've used Tailwind JIT. Partly out of experimentation, partly from earlier experience. I have no hard feelings about the debate over Tailwind, I guess I sense the trade-off about it. It probably does good to performance.
- No tests unfortunately. I could've made some unit tests with channeling some state value on some components, although I see a compromise in that. But I might be wrong.
- The Spread is negative, which possibly goes back to a wrong calculation, although I've checked it.
- The depth is fixed to 50
- Responsiveness is accomplished with CSS, including the ordering (flex-reverse)
- As for effect handling, I tend to see redux-observables overrated, and using simple middlewares underrated, but I might be wrong here too.
- Performance metrics is done with a simple performance.now() measurement, and the value is used for setting the render throttling.
