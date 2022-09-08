import { describe, it } from 'vitest'
import { packObject } from '../src'

describe('pack array', () => {
  it('basic', () => {
    const packed = packObject({
      image: {
        src: {
          '1x': 'https://example.com/image.png',
          '2x': 'https://example.com/image@2x.png',
        },
        alt: 'Example Image',
      },
    }, {
      key: 'image.src.1x',
      value: 'image.alt',
    })

    expect(packed).toMatchInlineSnapshot(`
      {
        "https://example.com/image.png": "Example Image",
      }
    `)
  })
})
