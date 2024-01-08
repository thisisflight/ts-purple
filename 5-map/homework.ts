// для простоты условие что ключ это либо строка либо число
type CustomMapKeyType = string | number;

interface Buckets {
  [key: string]: [CustomMapKeyType, unknown][];
}

class CustomMap {
  private buckets: Buckets = {};

  // устанавливаем значение так:
  // находим хэш от ключа и если бакет отсутствует, создаем его по хэшу
  // а иначе пушим в существующий бакет ключ и значение
  set(key: CustomMapKeyType, value: unknown): void {
    const hash = this.getHash(key);
    if (hash in this.buckets) {
      const subArray = this.buckets[hash].find(([subKey, _]) => subKey === key);
      if (subArray) {
        subArray[1] = value;
      } else {
        this.buckets[hash].push([key, value]);
      }
    } else {
      this.buckets[hash] = [[key, value]];
    }
  }

  // удаляем весь бакет с хэшом если в бакете только искомое значение,
  // иначе удаляем из бакета только искомые ключ-значение
  delete(key: CustomMapKeyType): void {
    const hash = this.getHash(key);
    const bucketsByHash = this.buckets[hash];
    if (!bucketsByHash) return;
    if (bucketsByHash.length > 1) {
      this.buckets[hash] = bucketsByHash.filter(
        ([subKey, _]) => subKey !== key
      );
    } else {
      delete this.buckets[hash];
    }
  }

  // находим по ключу хэш, по хэшу бакет и возвращаем значение если находим его,
  // в прочих случаях (нет бакета либо в бакете нет искомого значения по ключу) вернем undefined
  get(key: CustomMapKeyType): unknown | undefined {
    const hash = this.getHash(key);
    const subArrays = this.buckets[hash];
    if (subArrays) {
      const subArray = subArrays.find(([subKey, _]) => subKey === key);
      if (subArray) {
        return subArray[1];
      }
    }
  }

  // просто очистим бакеты
  clear() {
    this.buckets = {};
  }

  //  хэш-функция принимает строку "key" и вычисляет хэш
  // путем суммирования кодов символов каждого символа строки,
  // умноженных на степени числа 31
  getHash(key: CustomMapKeyType): string {
    if (typeof key === "number") {
      key = key.toString();
    }
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i) * Math.pow(31, key.length - i - 1);
    }
    return hash.toString();
  }

  // доп метод для удобного отображения в консоли результатов
  show(): string[] {
    const result: string[] = [];
    for (const key in this.buckets) {
      const subArrays = this.buckets[key];
      subArrays.forEach(([subKey, value]) =>
        result.push(`${subKey} => ${value}`)
      );
    }
    return result;
  }

  // доп метод показа есть ли значение по ключу
  has(key: CustomMapKeyType): boolean {
    const hash = this.getHash(key);
    const subArrays = this.buckets[hash];
    if (!subArrays) {
      return false;
    }
    return !!subArrays.find(([subKey, _]) => subKey === key);
  }
}
