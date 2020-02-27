/**
 * src/utility/html.js
 * Some various HTML utility.
 */

/** Creates all of the attributes for source tags given the sizes */
/**
 * sourceTagAttributes
 * Creates all of the attributes for source tags given the sizes
 *
 * @param {string} src Image src
 * @param {number[]|object[]} sizes The sizes to output for the image
 * @param {function} builder Function to build the url given the attributes
 * @param {object} opts Function options
 * @return {object[]} A list of attributes to attach to source tags
 */
export function sourceTagAttributes (src, sizes, builder, opts) {
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

function minWidthMediaQuery (width) {
  const halfWidth = Math.ceil(width / 2)

  return [
    `(min-width: ${width}px)`,
    `(min-width: ${halfWidth}px) and (-webkit-min-device-pixel-ratio: 2)`,
    `(min-width: ${halfWidth}px) and (min-resolution: 2dppx)`,
    `(min-width: ${halfWidth}px) and (min-resolution: 192dpi)`
  ].join(', ')
}

function webpSourceAttributes (attrs, builder) {
  return {
    ...attrs,
    srcset: builder({ format: 'webp', width: attrs.width }),
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
 * Returns the mime type for an image extension
 *
 * @param {string} file
 * @return {string|null}
 */
export function fileType (ext) {
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
