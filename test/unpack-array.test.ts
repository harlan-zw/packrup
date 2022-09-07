import { describe, it } from 'vitest'
import { packArray, unpackToArray } from '../src'

describe('unpack array', () => {
  it('basic', () => {
    const packed = unpackToArray({
      src: 'https://example.com/image.jpg',
      width: 800,
      height: 600,
      alt: 'My image',
      secure_url: 'https://example.com/image.jpg',
    }, {
      key: 'property',
      value: 'content',
      resolveKeyData: (key) => {
        if (key === 'src')
          return 'og:image'
        return `og:image:${key}`
      },
      resolveValueData: (value) => {
        return typeof value === 'string' ? value : value.toString()
      },
    })

    expect(packed).toMatchInlineSnapshot(`
      [
        {
          "content": "https://example.com/image.jpg",
          "property": "og:image",
        },
        {
          "content": "800",
          "property": "og:image:width",
        },
        {
          "content": "600",
          "property": "og:image:height",
        },
        {
          "content": "My image",
          "property": "og:image:alt",
        },
        {
          "content": "https://example.com/image.jpg",
          "property": "og:image:secure_url",
        },
      ]
    `)

    const unpacked = packArray(packed)
    expect(unpacked).toMatchInlineSnapshot(`
      {
        "og:image": "https://example.com/image.jpg",
        "og:image:alt": "My image",
        "og:image:height": "600",
        "og:image:secure_url": "https://example.com/image.jpg",
        "og:image:width": "800",
      }
    `)
  })
})
