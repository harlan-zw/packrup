import type { PackArrayOptions } from '../types'
import { InternalKeySymbol, packObject } from './object'

export function packArray<T extends Record<string, any>[]>(input: T, options?: PackArrayOptions<T>): Partial<Record<string, any>> {
  const packed: Partial<Record<string, any>> = {}
  for (const i of input) {
    const packedObj = packObject(i, options)
    const pKey = Object.keys(packedObj)[0] as keyof typeof packed
    const isDedupeKey = pKey.startsWith(InternalKeySymbol)

    if (!isDedupeKey && packed[pKey]) {
      packed[pKey] = Array.isArray(packed[pKey]) ? packed[pKey] : [packed[pKey]]
      packed[pKey].push(Object.values(packedObj)[0])
    }
    else {
      packed[isDedupeKey ? (pKey.split('-').slice(1).join('-') || pKey) : pKey] = packedObj[pKey]
    }
  }
  return packed
}
