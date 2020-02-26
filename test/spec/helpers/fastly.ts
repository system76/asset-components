/**
 * test/spec/helpers/fastly.ts
 * Tests the simple fastly logic
 */

import test from 'ava'

import * as fastly from '../../../src/helpers/fastly'

test('imageQuery outputs an empty string if no options passed', (t) => {
  t.is(fastly.imageQuery(), '')
})

test('imageQuery sorts keys alphabetically', (t) => {
  const query = fastly.imageQuery({
    height: 500,
    width: 500
  })

  t.true(query.includes('height=500&width=500'))
})

test('imageQuery ignores null values', (t) => {
  const query = fastly.imageQuery({
    width: 200,
    blur: null
  })

  t.true(query.includes('width=200'))
  t.false(query.includes('blur=null'))
})

test('imageUrl does not leave duplicate slashes in url', (t) => {
  const url = fastly.imageUrl('https://test.com/', '/image.jpg')
  t.true(url.startsWith('https://test.com/image.jpg'))
})

test('imageUrl includes options', (t) => {
  const url = fastly.imageUrl('https://test.com/', '/image.jpg', { width: 500 })
  t.true(url.startsWith('https://test.com/image.jpg?'))
  t.true(url.includes('width=500'))
})

test('imageUrlFactory creates a new function that works as expected', (t) => {
  const fn = fastly.imageUrlFactory('https://test.com/')
  const url = fn('/image.jpg', { width: 500 })
  t.true(url.startsWith('https://test.com/image.jpg?'))
  t.true(url.includes('width=500'))
})
