import { createContext as createReactContext, useContext as useReactContext } from 'react'

export interface CreateContextOptions<T> {
  name: string
  strict?: boolean
  errorMessage?: string
  defaultValue?: T
}

export type CreateContextReturn<T> = [React.Provider<T>, () => T, React.Context<T>]

const getErrorMessage = (hook: string, provider: string) => {
  return `${hook}이 존재하지 않습니다. 컴포넌트를 ${provider}로 감싸주세요`
}

export const createContext = <T>(
  options: CreateContextOptions<T> = {
    name: '',
  },
) => {
  const { name, strict = true, errorMessage, defaultValue } = options

  const hookName = `use${name}Context`
  const providerName = `<${name}Provider />`

  const Context = createReactContext<T | undefined>(defaultValue)

  Context.displayName = `${name}Context`

  const useContext = () => {
    const context = useReactContext(Context)

    if (!context && strict) {
      const error = new Error(errorMessage ?? getErrorMessage(hookName, providerName))
      error.name = 'ContextError'
      Error.captureStackTrace?.(error, useContext)
      throw error
    }

    return context
  }

  return [Context.Provider, useContext, Context] as CreateContextReturn<T>
}
