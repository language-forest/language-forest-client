'use client'

import {
  createContext,
  useCallback,
  useContext,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  Animation,
  GlobalComponentContextProviderProps,
  GlobalComponentContextType,
} from '../types'

export const GlobalComponentContext = createContext<GlobalComponentContextType | null>(null)

const useGlobalComponentContext = () => {
  const context = useContext(GlobalComponentContext)

  if (!context) {
    throw new Error('GlobalComponent should be used with GlobalComponentContext')
  }

  return context
}

const GlobalComponentContextProvider = <T extends any>({
  Component,
  internalRef,
}: GlobalComponentContextProviderProps<T>) => {
  const [props, setProps] = useState<T | null>(null)

  const animations = useRef<Animation[]>([])

  const execHideAnimations = useCallback(async () => {
    await Promise.all(animations.current.map((hideAnimationFn) => hideAnimationFn()))
    animations.current = []
  }, [])

  const hideComponent = useCallback(async () => {
    await execHideAnimations()
    setProps(null)
  }, [])

  const context = useMemo(
    () => ({
      show: async (p: T) => {
        await hideComponent()
        setProps(p)
      },
      hide: () => hideComponent(),
    }),
    [],
  )

  useImperativeHandle(internalRef, () => context, [])

  if (!props) return <></>

  return (
    <GlobalComponentContext.Provider value={context}>
      <Component {...props as any} />
    </GlobalComponentContext.Provider>
  )
}

export { useGlobalComponentContext, GlobalComponentContextProvider }
