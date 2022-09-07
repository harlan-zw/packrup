export interface PackArrayOptions<T extends Record<string, any>[]> {
  key: keyof T[number] | (keyof T[number])[]
  value: keyof T[number] | (keyof T[number])[]
}

export interface PackOptions<T extends Record<keyof T, any>> {
  key: keyof T | (keyof T)[]
  value: keyof T | (keyof T)[]
}

// export type ReverseMap<T extends Record<keyof T, keyof any>> = {
//   [P in T[keyof T]]: {
//     [K in keyof T]: T[K] extends P ? K : never
//   }[keyof T]
// }
// type Prepend<T, U extends any[]> = [T, ...U]
// type Keys<T extends Record<string, any>> = Keys_<T, []>
// type Keys_<T extends Record<string, any>, U extends PropertyKey[]> =
//   {
//     [P in keyof T]: {} extends Omit<T, P> ? [P] : Prepend<P, Keys_<Omit<T, P>, U>>
//   }[keyof T]
// export interface ObjectKeys<T extends Record<string, any>> {
//   key: Keys<ReverseMap<T>>[0]
//   value: Keys<ReverseMap<T>>[1]
// }
// export type GetObjectKeys<Data extends Record<string, any>> = Keys<ReverseMap<Pick<Data, ''>>>[0]
// export type FirstObjectKeyFiltered<Data extends Record<string, any>, Filter extends keyof Data> = Keys<ReverseMap<Pick<Data, Filter>>>[0]
// export type ObjectKeyValue<Data extends Record<string, any>, K extends keyof Data, V extends keyof Data> = Record<
//   FirstObjectKeyFiltered<Data, K>,
//   FirstObjectKeyFiltered<Data, V>
// >
