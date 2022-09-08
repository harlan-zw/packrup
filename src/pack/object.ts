import type { PackOptions } from '../types'

function asArray(input: any) {
  return Array.isArray(input) ? input : [input]
}

export const InternalKeySymbol = '_$key'

export function packObject<T extends Record<string, any>>(input: T, options?: PackOptions<T>): Partial<T> {
  const keys = Object.keys(input) as (keyof T)[]
  let [k, v] = keys
  options = options || {}
  options.key = options.key || k
  options.value = options.value || v
  options.resolveKey = options.resolveKey || (k => k as string)

  const resolveKey = (index: keyof PackOptions<T>) => {
    const arr = (asArray(options?.[index]))
    return arr.find((k) => {
      if (typeof k === 'string' && k.includes('.')) {
        // use dot notation to get the value
        return k
      }
      return k && keys.includes(k)
    })
  }

  const resolveValue = (k: string, input: any) => {
    if (k.includes('.')) {
      // use dot notation to get the value
      const paths = k.split('.')
      let val: any = input
      for (const path of paths)
        val = val[path]
      return val
    }
    return input[k]
  }

  k = resolveKey('key') || k
  v = resolveKey('value') || v

  const dedupeKeyPrefix = input.key ? `${InternalKeySymbol}${input.key}-` : '' || ''

  let keyValue = resolveValue(k as string, input)
  keyValue = options.resolveKey(keyValue)

  return {
    [`${dedupeKeyPrefix}${keyValue}`]: resolveValue(v as string, input),
  } as Partial<T>
}
