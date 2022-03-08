import { put, takeEvery, all, call } from 'redux-saga/effects'

//delay function that returns a Promise that will resolve after a specified number of milliseconds.
//Used in this case to block the generator
const delay = (ms) => new Promise(res => setTimeout(res, ms))

//stupid first sync function
export function* helloSaga() {
  console.log('Hello Sagas!')
}

//Worker saga that will perform the async increment task
//`put` - effect, which is just a plain JS object which contain instructions to be fulfilled by the middleware.
//Once the middleware retrieves an Effect yielded by saga, the saga is paused until the Effect is fulfilled.
//In our case, until the `INCREMENT` is dispatched.
export function* incrementAsync() {
  yield call(delay, 1000) //block the generator for 1000ms. Suspend saga until the Promise is returned from function
  yield put({ type: 'INCREMENT' }) //middleware resume until next yield (this line). Instructs middleware to dispatch `INCREMENT` action
}


//Watcher saga, which will spawn a new incrementAsync task on each INREMENT_ASYNC
//`takeEvery()` - built-in helper function which listen for dispatched `INCREMENT_ASYNC` action and then it runs `incrementAsync` each time
export function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

//Saga which yields an array of results of calling the two sagas. This means 2 resulting Generators will started in parallel
//So next we can only have to call the `sagaMiddleware.run()` on the root saga in `main.js`
export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchIncrementAsync(),
  ])
}