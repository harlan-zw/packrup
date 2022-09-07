type Arrayable<T> = T | T[]

export interface PackArrayOptions<T extends Record<string, any>[]> extends PackOptions<T[number]> {
  key?: Arrayable<keyof T[number] | string>
  value?: Arrayable<keyof T[number] | string>
}

export interface PackOptions<T extends Record<keyof T, any>> {
  key?: Arrayable<keyof T | string>
  value?: Arrayable<keyof T | string>
  resolveKey?: (key: keyof T) => string
}
