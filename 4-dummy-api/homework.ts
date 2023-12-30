const enum BloodGroup {
  A_POSITIVE = "A+",
  A_NEGATIVE = "A-",
  B_POSITIVE = "B+",
  B_NEGATIVE = "B-",
  AB_POSITIVE = "AB+",
  AB_NEGATIVE = "AB-",
  O_POSITIVE = "O+",
  O_NEGATIVE = "O-",
}

const enum Gender {
  MALE = "male",
  FEMALE = "female",
}

const enum HairColor {
  BLACK = "Black",
  BLOND = "Blond",
  BROWN = "Brown",
  CHESTNUT = "Chestnut",
  AUBURN = "Auburn",
}

const enum HairType {
  STRANDS = "Strands",
  CURLY = "Curly",
  VERY_CURLY = "Very curly",
  STRAIGHT = "Straight",
  WAVY = "Wavy",
}

interface IBank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

interface ICompany {
  address: IDummyAddress;
  department: string;
  name: string;
  title: string;
}

interface ICoordinates {
  lat: number;
  lng: number;
}

interface IDummyAddress {
  address: string;
  city: string;
  postalCode: string;
  state: string;
  coordinates: ICoordinates;
}

interface IDummyUser {
  address: IDummyAddress;
  age: number;
  bank: IBank;
  birthDate: string;
  bloodGroup: BloodGroup;
  domain: string;
  ein: string;
  email: string;
  eyeColor: string;
  firstName: string;
  gender: Gender;
  hair: IHair;
  height: number;
  id: number;
  image: string;
  lastName: string;
  macAddress: string;
  maidenName: string;
  password: string;
  phone: string;
  ssn: string;
  university: string;
  userAgent: string;
  username: string;
  weight: number;
}

interface IHair {
  color: HairColor;
  type: HairType;
}

interface IUsersResponse {
  limit: number;
  skip: number;
  total: number;
  users: IDummyUser[];
}

const usersUrl = "http://dummyjson.com/users?limit=0";

async function getDummyUsers(url: string) {
  const response = await fetch(url);
  return response.json();
}

async function main() {
  try {
    const response: IUsersResponse = await getDummyUsers(usersUrl);
    // имитация логики
    const { users } = response;
    console.log(users);
  } catch (e) {
    if (e instanceof Error) {
      // обработка ошибки
      console.log(e.message, e.name);
    }
  }
}

main();
