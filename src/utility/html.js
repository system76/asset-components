/**
 * src/utility/html.js
 * Some various HTML utility.
 */

import { imageUrl } from './fastly'

function filterObject (obj, keys) {
  const entries = Object.entries(obj)
    .filter(([key]) => keys.includes(key))

  const output = {}

  for (const [key, value] of entries) {
    output[key] = value
  }

  return output
}

/**
 * sourceTagAttributes
 * Creates all of the attributes for source tags given the sizes
 *
 * @param {string} domain Domain for CDN images
 * @param {string} src Image src
 * @param {number[]|object[]} sizes The sizes to output for the image
 * @param {object} opts Fastly options (plus a custom webp property to toggle webp sources)
 * @return {object[]} A list of attributes to attach to source tags
 */
export function sourceTagAttributes (domain, src, sizes, opts) {
  return sizes
    .map((val) => (typeof val === 'object') ? val : { width: val })
    .sort((a, b) => (b.width - a.width))
    .map((v) => ({ ...(opts || {}), ...v }))
    .map((attrs, i, a) => ({
      ...attrs,
      media: (i === a.length - 1) ? null : minWidthMediaQuery(a[i + 1].width + 1),
      srcset: imageUrl(domain, src, attrs),
      type: fileType(attrs.format || fileExt(src))
    }))
    .reduce((a, attrs) => {
      if (opts == null || opts.webp) {
        return [...a, webpSourceAttributes(domain, src, attrs), attrs]
      } else {
        return [...a, attrs]
      }
    }, [])
    .map((attrs) => filterObject(attrs, ['media', 'srcset', 'type']))
}

function minWidthMediaQuery (width) {
  const halfWidth = Math.ceil(width / 2)

  return [
    `(min-width: ${width}px)`,
    `(min-width: ${halfWidth}px) and (-webkit-min-device-pixel-ratio: 2)`,
    `(min-width: ${halfWidth}px) and (min-resolution: 2dppx)`,
    `(min-width: ${halfWidth}px) and (min-resolution: 192dpi)`
  ].join(', ')
}

function webpSourceAttributes (domain, src, attrs) {
  return {
    ...attrs,
    srcset: imageUrl(domain, src, { ...attrs, format: 'webp' }),
    type: fileType('webp')
  }
}

/**
 * fileExt
 * Returns the extension of a file string
 *
 * @param {string} file
 * @return {string|null}
 */
export function fileExt (file) {
  if (file.indexOf('.') === -1) {
    return null
  } else {
    return file.split('.').pop()
  }
}

/**
 * fileType
 * Returns the mime type for an image extension. It also supports the Fastly
 * image optimization `format` value.
 *
 * @param {string} file
 * @return {string|null}
 */
export function fileType (ext) {
  switch (ext) {
    case 'webp':
    case 'webpll':
    case 'webply':
      return 'image/webp'
    case 'png':
    case 'png8':
      return 'image/png'
    case 'jpg':
    case 'jpeg':
    case 'pjpg':
    case 'bjpg':
      return 'image/jpg'
    case 'gif':
      return 'image/gif'
    default:
      return null
  }
}
