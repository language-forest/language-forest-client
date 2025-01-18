export abstract class AbstractStore {
  abstract set(key: string, value: any): void;
  abstract remove(key: string): void;
  abstract clear(): void;
  abstract get<T>(key: string): T | null;

  protected serialize(value: any): string {
    if (typeof value === "string") {
      return value;
    }
    return JSON.stringify(value);
  }

  protected deserialize<T>(value: string): T {
    if (this.isJSON(value)) {
      return JSON.parse(value);
    }
    return value as T;
  }
  private isJSON = (value: string) => {
    try {
      JSON.parse(value);
      return true;
    } catch {
      return false;
    }
  };
}
