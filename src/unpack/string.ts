export interface TransformValueOptions {
  entrySeparator?: string
  keyValueSeparator?: string
  wrapValue?: string
  resolve?: (ctx: { key: string; value: unknown }) => string | void
}

export function unpackToString<T extends Record<keyof T, unknown>>(value: T, options: TransformValueOptions): string {
  return Object.entries(value)
    .map(([key, value]) => {
      if (typeof value === 'object')
        value = unpackToString(value as Record<keyof T, any>, options)
      if (options.resolve) {
        const resolved = options.resolve({ key, value })
        if (typeof resolved !== 'undefined')
          return resolved
      }
      if (typeof value === 'number')
        value = value.toString()
      if (typeof value === 'string' && options.wrapValue) {
        value = value.replace(new RegExp(options.wrapValue, 'g'), `\\${options.wrapValue}`)
        value = `${options.wrapValue}${value}${options.wrapValue}`
      }
      return `${key}${options.keyValueSeparator || ''}${value}`
    })
    .join(options.entrySeparator || '')
}
