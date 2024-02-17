interface IProductAPI {
  getProduct(id: number): Promise<Response>;
}

const productURL = "https://dummyjson.com/products/";

class ProductAPI implements IProductAPI {
  async getProduct(id: number): Promise<Response> {
    const url = `${productURL}${id}`;
    return await fetch(url);
  }
}

class ProductProxyAPI implements IProductAPI {
  constructor(private product: ProductAPI) {}

  async getProduct(id: number): Promise<Response> {
    if (id > 10) throw new Error("Недопустимо большой id");
    return await this.product.getProduct(id);
  }
}

async function main() {
  const proxy = new ProductProxyAPI(new ProductAPI());
  const response1 = await proxy.getProduct(1);
  const product1 = await response1.json();
  console.log(product1);
  const response2 = await proxy.getProduct(11);
  const product2 = await response2.json();
  console.log(product2);
}

main();
