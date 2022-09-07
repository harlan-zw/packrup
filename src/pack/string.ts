export function packString<T extends string>(input: T) {
  const output: Record<string, any> = {}
  input
    .split(' ')
    .forEach(
      (item) => {
        const val = item
          .replace(/"/g, '')
          .split('=')
        output[val[0]] = val[1]
      },
    )
  return output
}
