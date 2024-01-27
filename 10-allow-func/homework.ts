class User {
  // "experimentalDecorators": true
  @AllowFunc((a: number) => a > 0)
  age: number = 30;
}

function AllowFunc(condition: (value: number) => boolean) {
  return function (target: any, propertyKey: string) {
    // без target: any до свойства, которое надо установить, не достучался
    let value = target[propertyKey];

    const getter = function () {
      return value;
    };

    const setter = function (newValue: number) {
      if (condition(newValue)) {
        value = newValue;
      } else {
        console.log(`Значение ${value} меньше допустимого`);
      }
    };

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
    });
  };
}

const person = new User();
console.log(person.age); // 30

person.age = 0;
console.log(person.age); // 30

person.age = 20;
console.log(person.age); // 20
