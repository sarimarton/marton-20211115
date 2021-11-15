/**
 * Strong redux middleware typing. I couldn't find a usable one when I did
 * this. The one provided at https://redux.js.org/recipes/usage-with-typescript
 * is not strong.
 */
import type { Dispatch, Action, AnyAction } from 'redux'

export interface MiddlewareAPI<S, E extends AnyAction> {
  dispatch: Dispatch<E>
  getState(): S
}

// prettier-ignore
export type Middleware<S, E extends AnyAction> =
  (api: MiddlewareAPI<S, E>) =>
  (next: Dispatch<E>) =>
  (event: E) => ReturnType<Dispatch<E>>

// Redux (or whatnot) event - it creates a { type: 'eventName', ...rest } type
export type Event<
  Type extends string,
  ExtraProps extends object
> = Action<Type> & ExtraProps

// Modify properties
// https://stackoverflow.com/questions/41285211/overriding-interface-property-type-defined-in-typescript-d-ts-file
export type Modify<T, R> = Omit<T, keyof R> & R
