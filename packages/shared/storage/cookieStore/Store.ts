// @ts-ignore
import Cookies from "js-cookie";

import { AbstractStore } from "../AbstractStore";
import { TIME_S } from "../../constant";

class CookieStore extends AbstractStore {
  override set(key: string, value: any, options?: { maxAge?: number }): void {
    const serializedValue = this.serialize(value);
    const expires = new Date(Date.now() + (options?.maxAge ?? TIME_S["1일"]));

    Cookies.set(key, serializedValue, {
      path: "/",
      expires,
    });
  }

  get<T>(key: string): T | null {
    const value = Cookies.get(key);
    if (!value) {
      return null;
    }
    return this.deserialize<T>(value);
  }

  remove(key: string): void {
    Cookies.remove(key, { path: "/" });
  }

  clear(): void {
    // 모든 쿠키를 순회하며 제거
    const allCookies = Cookies.get();
    Object.keys(allCookies).forEach((key) => {
      this.remove(key);
    });
  }
}

export const cookieStore = new CookieStore();
