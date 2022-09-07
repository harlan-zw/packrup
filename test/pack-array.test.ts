import { describe, it } from 'vitest'
import { packArray } from '../src'

describe('pack array', () => {
  it('basic', () => {
    const packed = packArray([
      {
        name: 'description',
        content: 'desc',
      },
    ])

    expect(packed).toMatchInlineSnapshot(`
      {
        "description": "desc",
      }
    `)
  })

  it('arrays', () => {
    const packed = packArray([
      {
        name: 'description',
        content: 'desc',
      },
      {
        name: 'description',
        content: 'desc 2',
      },
      {
        property: 'og:locale:alternate',
        content: 'fr',
        key: 'fr',
      },
      {
        property: 'og:locale:alternate',
        content: 'zh',
        key: 'zh',
      },
    ])

    expect(packed).toMatchInlineSnapshot(`
      {
        "description": [
          "desc",
          "desc 2",
        ],
        "og:locale:alternate": "zh",
      }
    `)
  })

  it('de-duping', () => {
    const out = packArray([
      {
        name: 'description',
        content: 'desc 1',
        key: 'desc',
      },
      {
        name: 'description',
        content: 'desc 2',
        key: 'desc',
      },
      {
        name: 'description',
        content: 'desc 3',
        key: 'desc',
      },
    ])

    expect(out).toMatchInlineSnapshot(`
      {
        "description": "desc 3",
      }
    `)
  })

  it('advanced', () => {
    const out = packArray([
      {
        name: 'description',
        content: 'desc',
        key: 'desc',
      },
      {
        name: 'description',
        content: 'desc 2',
        key: 'desc',
      },
      {
        property: 'og:locale:alternate',
        content: 'fr',
        key: 'fr',
      },
      {
        property: 'og:locale:alternate',
        content: 'zh',
        key: 'zh',
      },

      // pragma
      {
        'content': '5;url=https://example.com',
        'http-equiv': 'refresh',
      },

      {
        'content': 'default-src \'self\' https://example.com; content-src none',
        'http-equiv': 'content-security-policy',
      },
      {
        name: 'description',
        content: 'desc',
        key: 'desc',
      },
      {
        content: '1234567890',
        property: 'fb:app_id',
      },
    ], {
      key: ['name', 'property', 'http-equiv'],
      value: 'content',
    })

    expect(out).toMatchInlineSnapshot(`
      {
        "content-security-policy": "default-src 'self' https://example.com; content-src none",
        "description": "desc",
        "fb:app_id": "1234567890",
        "og:locale:alternate": "zh",
        "refresh": "5;url=https://example.com",
      }
    `)
  })
})
