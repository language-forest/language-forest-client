import Cookies from "js-cookie";

import { AbstractStore } from "./Store";

const DEFAULT_COOKIE_EXPIRES = 1;

export class CookieStore extends AbstractStore {
  override set(key: string, value: any, options?: { expires?: number }): void {
    const serializedValue = this.serialize(value);
    Cookies.set(key, serializedValue, {
      path: "/",
      expires: options?.expires ?? DEFAULT_COOKIE_EXPIRES,
    }); // 기본적으로 7일간 유지
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
