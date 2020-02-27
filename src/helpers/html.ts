/**
 * src/helpers/html.ts
 * Some various HTML helpers.
 */

import { IFastly } from './fastly'

type ISizes = number | { height: number, width: number }
type IBuilder = (opts: IFastly) => string
type ISourceOpts = { webp?: boolean }

/** Creates all of the attributes for source tags given the sizes */
export function sourceTagAttributes (src: string, sizes: ISizes[], builder: IBuilder, opts?: ISourceOpts) {
  return sizes
    .map((val) => (typeof val === 'object') ? val : { width: val })
    .sort((a, b) => (b.width - a.width))
    .map((attrs, i, a) => ({
      ...attrs,
      media: (i === a.length - 1) ? null : minWidthMediaQuery(a[i + 1].width + 1),
      srcset: builder({ width: attrs.width }),
      type: fileType(fileExt(src))
    }))
    .reduce((a, attrs) => {
      if (opts == null || opts.webp) {
        return [...a, webpSourceAttributes(attrs, builder), attrs]
      } else {
        return [...a, attrs]
      }
    }, [])
    .map((attrs) => ({ ...attrs, height: null, width: null }))
}

function minWidthMediaQuery (width: number) {
  const halfWidth = Math.ceil(width / 2)

  return [
    `(min-width: ${width}px)`,
    `(min-width: ${halfWidth}px) and (-webkit-min-device-pixel-ratio: 2)`,
    `(min-width: ${halfWidth}px) and (min-resolution: 2dppx)`,
    `(min-width: ${halfWidth}px) and (min-resolution: 192dpi)`
  ].join(', ')
}

function webpSourceAttributes (attrs: IFastly, builder: IBuilder) {
  return {
    ...attrs,
    srcset: builder({ format: 'webp', width: attrs.width }),
    type: fileType('webp')
  }
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
