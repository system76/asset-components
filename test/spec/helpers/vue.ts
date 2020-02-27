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
test(propRangeAssert, 'quality', 1, 100)
test(propRangeAssert, 'saturation', -100, 100)
