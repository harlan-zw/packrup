import { describe, it } from 'vitest'
import { packArray, unpackToArray } from '../src'

describe('unpack array', () => {
  it('basic', () => {
    const packed = unpackToArray({
      description: 'test',
      image: {
        src: 'https://example.com/image.jpg',
        width: 800,
        height: 600,
        alt: 'My image',
        secure_url: 'https://example.com/image.jpg',
      },
    }, {
      key: 'property',
      value: 'content',
      resolveKeyData: ({ key }) => {
        if (key === 'src')
          return 'og:image'
        return `og:image:${key}`
      },
      resolveValueData: ({ value }) => {
        if (typeof value === 'number')
          return value.toString()
        return value
      },
    })

    expect(packed).toMatchInlineSnapshot(`
      [
        {
          "content": "test",
          "property": "og:image:description",
        },
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
        "og:image:description": "test",
        "og:image:height": "600",
        "og:image:secure_url": "https://example.com/image.jpg",
        "og:image:width": "800",
      }
    `)
  })

  it('meta tags', () => {
    const tags = unpackToArray({
      charset: 'utf-8',
      themeColor: 'red',
      mobileWebAppCapable: 'yes',
      appleMobileWebAppCapable: 'yes',
      appleMobileWebAppStatusBarStyle: 'black',
      appleMobileWebAppTitle: 'my app',
      formatDetection: 'telephone=no',
      msapplicationTileImage: 'https://example.com/icon.png',
      msapplicationTileColor: 'red',
      msapplicationConfig: 'config.xml',
      ogImageSecureUrl: 'https://example.com/image.png',
      ogImageType: 'image/png',
      ogImageWidth: '1280',
      ogImageHeight: 720,
      fbAppId: '1234567890',
      twitterCard: 'summary',
      twitterTitle: 'my title',
      twitterDescription: 'my description',
      twitterImage: 'https://example.com/image.png',
      twitterImageAlt: 'my image',
      twitterSite: '@my_site',
      twitterSiteId: '1234567890',
      twitterCreator: '@my_creator',
      twitterCreatorId: '1234567890',
    }, {
      key({ key }) {
        if (key === 'charset')
          return 'charset'
        return /^(og|twitter|fb)/.test(key) ? 'property' : 'name'
      },
      value({ key }) {
        return key === 'charset' ? 'charset' : 'content'
      },
      resolveKeyData: ({ key }) => {
        // lowercase key
        return key.replace(/([A-Z])/g, match => `-${match[0].toLowerCase()}`)
      },
      // resolveKeyData: (key) => MetaPackingSchema[key]?.keyValue || fixKeyCase(key),
      // resolveValueData: (value) => transformValues(typeof value === 'number' ? value.toString() : value),
    })

    expect(tags).toMatchInlineSnapshot(`
      [
        {
          "charset": "utf-8",
        },
        {
          "content": "red",
          "name": "theme-color",
        },
        {
          "content": "yes",
          "name": "mobile-web-app-capable",
        },
        {
          "content": "yes",
          "name": "apple-mobile-web-app-capable",
        },
        {
          "content": "black",
          "name": "apple-mobile-web-app-status-bar-style",
        },
        {
          "content": "my app",
          "name": "apple-mobile-web-app-title",
        },
        {
          "content": "telephone=no",
          "name": "format-detection",
        },
        {
          "content": "https://example.com/icon.png",
          "name": "msapplication-tile-image",
        },
        {
          "content": "red",
          "name": "msapplication-tile-color",
        },
        {
          "content": "config.xml",
          "name": "msapplication-config",
        },
        {
          "content": "https://example.com/image.png",
          "property": "og-image-secure-url",
        },
        {
          "content": "image/png",
          "property": "og-image-type",
        },
        {
          "content": "1280",
          "property": "og-image-width",
        },
        {
          "content": 720,
          "property": "og-image-height",
        },
        {
          "content": "1234567890",
          "property": "fb-app-id",
        },
        {
          "content": "summary",
          "property": "twitter-card",
        },
        {
          "content": "my title",
          "property": "twitter-title",
        },
        {
          "content": "my description",
          "property": "twitter-description",
        },
        {
          "content": "https://example.com/image.png",
          "property": "twitter-image",
        },
        {
          "content": "my image",
          "property": "twitter-image-alt",
        },
        {
          "content": "@my_site",
          "property": "twitter-site",
        },
        {
          "content": "1234567890",
          "property": "twitter-site-id",
        },
        {
          "content": "@my_creator",
          "property": "twitter-creator",
        },
        {
          "content": "1234567890",
          "property": "twitter-creator-id",
        },
      ]
    `)
  })
})
