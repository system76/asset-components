/**
 * test/spec/utility/vue.js
 * Tests some Vue prop validation
 */

import test from 'ava'

import { VUE_FASTLY_MODIFICATION_PROPS as props } from '../../../src/utility/vue'

function propRangeAssert (t, prop, min, max) {
  const runMin = min - 100
  const runMax = max + 100

  for (let i = runMin; i <= runMax; i++) {
    t[String(i >= min && i <= max)](props[prop].validator(i))
  }
}

propRangeAssert.title = (_title, prop, min, max) =>
  `${prop} is valid between ${min} and ${max}`

test(propRangeAssert, 'blur', 1, 1000)
test(propRangeAssert, 'brightness', -100, 100)
test(propRangeAssert, 'contrast', -100, 100)
test(propRangeAssert, 'quality', 1, 100)
test(propRangeAssert, 'saturation', -100, 100)
