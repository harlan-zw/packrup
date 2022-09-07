import { describe, it } from 'vitest'
import { packString } from '../src'

describe('pack string', () => {
  it('basic', () => {
    const packed = packString('src="https://example.com/image.jpg" width="800" height="600"')
    expect(packed).toMatchInlineSnapshot(`
      {
        "height": "600",
        "src": "https://example.com/image.jpg",
        "width": "800",
      }
    `)
  })
})
