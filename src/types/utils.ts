export type FuncOrgType<T> = T extends (noteObject: infer R) => void ? R : never
