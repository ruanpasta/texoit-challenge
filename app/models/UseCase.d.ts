// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface UseCase<T, R = any> {
  execute: (...args: R[]) => Promise<T>;
}