/**
 * src/utility/fastly.js
 * A bunch of Fastly image optimization helper functions.
 */

export const DEFAULT_FASTLY_OPTIONS = {
  fit: 'crop'
}

function stringComparator (a, b) {
  if (a < b) {
    return -1
  } else if (a > b) {
    return 1
  } else {
    return 0
  }
}

/**  */
/**
 * imageQuery
 * Returns a HTML query string of all the Fastly options given
 *
 * @param {object} [options] A list of fastly image optimization API options
 * @return {string}
 */
export function imageQuery (options) {
  if (options == null || Object.keys(options).length < 1) {
    return ''
  } else {
    // The first 4 lines of this is to extend the object while ignoring null
    // values. It's kinda a mess, but Object.assign doesn't ignore nulls and
    // Object spread is giving off typescript errors.
    return [DEFAULT_FASTLY_OPTIONS, options]
      .map((obj) => Object.entries(obj))
      .reduce((a, b) => [...a, ...b], [])
      .filter(([, value]) => (value != null))
      .reverse()
      .filter(([key], i, a) => (a.findIndex(([n]) => (n === key)) === i))
      .map(([key, value]) => [key.toLowerCase(), value])
      .sort(([aKey], [bKey]) => stringComparator(aKey, bKey))
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&')
  }
}

/**
 * joinUrl
 * Joins strings to form a URL
 *
 * @param {string} ...parts A list of url chunks
 * @return {string}
 */
export function joinUrl (...parts) {
  return parts
    .map((p) => p.endsWith('/') ? p.substring(0, p.length - 1) : p)
    .map((p) => p.startsWith('/') ? p.substring(1, p.length) : p)
    .join('/')
}

/**
 * imageUrl
 * Returns a full image URL with attached options
 *
 * @param {string} root The domain for the image
 * @param {string} image The src for the image
 * @param {object} [options] The fastly API options
 * @return {string}
 */
export function imageUrl (root, image, options) {
  const url = joinUrl(root, image)
  const query = imageQuery(options)

  if (query === '') {
    return url
  } else {
    return `${url}?${query}`
  }
}
