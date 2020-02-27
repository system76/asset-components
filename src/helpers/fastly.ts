/**
 * src/helpers/fastly.ts
 * A bunch of Fastly image optimization helpers.
 */

/** How you can fit an image when resizing */
export type IFastlyFit = 'bounds' | 'cover' | 'crop'

/** The image file types fastly can export */
export type IFastlyFormat = 'png' | 'jpg' | 'pjpg' | 'webp'

export interface IFastly {
  /** The width of the image in pixels */
  width?: Number,
  /** The height of the image in pixels */
  height?: Number,
  /** How the image fits when you resize it down */
  fit?: IFastlyFit,
  /** The format the image should output as */
  format?: IFastlyFormat,
  /** The quality the image should be optimized to */
  quality?: Number,
  /** The blurriness of the image betwee, 1 and 1000 */
  blur?: Number,
  /** The brightness of the image between -100 and 100 */
  brightness?: Number,
  /** The saturation of the image between -100 and 100 */
  saturation?: Number,
  /** The contrast of the image between -100 and 100 */
  contrast?: Number
}

export const DEFAULT_FASTLY_OPTIONS = {
  fit: 'crop'
} as IFastly

function stringComparator (a: string, b: string) {
  if (a < b) {
    return -1
  } else if (a > b) {
    return 1
  } else {
    return 0
  }
}

/** Returns a HTML query string of all the Fastly options given */
export function imageQuery (options?: IFastly) {
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

/** Joins strings to form a URL */
export function joinUrl (...parts: string[]) {
  return parts
    .map((p) => p.endsWith('/') ? p.substring(0, p.length - 1) : p)
    .map((p) => p.startsWith('/') ? p.substring(1, p.length) : p)
    .join('/')
}

/** Returns a full image URL with included Fastly options */
export function imageUrl (root: string, image: string, options?: IFastly) {
  const url = joinUrl(root, image)
  const query = imageQuery(options)

  if (query === '') {
    return url
  } else {
    return `${url}?${query}`
  }
}

/** Factory for easier access to imageUrl function */
export function imageUrlFactory (root: string) {
  return (image: string, options?: IFastly) => imageUrl(root, image, options)
}
