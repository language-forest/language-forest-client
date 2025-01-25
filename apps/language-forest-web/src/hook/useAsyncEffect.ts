import type { DependencyList } from "react";
import { useEffect } from "react";

type Destructor = () => void;

type AsyncEffectCallback = () =>
  | void
  | Destructor
  | Promise<void>
  | Promise<Destructor>;

export const useAsyncEffect = (
  asyncEffect: AsyncEffectCallback,
  deps?: DependencyList,
) => {
  useEffect(createAsyncEffectCallback(asyncEffect), deps);
};

const iife = <T extends (...args: never[]) => any>(
  callback: T,
): ReturnType<T> => callback();

const createAsyncEffectCallback = (asyncEffect: AsyncEffectCallback) => () => {
  const destructor = iife(asyncEffect);
  return () => {
    if (!destructor) {
      return;
    }

    if (destructor instanceof Promise) {
      iife(async () => {
        const awaitedDestructor = await destructor;
        if (awaitedDestructor) {
          awaitedDestructor();
        }
      });
    } else {
      iife(destructor);
    }
  };
};
