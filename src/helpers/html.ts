/**
 * src/helpers/html.ts
 * Some various HTML helpers.
 */

import { IFastly } from './fastly'

type IBuilder = (opts: IFastly) => string

/** Creates all of the attributes for source tags given the sizes */
export function sourceTagAttributes (src: string, sizes: number[], builder: IBuilder) {
  return sizes
    .sort((a, b) => (b - a))
    .map((width) => ({ width }))
    .map((opts, i, a) => ({
      ...opts,
      media: (i === a.length - 1) ? null : minWidthMediaQuery(a[i + 1].width + 1),
      srcset: builder({ width: opts.width }),
      type: fileType(fileExt(src))
    }))
    .reduce((a, opts) => ([...a, {
      ...opts,
      srcset: builder({ format: 'webp', width: opts.width }),
      type: fileType('webp')
    }, opts]), [])
    .map((opts) => ({ ...opts, width: null }))
}

/** Returns a min-width media query for a given size */
function minWidthMediaQuery (width: number) {
  const halfWidth = Math.ceil(width / 2)

  return [
    `(min-width: ${width}px)`,
    `(min-width: ${halfWidth}px) and (-webkit-min-device-pixel-ratio: 2)`,
    `(min-width: ${halfWidth}px) and (min-resolution: 2dppx)`,
    `(min-width: ${halfWidth}px) and (min-resolution: 192dpi)`
  ].join(', ')
}

/** Returns the extension of a file string */
export function fileExt (file: string) {
  if (file.indexOf('.') === -1) {
    return null
  } else {
    return file.split('.').pop()
  }
}

/** Returns the mime type for an image extension */
export function fileType (ext: string) {
  switch (ext) {
    case 'webp':
      return 'image/webp'
    case 'png':
      return 'image/png'
    case 'jpg':
    case 'jpeg':
      return 'image/jpg'
    default:
      return null
  }
}
