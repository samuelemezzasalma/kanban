export function findById<T extends { id?: string | null | undefined }>(array: Array<T>, id: string) {
  return array.find((el: T) => el.id === id) ?? null;
}