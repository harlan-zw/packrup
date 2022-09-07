import { describe, it } from 'vitest'
import { unpackToString } from '../src'

describe('unpack string', () => {
  it('basic', () => {
    const packed = unpackToString({
      src: 'https://example.com/image.jpg',
      width: 800,
      height: 600,
      alt: 'My image',
      secure_url: 'https://example.com/image.jpg',
    })
    expect(packed).toMatchInlineSnapshot('"src=\\"https://example.com/image.jpg\\" width=\\"800\\" height=\\"600\\" alt=\\"My image\\" secure_url=\\"https://example.com/image.jpg\\""')
  })
})
