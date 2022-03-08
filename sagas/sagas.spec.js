import test from 'tape'

import { incrementAsync } from './saga'

test('incrementAsync Saga test', (assert) => {
  const gen = incrementAsync() //generator function. Remember it returns `IteratorObject`

  //Check the values yielded by the generator
  assert.deepEqual(
    gen.next().value,
    call(dalay, 1000), // this will return the iterator object, which can be used for testing
    'incrementAsync Saga must call delay(1000)'
  )

  assert.deepEqual(
    gen.next().value,
    put({ type: 'INCREMENT' }),
    'incrementAsync Saga must dispatch an INCREMENT action'
  )

  assert.deepEqual(
    gen.next(),
    { done: true, value: undefined },
    'incrementAsync Saga must be done'
  )

  assert.end()
})