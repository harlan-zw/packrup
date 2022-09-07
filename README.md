<h1 align='center'>packerup</h1>

<p align="center">
<a href='https://github.com/harlan-zw/packerup/actions/workflows/test.yml'>
<img src='https://github.com/harlan-zw/packerup/actions/workflows/test.yml/badge.svg' >
</a>
<a href="https://www.npmjs.com/package/packerup" target="__blank"><img src="https://img.shields.io/npm/v/packerup?color=2B90B6&label=" alt="NPM version"></a>
<a href="https://www.npmjs.com/package/packerup" target="__blank"><img alt="NPM Downloads" src="https://img.shields.io/npm/dm/packerup?color=349dbe&label="></a>
<br>
<a href="https://github.com/harlan-zw/packerup" target="__blank"><img alt="GitHub stars" src="https://img.shields.io/github/stars/harlan-zw/packerup?style=social"></a>
</p>

<p align="center">
Simple utils to pack (and unpack) arrays and strings to a flat object.  
</p>

<p align="center">
<table>
<tbody>
<td align="center">
<img width="800" height="0" /><br>
<i>Status:</i> In Development</b> <br>
<sup> Please report any issues 🐛</sup><br>
<sub>Made possible by my <a href="https://github.com/sponsors/harlan-zw">Sponsor Program 💖</a><br> Follow me <a href="https://twitter.com/harlan_zw">@harlan_zw</a> 🐦 • Join <a href="https://discord.gg/275MBUBvgP">Discord</a> for help</sub><br>
<img width="800" height="0" />
</td>
</tbody>
</table>
</p>


## Features

- Pack arrays and strings to a flat object
- Handles duplicates with `key`
- Supports nested key selections with `dot.notation`
- 🌳 Composable, tree-shakable and tiny (< 1kb, see [export-size-report](https://github.com/harlan-zw/packerup/blob/main/export-size-report.json))


## Installation

```bash
npm add -D packerup
```

## API

### packArray

**Arguments**

- _input_ - `array`

  The array to pack


- _options_ -  `{ key: string | string[], value: string | string[] }`

  The options to use to resolve the key and value. 
  By default, will choose first 2 keys of an object.

```ts
import { packArray } from 'packerup'

packArray([
  { httpEquiv: 'content-security-policy', content: 'content-src none' }
])

// {
//    httpEquiv: 'content-src none',
// }
```

### packObject

**Arguments**

- _input_ - `object`

  The record to pack.


- _options_ -  `{ key: string | string[], value: string | string[] }`

  The options to use to resolve the key and value.
  By default, will choose first 2 keys of an object.

```ts
import { packObject } from 'packerup'

packObject({ 
  image: {
    src: {
      '1x': 'https://example.com/image.png',
      '2x': 'https://example.com/image@2x.png'
    },
    alt: 'Example Image'
  },
}, {
  key: 'image.src.1x',
  value: 'image.alt'
})

// {
//    httpEquiv: 'content-src none',
// }
```

### packString

```ts
import { packString } from 'packerup'

const head = packString('src="https://example.com/image.jpg" width="800" height="600"')
// {
//   "height": "600",
//   "src": "https://example.com/image.jpg",
//   "width": "800",
// }
```

### unpackMeta

Define your meta tags in a simple object with full type-safety.

```ts
import { defineHead, resolveMetaFlat } from 'packerup'

const meta = unpackMeta({
    contentSecurityPolicy: {
      contentSrc: 'none'
    },
    viewport: {
      width: 'device-width',
      initialScale: 1,
      userScalable: 'yes',
    }
})

//   [
//     { 'http-equiv': 'content-security-policy', content: 'content-src none' },
//     { 'name': 'viewport', content: 'width=device-width, user-scalable=yes, initial-scale=1' }
//   ]
```

### packMeta

Turn array meta tags into a flat packed object.

```ts
import { defineHead, resolveMetaFlat } from 'packerup'

const meta = packMeta([
  {
    'content': 'default-src \'self\' https://example.com; content-src none',
    'http-equiv': 'content-security-policy',
  },
  {
    name: 'description',
    content: 'desc',
  },
  {
    content: '1234567890',
    property: 'fb:app_id',
  },
])

// {
//   "description": "desc",
//   "fbAppId": "1234567890",
//   "contentSecurityPolicy": "default-src 'self' https://example.com; content-src none"
// }
```

### resolveSeoHead

Generate a minimal SEO head with maximum SEO.

Internally this function uses the `withDefaults` and `inferSocialShare` utilities.

- Adds utf-8 charset
- Sets default best practice viewport
- Infers social share tags from `title` and `description`
- Sets twitter card to `summary_large_image`
- Sets robots best practice

```ts
import { resolveSeoHead, resolveMetaFlat } from 'packerup'

const head = resolveSeoHead({
  title: 'Learn about packerup - packerup',
  description: 'Describing the basic usage of packerup.',
})

// {
//   "title": "My Title",
//   "meta": [
//     {
//       "content": "Some description",
//       "name": "description",
//     },
//     {
//       "charset": "utf-8",
//     },
//     {
//       "content": "initial-scale=1, width=device-width",
//       "name": "viewport",
//     },
//     {
//       "content": "My Title",
//       "property": "og:title",
//     },
//     {
//       "content": "Some description",
//       "property": "og:description",
//     },
//     {
//       "content": "max-snippet:-1, max-image-preview:large, max-video-preview:-1",
//       "name": "robots",
//     },
//   ],
// }
```

## Validation API

```ts
import { resolveHead } from 'packerup'
import { HeadSchema } from "@packerup/schema";

const tags = resolveHead({
  meta: [
    { description: 'My Description' }
  ]
})

HeadSchema.safeParse(tags)

// {
//   "error": [ZodError: [
//     {
//       "code": "custom",
//       "message": "The attribute `content` must be included.",
//       "path": [
//         "meta",
//         0
//       ]
//     }
//   ]],
//   "success": false,
// }
```

## Generate API

### generateHtml

```ts
import { generateHtml } from 'packerup'

const html = generateHtml({
  title: 'test',
  script: [
    { src: 'https://example.com/script.js' },
  ],
  meta: [
    { name: 'description', content: 'test' },
  ]
})

// <title>test</title>
// <meta content="test" name="description">
// <script src="https://example.com/script.js"></script>
```

### generateTags

```ts
import { generateTags } from 'packerup'

const tags = generateTags({
  title: 'test',
  script: [
    { src: 'https://example.com/script.js' },
  ],
  meta: [
    { name: 'description', content: 'test' },
  ]
})

// [
//   {
//     "props": {
//       "children": "test",
//     },
//     "tag": "title",
//   },
//   {
//     "props": {
//       "content": "test",
//       "name": "description",
//     },
//     "tag": "meta",
//   },
//   {
//     "props": {
//       "src": "https://example.com/script.js",
//     },
//     "tag": "script",
//   },
// ]
```

## Sponsors

<p align="center">
  <a href="https://raw.githubusercontent.com/harlan-zw/static/main/sponsors.svg">
    <img src='https://raw.githubusercontent.com/harlan-zw/static/main/sponsors.svg'/>
  </a>
</p>


## License

MIT License © 2022-PRESENT [Harlan Wilton](https://github.com/harlan-zw)
