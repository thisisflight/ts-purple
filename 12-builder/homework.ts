enum RequestMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

const CART_URL = "https://dummyjson.com/carts/add",
  CART_BODY = {
    userId: 1,
    products: [
      {
        id: 1,
        quantity: 1,
      },
      {
        id: 50,
        quantity: 2,
      },
    ],
  },
  CART_HEADERS = { "Content-Type": "application/json" };

class FetchGenerator {
  method: string = RequestMethod.GET;
  body: string | undefined;
  headers: Headers = new Headers();
  url: string;

  addRequestMethod(method: RequestMethod): this {
    this.method = method;
    return this;
  }

  addBody(bodyObj: Record<string, any>): this {
    if (this.method !== RequestMethod.GET) {
      this.body = JSON.stringify(bodyObj);
    }
    return this;
  }

  addHeaders(headersObj: Record<string, string>): this {
    Object.entries(headersObj).map((element) => {
      const [key, value] = element;
      this.headers.set(key, value);
    });
    return this;
  }

  addUrl(url: string): this {
    this.url = url;
    return this;
  }

  async exec(): Promise<Response> {
    return await fetch(this.url, {
      method: this.method,
      body: this.body,
      headers: this.headers,
    });
  }
}

async function main() {
  const response = await new FetchGenerator()
    .addRequestMethod(RequestMethod.POST)
    .addBody(CART_BODY)
    .addHeaders(CART_HEADERS)
    .addUrl(CART_URL)
    .exec();
  const data = await response.json();
  console.log(data);
}

main(); // покажет респонс в консоли браузера
