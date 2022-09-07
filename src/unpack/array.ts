export interface UnpackArrayOptions {
  key: string
  value: string
  resolveKeyData?: (key: string) => string
  resolveValueData?: (value: unknown) => unknown
}

export function unpackToArray(input: Record<string, any>, options: UnpackArrayOptions): Record<string, any>[] {
  const unpacked: any[] = []
  options = options || { key: 'name', value: 'content' }
  const kFn = options.resolveKeyData || ((k: string) => k)
  const vFn = options.resolveValueData || ((k: string) => k)

  for (const [k, v] of Object.entries(input)) {
    unpacked.push(...(Array.isArray(v) ? v : [v]).map((i) => {
      return {
        [options.key]: kFn(k),
        [options.value]: vFn(i),
      }
    }))
  }
  return unpacked
}
