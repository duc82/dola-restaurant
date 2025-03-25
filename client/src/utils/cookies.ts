interface Cookie {
  [key: string]: string;
}

interface CookieOption {
  path?: string;
  domain?: string;
  expires?: string | Date;
  maxAge?: number;
  secure?: boolean;
  samesite?: "strict" | "lax";
}

class Cookies {
  private serialize(options?: CookieOption): string {
    if (!options) return "";

    const cookie = Object.keys(options)
      .map((key) => `${key}=${options[key as keyof CookieOption]}`)
      .join(";");

    return cookie;
  }

  public get(key?: string): string | Cookie | undefined {
    const cookies = document.cookie.split(";");

    if (!key) {
      const obj = cookies.reduce((prev, cookie) => {
        const newCookie = cookie.split("=");
        const key = newCookie[0].trim();
        const value = newCookie[1];
        prev[key] = value;
        return prev;
      }, {} as Cookie);

      return obj;
    }

    if (cookies.length < 1) return undefined;

    const cookie = cookies.find((cookie) => cookie.includes(key));
    return cookie?.split("=")[1];
  }

  public set(key: string, value: string, options?: CookieOption): void {
    const cookie = `${key}=${value}; ${this.serialize(options)}`;
    document.cookie = cookie;
  }

  public remove(key: string): void {
    const cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = cookie;
  }
}

const cookies = new Cookies();

export default cookies;
