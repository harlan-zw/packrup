interface Context { key: string; value: any }
type ResolveFn = (ctx: Context) => string

export interface UnpackArrayOptions {
  key: string | ResolveFn
  value: string | ResolveFn
  resolveKeyData?: ResolveFn
  resolveValueData?: ResolveFn
}

export function unpackToArray(input: Record<string, any>, options: UnpackArrayOptions): Record<string, any>[] {
  const unpacked: any[] = []
  const kFn = options.resolveKeyData || ((ctx: Context) => ctx.key)
  const vFn = options.resolveValueData || ((ctx: Context) => ctx.value)

  for (const [k, v] of Object.entries(input)) {
    unpacked.push(...(Array.isArray(v) ? v : [v]).map((i) => {
      const ctx = { key: k, value: i }
      const val = vFn(ctx)
      // handle nested objects
      if (typeof val === 'object')
        return unpackToArray(val!, options)

      if (Array.isArray(val))
        return val

      return {
        [typeof options.key === 'function' ? options.key(ctx) : options.key]: kFn(ctx),
        [typeof options.value === 'function' ? options.value(ctx) : options.value]: val,
      }
    }).flat())
  }
  return unpacked
}
