'use client'

import { createContext, createElement, createRef } from 'react'
import { GlobalComponentContextType } from '../types'
import { globalComponentManager } from '../manager'
import { GlobalComponentContextProvider } from '../provider'

export const createPortal = <T>(Component: React.FC<T>) => {
  const context = createContext<GlobalComponentContextType<T>>({} as any)

  const internalRef = createRef<GlobalComponentContextType<T>>()

  const show = async (props: T, hidePrevComponentImmediate?: boolean) => {
    if (!internalRef.current) {
      return console.warn('global-components should be used with context')
    }

    await internalRef.current.show(props, hidePrevComponentImmediate)
  }

  const hide = async () => {
    if (!internalRef.current) {
      return console.warn('global-components should be used with context')
    }

    await internalRef.current.hide()
  }

  globalComponentManager.registerRef(Component.displayName || Component.name, internalRef)

  return {
    show,
    hide,
    Portal: ({ children }: { children?: React.ReactNode }) =>
      createElement(
        context.Provider,
        { value: { show, hide } },
        createElement(GlobalComponentContextProvider<T>, { Component, internalRef }, children),
      ),
  }
}
