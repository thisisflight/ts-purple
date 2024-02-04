"use strict";
var RequestMethod;
(function (RequestMethod) {
    RequestMethod["GET"] = "GET";
    RequestMethod["POST"] = "POST";
    RequestMethod["PUT"] = "PUT";
    RequestMethod["PATCH"] = "PATCH";
    RequestMethod["DELETE"] = "DELETE";
})(RequestMethod || (RequestMethod = {}));
const CART_URL = "https://dummyjson.com/carts/add", CART_BODY = {
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
}, CART_HEADERS = { "Content-Type": "application/json" };
class FetchGenerator {
    constructor() {
        this.method = RequestMethod.GET;
        this.headers = new Headers();
    }
    addRequestMethod(method) {
        this.method = method;
        return this;
    }
    addBody(bodyObj) {
        if (this.method !== RequestMethod.GET) {
            this.body = JSON.stringify(bodyObj);
        }
        return this;
    }
    addHeaders(headersObj) {
        Object.entries(headersObj).map((element) => {
            const [key, value] = element;
            this.headers.set(key, value);
        });
        return this;
    }
    addUrl(url) {
        this.url = url;
        return this;
    }
    async exec() {
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
