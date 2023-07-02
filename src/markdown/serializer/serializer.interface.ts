export interface Serializer<T> {
  serialize(value: T): string
}
