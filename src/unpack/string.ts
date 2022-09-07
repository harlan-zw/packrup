export function unpackToString<T extends Record<keyof T, any>>(input: T, options?: { resolveKey?: (key: string) => string; resolveValue?: (value: unknown) => unknown }) {
  const unpacked: any[] = []
  options = options || {}
  const kFn = options.resolveKey || ((k: string) => k)
  const vFn = options.resolveValue || ((k: string) => k)

  if (typeof input === 'string')
    return vFn(input)

  for (const [k, v] of Object.entries(input)) {
    unpacked.push(...(Array.isArray(v) ? v : [v]).map((i) => {
      return `${kFn(k)}="${vFn(i)}"`
    }))
  }

  return unpacked.join(' ')
}
