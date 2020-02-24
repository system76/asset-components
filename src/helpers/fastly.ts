/**
 * src/helpers/fastly.ts
 * A bunch of Fastly image optimization helpers.
 */

export interface IFastly {
  /** The width of the image in pixels */
  width?: Number,
  /** The height of the image in pixels */
  height?: Number,
  /** How the image fits when you resize it down */
  fit?: 'bounds' | 'cover' | 'crop',
  /** The format the image should output as */
  format?: 'png' | 'jpg' | 'pjpg' | 'webp',
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
    return Object.entries(options)
      .map(([key, value]) => [key.toLowerCase(), value])
      .sort(([aKey], [bKey]) => stringComparator(aKey, bKey))
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&')
  }
}

/** Returns a full image URL with included Fastly options */
export function imageUrl (root: string, image: string, options?: IFastly) {
  const trimmedRoot = root.endsWith('/') ? root.substring(0, root.length - 1) : root
  const trimmedImage = image.startsWith('/') ? image.substring(1, image.length) : image

  const url = `${trimmedRoot}/${trimmedImage}`
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
