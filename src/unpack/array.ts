export interface UnpackArrayOptions {
  key: string | ((key: string) => string)
  value: string | ((key: string) => string)
  resolveKeyData?: (key: string) => string
  resolveValueData?: (value: unknown) => unknown
}

export function unpackToArray(input: Record<string, any>, options: UnpackArrayOptions): Record<string, any>[] {
  const unpacked: any[] = []
  const kFn = options.resolveKeyData || ((k: string) => k)
  const vFn = options.resolveValueData || ((k: string) => k)

  for (const [k, v] of Object.entries(input)) {
    unpacked.push(...(Array.isArray(v) ? v : [v]).map((i) => {
      // handle nested objects
      if (typeof i === 'object')
        i = unpackToArray(i!, options)
      const val = vFn(i)

      if (Array.isArray(val))
        return val

      return {
        [typeof options.key === 'function' ? options.key(k) : options.key]: kFn(k),
        [typeof options.value === 'function' ? options.value(k) : options.value]: val,
      }
    }).flat())
  }
  return unpacked
}
