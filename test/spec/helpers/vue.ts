/**
 * test/spec/helpers/vue.ts
 * Tests some Vue prop validation
 */

import test, { ExecutionContext } from 'ava'

import { VUE_FASTLY_MODIFICATION_PROPS as props } from '../../../src/helpers/vue'

function propRangeAssert (t: ExecutionContext, prop: string, min: number, max: number) {
  const runMin = min - 100
  const runMax = max + 100

  for (let i = runMin; i <= runMax; i++) {
    t[String(i >= min && i <= max)](props[prop].validator(i))
  }
}

propRangeAssert.title = (_title: string, prop: string, min: number, max: number) =>
  `${prop} is valid between ${min} and ${max}`

test(propRangeAssert, 'blur', 1, 1000)
test(propRangeAssert, 'brightness', -100, 100)
test(propRangeAssert, 'contrast', -100, 100)
test(propRangeAssert, 'height', 1, 8192)
test(propRangeAssert, 'quality', 1, 100)
test(propRangeAssert, 'saturation', -100, 100)
test(propRangeAssert, 'width', 1, 8192)

test('fit validates strings as enums', (t) => {
  t.true(props.fit.validator('bounds'))
  t.true(props.fit.validator('cover'))
  t.true(props.fit.validator('crop'))
  t.false(props.fit.validator('noop'))
})

test('format validates strings as enums', (t) => {
  t.true(props.format.validator('png'))
  t.true(props.format.validator('jpg'))
  t.true(props.format.validator('pjpg'))
  t.true(props.format.validator('webp'))
  t.false(props.format.validator('noop'))
})
