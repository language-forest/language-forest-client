import { AbstractStore } from "../AbstractStore";

export class Index extends AbstractStore {
  set(key: string, value: any): void {
    const serializedValue = this.serialize(value);
    localStorage.setItem(key, serializedValue);
  }

  get<T>(key: string): T | null {
    const value = localStorage.getItem(key);
    if (!value) {
      return null;
    }
    return this.deserialize<T>(value);
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}

export const localStore = new Index();
