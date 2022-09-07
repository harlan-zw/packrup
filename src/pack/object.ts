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

  const resolveOption = (index: keyof PackOptions<T>) => {
    const arr = (asArray(options?.[index]))
    return arr.find(k => k && keys.includes(k))
  }

  k = resolveOption('key') || k
  v = resolveOption('value') || v

  const keyPrefix = input.key ? `${InternalKeySymbol}${input.key}-` : '' || ''

  const key = options.resolveKey(input[k])

  return {
    [`${keyPrefix}${key}`]: input?.[v],
  } as Partial<T>
}
