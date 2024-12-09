import Cookies from "js-cookie";

import { authInfo } from "../constant";
import { AbstractStore } from "./Store";

export class CookieStore extends AbstractStore {
  set(key: string, value: any): void {
    const serializedValue = this.serialize(value);
    Cookies.set(key, serializedValue, {
      path: "/",
      expires: authInfo.expiresIn,
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
