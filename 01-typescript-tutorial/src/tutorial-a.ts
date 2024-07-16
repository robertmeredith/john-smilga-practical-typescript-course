console.log('Typescript Tutorial')

// interface someValue {
//   name: string
//   id: number
// }

// let someObj: someValue = {
//   name: 'random',
//   id: 123,
// }

// console.log(someObj)

let awesomeName: string = 'shakeAndBake'

awesomeName = 'Hello there'
awesomeName = awesomeName.toUpperCase()
console.log(awesomeName)

let amount: number = 20
amount = 12 - 1
// amount = 'pants'

let isAwesome: boolean = true
isAwesome = false
// isAwesome = 'ShakeAndBake'

let robsString: string = 'here is a string'
robsString = robsString.concat(' and another string')
console.log(robsString)

let age: number = 25
age = age + 5

let isAdult: boolean = age >= 18
isAdult = !isAdult
console.log(isAdult)

// robsString = 124;
// age = 'thirty'
// isAdult = 'true'

console.log(robsString, age, isAdult)

let tax: number | string = 10
tax = 10
tax = '10%'

let myName: 'Rob' = 'Rob'

let requestStatus: 'pending' | 'success' | 'error' = 'pending'
requestStatus = 'success'
requestStatus = 'error'

let notSure: any = 4
notSure = 'maybe a string instead'
notSure = false

const books = ['1984', 'Brave New World', 'Fahrenheit 451']
let foundBook: string | undefined

for (let book of books) {
  if (book === '1984') {
    foundBook = book
    foundBook = foundBook.toUpperCase()
    break
  }
}
console.log(foundBook?.length)

let discount: number | string = 20
discount = '20%'
// discount = true;

let orderStatus: 'processing' | 'shipped' | 'delivered' = 'processing'
orderStatus = 'shipped'
// orderStatus = 'cancelled'

let prices: number[] = [1000, 75, 42]
// prices.push('five')

let fruit: string[] = ['apple', 'banana', 'orange']

// this sets type as empty array only
// let randomValue: [] = ['red']

let names = ['Rob', 'Bob', 'Tom', 10, true, () => 5]
let array: (string | boolean)[] = ['apple', 'orange', true]

let car: { brand: string; year: number } = {
  brand: 'toyota',
  year: 2021,
}
// car.model = 'corolla'

function sayHi(name: string) {
  console.log(`Hello there ${name}`)
}

sayHi('Rob')

function calculateDiscount(price: number): number {
  return price * 0.9
}

const finalPrice = calculateDiscount(100)
console.log(finalPrice)

const namesArray: string[] = ['Rob', 'Bob', 'Tom']

const containsName = (name: string): boolean => {
  return namesArray.includes(name)
}

let nameToCheck = 'Rob'

if (containsName(nameToCheck)) {
  console.log('Name found')
} else {
  console.log('Name not found')
}

function calculatePrice(price: number, discount?: number): number {
  return price - (discount || 0)
}

let priceAfterDiscount = calculatePrice(100, 20)
console.log(priceAfterDiscount)

function calculateScore(
  initialScore: number,
  penaltyPoints: number = 0
): number {
  return initialScore - penaltyPoints
}

let scoreAfterPenalty = calculateScore(100, 20)
let scoreWithoutPenalty = calculateScore(300)

console.log(scoreAfterPenalty, scoreWithoutPenalty)

function sum(text: string, ...values: number[]): string {
  return text + values.reduce((prev, next) => prev + next, 0)
}

let result = sum('The total is: ', 5, 10, 15)

console.log(result)

function logMessage(message: string): void {
  console.log(message)
}

logMessage('Hello there')

const processInput = (input: string | number): void => {
  typeof input === 'string'
    ? console.log(input.toLocaleLowerCase)
    : console.log(input * 2)
}

function createEmployee({ id }: { id: number }): {
  id: number
  isActive: boolean
} {
  return {
    id,
    isActive: id % 2 === 0 ? true : false,
  }
}

const first = createEmployee({ id: 1 })
const second = createEmployee({ id: 2 })
console.log(first, second)

// alternative
function createStudent(student: { id: number; name: string }) {
  console.log(`Welcome to the course ${student.name.toUpperCase()}`)
}

const newStudent = {
  id: 5,
  name: 'Anna',
  // extra property
  email: 'anna@gmail.com',
}

// Passing in object with extra properties - no issue
createStudent(newStudent)

// Passing in object properties inline - typescript expects it to match exactly as we have full control of the object
createStudent({ id: 1, name: 'bob', email: 'bobo@gmail.com' })

const processData = (
  input: string | number,
  config: { reverse: boolean } = { reverse: false }
): string | number => {
  if (typeof input === 'number') {
    return input * input
  }
  return config.reverse
    ? input.split('').reverse().join('').toUpperCase()
    : input.toUpperCase()
}

const john: User = {
  id: 1,
  name: 'john',
  isActive: true,
}
const susan: User = {
  id: 1,
  name: 'susan',
  isActive: false,
}

function createUser(user: User): User {
  console.log(`Hello there ${user.name.toUpperCase()} !!!`)

  return user
}

type User = {
  id: number
  name: string
  isActive: boolean
}

type StringOrNumber = string | number

let value: StringOrNumber
value = 'hello'
value = 123

type Theme = 'light' | 'dark'

let theme: Theme
theme = 'dark'
theme = 'light'

function setTheme(t: Theme) {
  theme: t
}

type Person = {
  id: number
  name: string
}

type Employee = {
  department: string
} & Person

type Manager = {
  employees: Employee[]
} & Person

type Staff = Employee | Manager

const printStaffDetails = (staff: Staff): void => {
  if ('employees' in staff) {
    console.log(
      `${staff.name} is a manager of ${staff.employees.length} employeees`
    )
  } else {
    console.log(
      `${staff.name} is an employee in the ${staff.department} department`
    )
  }
}

type Book = {
  id: number
  name: string
  price: number
}

const book1: Book = {
  id: 1,
  name: 'how to cook a dragon',
  price: 15,
}
const book2: Book = {
  id: 2,
  name: 'the secret life of unicorns',
  price: 20,
}

const discountedBook: Book & { discount: number } = {
  id: 3,
  name: 'gnomes vs. goblins: the ultimate guide',
  price: 25,
  discount: 0.15,
}

const propName = 'age'

type Animal = {
  [propName]: number
}

let tiger = {
  [propName]: 5,
}

interface NewBook {
  readonly isbn: number
  title: string
  author: string
  genre?: string
  // method - preferred
  printAuthor(): void
  // printTitle(message: string): string
  // function
  printTitle: (message: string) => string
  printSomething: (someValue: number) => number
}

const deepWork: NewBook = {
  isbn: 1234,
  title: 'deep work',
  author: 'cal newport',
  genre: 'self-help',
  printAuthor() {
    console.log(this.author)
  },
  printTitle(message) {
    return `${this.title} ${message}`
  },
  // FIRST OPTION
  // printSomething: function (someValue) {
  //   return someValue
  // },
  // SECOND OPTION
  // printSomething: (someValue) => {
  //   // arrow functon 'this' is global this, need to refer to object name to get values
  //   console.log(this)
  //   console.log(deepWork.author)
  //   return someValue
  // },
  // THIRD OPTION - preferred
  printSomething(someValue) {
    return someValue
  },
}

deepWork.printAuthor()
console.log(deepWork.printTitle('is an awesome book!'))
console.log(deepWork.printSomething(34))

interface PersonInterface {
  name: string
}

interface DogOwner extends PersonInterface {
  dogName: string
}

// CHALLENGE - INTERFACE

interface ManagerInterface extends PersonInterface {
  managePeople(): void
  delegateTasks(): void
}

const getEmployee = (): PersonInterface | DogOwner | ManagerInterface => {
  const alan: PersonInterface = {
    name: 'Alan',
  }

  const james: DogOwner = {
    name: 'James',
    dogName: 'Oatley',
  }

  const chris: ManagerInterface = {
    name: 'Chris',
    managePeople() {
      console.log(`${this.name} manages people`)
    },
    delegateTasks() {
      console.log(`${this.name} can delegate tasks`)
    },
  }

  const randomNumber = Math.random()
  if (randomNumber < 0.33) {
    return alan
  } else if (randomNumber < 0.66) {
    return james
  } else return chris
}

const employee = getEmployee()
console.log(employee)

// const isManager = (
//   employee: PersonInterface | ManagerInterface | DogOwner
// ): boolean => {
//   if ('delegateTasks' in employee) {
//     employee.managePeople()
//     employee.delegateTasks()
//     return true
//   } else {
//     console.log('Employee is not a manager')
//     return false
//   }
// }

// isManager(employee)

// STANDARD TYPE
// const isManager = (
//   pers: PersonInterface | DogOwner | ManagerInterface
// ): boolean => {
//   // checks for value in object
//   return 'managePeople' in pers
// }

// TYPE PREDICATE - if returns true then asserts argument to be a specific type
// In this case asserts that 'pers' is 'ManagerInterface'
const isManager = (
  pers: PersonInterface | DogOwner | ManagerInterface
): pers is ManagerInterface => {
  // checks for value in object
  return 'managePeople' in pers
}

if (isManager(employee)) {
  // Even though we are checking if a manager with the FIRST above function, it doesn't allow the below to run
  //  TypeScript does not automatically infer that if managePeople exists, delegateTasks must also exist, even though that is true in our application logic - need to use TYPE PREDICATE
  employee.delegateTasks()
}

if (isManager(employee)) {
  employee.delegateTasks()
}

// TUPLES
// array only allows for 2 values
let person: [string, number] = ['john', 25, 35, 56]

let date: [number, number, number, string] = [1, 2, 3, 'four']
// Will allow us to alter the array after instantiation
date.push('goodbye')
date.push(4)
date.push(100)
console.log(date)

// need to instead make readonly
let fixedDate: readonly [number, number] = [7, 2024]
// doesn't work
fixedDate.push(1)

function getPerson(): [string, number] {
  return ['returning the number', 25]
}

let randomPerson = getPerson()
console.log(randomPerson[0], randomPerson[1])

// optional values
let barry: [string, number?] = ['barry']

// ENUM

// enum ServerResponseStatus {
//   Success, // value is 0
//   Error,  //value is 1
// }

enum ServerResponseStatus {
  Success = 200,
  Error = 500,
}

// Reverse mapping, will log both string and  number
// If value is string this doesn't occur
Object.values(ServerResponseStatus).forEach((value) => {
  console.log(value)
  // if only want to access numbers
  if (typeof value === 'number') {
    console.log(value)
  }
})

interface ServerResponse {
  result: ServerResponseStatus
  data: string[]
}

function getServerResponse(): ServerResponse {
  return {
    result: ServerResponseStatus.Error,
    data: ['first item', 'second item'],
  }
}

const response: ServerResponse = getServerResponse()
console.log(response)

// CHALLENGE ENUM

enum UserRole {
  Admin = 'admin',
  Manager = 'manager',
  Employee = 'employee',
}

type UserType = {
  id: number
  name: string
  role: UserRole
  contact: [email: string, phone: string]
}

function createNewUser(user: UserType): UserType {
  return user
}

const newUser: UserType = createNewUser({
  id: 1,
  name: 'pete',
  role: UserRole.Admin,
  contact: ['pete@gmail.com', '0797-979-7972'],
})

console.log(newUser)

// TYPE ASSERTION
let someValue: any = 'this is a string'

let strLength: number = (someValue as string).length
console.log(strLength)

type Bird = {
  name: string
}

let birdString = '{"name": "Eagle"}'
let dogString = '{"breed": "Beagle"}'

let birdObject = JSON.parse(birdString) as Bird
let dogObject = JSON.parse(dogString)

// TYPE UNKNOWN
let unknownValue: unknown

unknownValue = 'hello world'
unknownValue = [1, 2, 3]
unknownValue = 42.34555

// unlike 'any' we need to check type before running a method
typeof unknownValue === 'number' && unknownValue.toFixed(2)

function runSomeCode() {
  const random = Math.random()
  if (random < 0.5) {
    // typical way of throwing error
    throw new Error('There was an error...')
  } else {
    // but someone might also do...
    throw 'some ill-formed error'
  }
}

// In try catch block, typescript automatically sets error as unknown
try {
  runSomeCode()
} catch (error) {
  // error is set as unknown type so can't call error.message
  // console.log(error.message)
  if (error instanceof Error) {
    console.log(error.message)
  } else {
    console.log(error)
  }
}

// TYPE NEVER
// Can not assign value to anything with type never

// let someValue: never = 0;

// Can sometimes happen if to many conditionals
type SiteTheme = 'light' | 'dark'

function checkTheme(theme: SiteTheme): void {
  if (theme === 'light') {
    console.log('light theme')
    return
  }
  if (theme === 'dark') {
    console.log('dark theme')
    return
  }
  // theme is now type never here as covered all conditions
  theme
}

enum Color {
  Red,
  Blue,
  Green,
}

function getColorName(color: Color): string {
  switch (color) {
    case Color.Red:
      return 'Red'
    case Color.Blue:
      return 'Blue'
    case Color.Green:
      return 'Green'
    // default will throw an error at run time
    default:
      // error thrown at build time - makes sure we fix errors before build
      let unexpectedColor: never = color
      // error thrown at runtime
      throw new Error(`Unexpected color value: ${color}`)
  }
}

console.log(getColorName(Color.Red))
console.log(getColorName(Color.Blue))
// Not accounted for in functions - fails silently unless handled in Switch
console.log(getColorName(Color.Green))
