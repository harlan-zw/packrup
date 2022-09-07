import type { PackArrayOptions } from '../types'
import { packObject } from './object'

export function packArray<T extends Record<string, any>[]>(input: T, options?: PackArrayOptions<T>): Partial<Record<string, any>> {
  const packed: Partial<Record<string, any>> = {}
  for (const i of input) {
    const packedObj = packObject(i, options)
    const pKey = Object.keys(packedObj)[0] as keyof typeof packed

    if (!pKey.startsWith('key-') && packed[pKey]) {
      packed[pKey] = Array.isArray(packed[pKey]) ? packed[pKey] : [packed[pKey]]
      packed[pKey].push(Object.values(packedObj)[0])
    }
    else {
      packed[pKey.startsWith('key-') ? (pKey.split('-').pop() || pKey) : pKey] = packedObj[pKey]
    }
  }
  return packed
}
