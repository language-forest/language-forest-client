export type Animation = () => Promise<void>

export interface GlobalComponentContextType<T = any> {
  show: (props: T, hidePrevComponentImmediate?: boolean) => Promise<void>
  hide: () => Promise<void>
}

export interface GlobalComponentContextProviderProps<T> {
  Component: React.FC<T>
  internalRef: React.RefObject<GlobalComponentContextType<T>>
}
