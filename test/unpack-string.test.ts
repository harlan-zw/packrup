import { describe, it } from 'vitest'
import { unpackToString } from '../src'

describe('unpack string', () => {
  it('html attributes', () => {
    const packed = unpackToString({
      src: 'https://example.com/image.jpg',
      width: 800,
      height: 600,
      alt: 'My image',
      secure_url: 'https://example.com/image.jpg',
    }, {
      keyValueSeparator: '=',
      wrapValue: '"',
      entrySeparator: ' ',
    })
    expect(packed).toMatchInlineSnapshot('"src=\\"https://example.com/image.jpg\\" width=\\"800\\" height=\\"600\\" alt=\\"My image\\" secure_url=\\"https://example.com/image.jpg\\""')
  })

  it('viewport', () => {
    const packed = unpackToString({
      width: 600,
      height: 600,
      userScalable: 'yes',
      maximumScale: 5,
      initialScale: 1,
      viewportFit: 'auto',
    }, {
      resolve({ key, value }) {
        if (typeof value === 'number')
          value = value.toString()
        if (typeof value === 'string') {
          // kebab case key
          key = key.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)
        }
        if (typeof value === 'boolean')
          return `${key}`
      },
      keyValueSeparator: '=',
      entrySeparator: ', ',
    })
    expect(packed).toMatchInlineSnapshot('"width=600, height=600, userScalable=yes, maximumScale=5, initialScale=1, viewportFit=auto"')
  })

  it('robots', () => {
    const robots = unpackToString({
      'noindex': true,
      'nofollow': true,
      'max-snippet': 20,
      'maxi-image-preview': 'large',
    }, {
      resolve({ key, value }) {
        if (typeof value === 'boolean')
          return `${key}`
      },
      keyValueSeparator: ':',
      entrySeparator: ', ',
    })
    expect(robots).toMatchInlineSnapshot('"noindex, nofollow, max-snippet:20, maxi-image-preview:large"')
  })
})
