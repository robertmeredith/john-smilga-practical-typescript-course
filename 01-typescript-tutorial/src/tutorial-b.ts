import { string } from 'zod'
import newStudent, { sayHello, person, type Student } from './actions'
// importing javascript file (not typescript) - doesn't work
import { someValue } from './javascript-file.js'

// sayHello('Typescript')
// console.log(newStudent)
// console.log(person)

// const anotherStudent: Student = {
//   name: 'roger',
//   age: 35,
// }

// console.log(anotherStudent)

// CHALLENGE - TYPE GUARDING
type ValueType = string | number | boolean

let value: ValueType
const random = Math.random()

value = random < 0.33 ? 'Hello' : random < 0.66 ? 123.456 : true

const checkValue = (param: ValueType): void => {
  if (typeof param === 'string') {
    console.log(param.toLowerCase())
    return
  }
  if (typeof param === 'number') {
    console.log(param.toFixed(2))
    return
  }
  console.log(`boolean: ${param}`)
}

checkValue(value)

// CHALLENGE - EQUALITY NARROWING
type Dog = { type: 'dog'; name: string; bark: () => void }
type Cat = { type: 'cat'; name: string; meow: () => void }
type Animal = Cat | Dog

const makeSound = (animal: Animal): void => {
  // if (animal.type === 'dog') {
  //   animal.bark()
  // } else {
  //   animal.meow()
  // }

  if ('bark' in animal) {
    animal.bark()
  } else {
    animal.meow()
  }
}

const dog: Dog = {
  type: 'dog',
  name: 'Wooof',
  bark: () => console.log('WOOF!!'),
}
const cat: Cat = {
  type: 'cat',
  name: 'Tiger',
  meow: () => console.log('MEOWWWWWW'),
}

makeSound(dog)
makeSound(cat)

// TRUTHY / FALSY GUARD

const printLength = (str: string | null | undefined): void => {
  if (str) {
    console.log(str.length)
  } else {
    console.log('No string provided')
  }
}

printLength('Big String')
printLength(undefined)
printLength(null)

function checkInput(input: Date | string): string {
  if (input instanceof Date) {
    return input.getFullYear().toString()
  } else {
    return input
  }
}

console.log(checkInput(new Date()))
console.log(checkInput('2020-05-05'))

// CHALLENGE - TYPE PREDICATES

type Student = {
  name: string
  study: () => void
}

type User = {
  name: string
  login: () => void
}

type Person = Student | User

const randomPerson = (): Person => {
  return Math.random() > 0.5
    ? { name: 'john', study: () => console.log('Studying') }
    : { name: 'mary', login: () => console.log('Logging in') }
}

const person = randomPerson()

function isStudent(pers: Person): pers is Student {
  // One approach
  return 'study' in pers
  // Second approach
  return (person as Student).study !== undefined
}

if (isStudent(person)) {
  person.study()
} else {
  person.login()
}

// CHALLENGE - DISCRIMINATED UNION

type IncrementAction = {
  type: 'increment'
  amount: number
  timestamp: number
  user: string
}

type DecrementAction = {
  type: 'decrement'
  amount: number
  timestamp: number
  user: string
}

type Action = IncrementAction | DecrementAction

function reducer(state: number, action: Action) {
  switch (action.type) {
    case 'increment':
      return state + action.amount
    case 'decrement':
      return state - action.amount
    default:
      // this assignment means that an error will be thrown at compile time
      const unexpectedAction: never = action
      // just throwing the error alone would only be caught at runtime
      throw new Error(`Unexpected action : ${unexpectedAction}`)
  }
}

const newState = reducer(15, {
  type: 'increment',
  user: 'john',
  amount: 5,
  timestamp: 123456,
})

// GENERICS
// let array1: string[] = ['Apple', 'Banana', 'Mango']
// let array2: number[] = [1, 2, 3]
// let array3: boolean[] = [true, false, true]

let array1: Array<string> = ['Apple', 'Banana', 'Mango']

function createString(arg: string): string {
  return arg
}

// T is generic (doesn't have to be T - just convention) - stands for any type
function genericFunction<T>(arg: T): T {
  return arg
}

const someStringValue = genericFunction<string>('Hello world')
const someNumberValue = genericFunction<number>(3)

// generic interface - allows us to have same shape of object but with different types
// < > stands for variable which can be any type
// value could be string or number etc depending on type we set when instantiating the variable
interface GenericInterface<T> {
  value: T
  getValue: () => T
}

// string instance of GenericInterface
const genericString: GenericInterface<string> = {
  value: 'Hello World',
  getValue() {
    return this.value
  },
}

// number instance of GenericInterface
const genericNumber: GenericInterface<number> = {
  value: 4,
  getValue() {
    return this.value
  },
}

// Promise is generic
async function someFunc(): Promise<string> {
  return 'hello world'
}

async function someNumFunc(): Promise<number> {
  return 12345
}
const result = someFunc()

// functions to generate arrays filled with x amount of value passed in
function generateStringArray(length: number, value: string): string[] {
  let result: string[] = []
  result = Array(length).fill(value)
  return result
}

function generateNumberArray(length: number, value: number): number[] {
  let result: number[] = []
  result = Array(length).fill(value)
  return result
}

// INSTEAD using generics
// <T> signifies generic value that can be used throughout function

function createArray<T>(length: number, value: T): Array<T> {
  // let result: T[] = []
  let result: Array<T> = []
  result = Array(length).fill(value)
  return result
}

console.log(createArray<string>(3, 'hello'))
console.log(createArray<number>(4, 100))

// MULTIPLE VARIABLE GENERIC TYPES
function pair<T, U>(param1: T, param2: U): [T, U] {
  return [param1, param2]
}

let pairResult = pair<number, string>(123, 'word')
console.log(pairResult)

// type constraint on a generic type - eg. limiting to string or number
// wouldn't be used for below example as we could just set the types inside the parameter braces
// more suited for when using our own types
function processValue<T extends string | number>(value: T): T {
  console.log(value)
  return value
}
processValue('hello')
processValue(123)

// More complex example with our own types
type Car = {
  brand: string
  model: string
}

const car: Car = {
  brand: 'ford',
  model: 'mustang',
}

type Product = {
  name: string
  price: number
}

const product: Product = {
  name: 'shoes',
  price: 1.99,
}

type StudentType = {
  name: string
  age: number
}

const student: StudentType = {
  name: 'peter',
  age: 20,
}

// This checks to make sure the object we are passing in has a key of 'name'
// Means we don't have to specify all the different object types we may pass in
function printName<T extends { name: string }>(obj: T): void {
  console.log(obj.name)
}

// DEFAULT TYPE - useful when we don't know the shape of the data

// expects type of generic T
interface StoreData<T> {
  // data is array of generic type
  data: T[]
}

const storeNumbers: StoreData<number> = {
  data: [1, 2, 3, 4],
}

// If we're not sure what data we are going to have
// one approach
const randomStuff: StoreData<any> = {
  data: ['random', 1, 3],
}

// we can bypass this by setting it on the interface
// if we don't supply the type then it will automatically be set as any
interface StoreData<T = any> {
  // data is array of generic type
  data: T[]
}

const newRandomStuff: StoreData = {
  data: ['random', 1, 3],
}

