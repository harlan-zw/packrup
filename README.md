<h1 align='center'>packrup</h1>

<p align="center">
<a href='https://github.com/harlan-zw/packrup/actions/workflows/test.yml'>
<img src='https://github.com/harlan-zw/packrup/actions/workflows/test.yml/badge.svg' >
</a>
<a href="https://www.npmjs.com/package/packrup" target="__blank"><img src="https://img.shields.io/npm/v/packrup?color=2B90B6&label=" alt="NPM version"></a>
<a href="https://www.npmjs.com/package/packrup" target="__blank"><img alt="NPM Downloads" src="https://img.shields.io/npm/dm/packrup?color=349dbe&label="></a>
<br>
<a href="https://github.com/harlan-zw/packrup" target="__blank"><img alt="GitHub stars" src="https://img.shields.io/github/stars/harlan-zw/packrup?style=social"></a>
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
- 🌳 Composable, tree-shakable and tiny (< 1kb, see [export-size-report](https://github.com/harlan-zw/packrup/blob/main/export-size-report.json))


## Installation

```bash
npm add -D packrup
```

## Pack API

### packArray

**Arguments**

- _input_ - `array`

  The array to pack


- _options_ -  `{ key: string | string[], value: string | string[] }`

  The options to use to resolve the key and value. 
  By default, will choose first 2 keys of an object.

```ts
import { packArray } from 'packrup'

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
import { packObject } from 'packrup'

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
import { packString } from 'packrup'

const head = packString('src="https://example.com/image.jpg" width="800" height="600"')
// {
//   "height": "600",
//   "src": "https://example.com/image.jpg",
//   "width": "800",
// }
```


## Unpack API

### unpackToArray

**Arguments**

- _input_ - `array`

  The array to pack


- _options_ -  `{ key: string | string[], value: string | string[] }`

  The options to use to resolve the key and value.
  By default, will choose first 2 keys of an object.

```ts
import { unpackToArray } from 'packrup'

unpackToArray({
  'content-security-policy': 'content-src none',
}, 
  { key: 'http-equiv', value: 'content' }
)
```

### unpackToString

**Arguments**

- _input_ - `object`

  The record to pack.


- _options_ -  `{ key: string | string[], value: string | string[] }`

  The options to use to resolve the key and value.
  By default, will choose first 2 keys of an object.

```ts
import { unpackToString } from 'packrup'

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
import { packString } from 'packrup'

const head = packString('src="https://example.com/image.jpg" width="800" height="600"')
// {
//   "height": "600",
//   "src": "https://example.com/image.jpg",
//   "width": "800",
// }
```


## Sponsors

<p align="center">
  <a href="https://raw.githubusercontent.com/harlan-zw/static/main/sponsors.svg">
    <img src='https://raw.githubusercontent.com/harlan-zw/static/main/sponsors.svg'/>
  </a>
</p>


## License

MIT License © 2022-PRESENT [Harlan Wilton](https://github.com/harlan-zw)
