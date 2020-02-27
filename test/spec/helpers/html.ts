/**
 * test/spec/helpers/html.ts
 * Tests the html helper logic
 */

import test from 'ava'

import * as html from '../../../src/helpers/html'

function queryBuilder (opts: object) {
  return Object.entries(opts).map(([k, v]) => `${k}=${v}`).join('&')
}

test('sourceTagAttributes outputs webp above normal source tag', (t) => {
  const sourceTags = html.sourceTagAttributes('image.png', [320, 640], queryBuilder)

  t.is(sourceTags[0].type, 'image/webp')
  t.true(sourceTags[0].srcset.includes('format=webp'))
  t.is(sourceTags[1].type, 'image/png')
  t.false(sourceTags[1].srcset.includes('format='))
})

test('sourceTagAttributes sorts by largest size to smallest', (t) => {
  const sourceTags = html.sourceTagAttributes('image.png', [420, 1080, 640], queryBuilder)

  t.true(sourceTags[0].srcset.includes('width=1080'))
  t.true(sourceTags[2].srcset.includes('width=640'))
  t.true(sourceTags[4].srcset.includes('width=420'))
})

test('sourceTagAttributes sets min width to next width plus one', (t) => {
  const sourceTags = html.sourceTagAttributes('image.png', [320, 640], queryBuilder)

  t.true(sourceTags[0].media.includes('(min-width: 321px)'))
})

test('sourceTagAttributes does not set media on last 2', (t) => {
  const sourceTags = html.sourceTagAttributes('image.png', [320, 640], queryBuilder)

  t.is(sourceTags[2].media, null)
  t.is(sourceTags[3].media, null)
})

test('fileExt returns correct extension from images', (t) => {
  t.is(html.fileExt('test.webp'), 'webp')
  t.is(html.fileExt('image.png'), 'png')
  t.is(html.fileExt('/root/image.jpg'), 'jpg')
})

test('fileExt can handle multiple extension files', (t) => {
  t.is(html.fileExt('long.image.wide.jpg'), 'jpg')
})

test('fileExt returns null string if no ext found', (t) => {
  t.is(html.fileExt('thisisnotafile'), null)
})

test('fileType returns correct type for common image extensions', (t) => {
  t.is(html.fileType('webp'), 'image/webp')
  t.is(html.fileType('png'), 'image/png')
  t.is(html.fileType('jpg'), 'image/jpg')
  t.is(html.fileType('jpeg'), 'image/jpg')
})

test('fileType returns null for unknown extension', (t) => {
  t.is(html.fileType('txt'), null)
})
