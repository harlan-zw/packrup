import type { PackOptions } from '../types'

function asArray(input: any) {
  return Array.isArray(input) ? input : [input]
}

export function packObject<T extends Record<string, any>>(input: T, options?: PackOptions<T>): Partial<T> {
  const keys = Object.keys(input) as (keyof T)[]
  let [k, v] = keys
  if (!options)
    options = { key: k, value: v }

  const resolveOption = (index: keyof PackOptions<T>) => {
    const arr = (asArray(options?.[index]))
    return arr.find(k => k && keys.includes(k))
  }

  k = resolveOption('key') || k
  v = resolveOption('value') || v

  const keyPrefix = input.key ? `key-${input.key}-` : '' || ''

  return {
    [`${keyPrefix}${input[k]}`]: input?.[v],
  } as Partial<T>
}
