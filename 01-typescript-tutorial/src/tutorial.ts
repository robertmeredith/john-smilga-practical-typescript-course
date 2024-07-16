// FETCH Data - AXIOS Requests

// GET is a generic, if we don't pass in data type then automatically set as any
// const { data } = await axios.get(someUrl)
// axios.get<{ name: string }[]>(someUrl)

// export class Axios {
//   get<T = any, R = AxiosResponse<T>, D = any>(
//     url: string,
//     config?: AxiosRequestConfig<D>
//   ): Promise<R>
// }

// export interface AxiosResponse<T = any, D = any> {
//   data: T
//   status: number
//   statusText: string
//   headers: RawAxiosResponseHeaders | AxiosResponseHeaders
//   config: InternaalAxiosRequestConfig<D>
//   request?: any
// }

// Typically axios + react query - we won't set any state values

const url = 'https://www.course-api.com/react-tours-project'

// just because we set this type at build time, doesn't mean we can guarantee that provided data will match at run time as no way to know that until call to fetch data is made - data might miss properties that we want to have
type Tour = {
  id: string
  image: string
  info: string
  name: string
  price: string
}

async function fetchData(url: string): Promise<Tour[]> {
  try {
    const response = await fetch(url)
    // fetch doesn't throw error for 404 so we need to check manually - not needed with axios
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: Tour[] = await response.json()
    console.log(data)
    return data
  } catch (error) {
    const errorMsg =
      error instanceof Error ? error.message : 'There was an error...'
    console.log(errorMsg)
    // If can't get data then just return empty array
    return []
  }
}

const tours = await fetchData(url)

tours.map((tour) => {
  console.log(tour.name)
})

// RUNTIME CHECKS - validating data at runtime
// Using package 'zod'

import { z } from 'zod'

// construct schema
const tourSchema = z.object({
  id: z.string(),
  image: z.string(),
  info: z.string(),
  name: z.string(),
  price: z.string(),
})

type TourType = z.infer<typeof tourSchema>

async function fetchTourData(url: string): Promise<TourType[]> {
  try {
    const response = await fetch(url)
    // fetch doesn't throw error for 404 so we need to check manually - not needed with axios
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const rawData: TourType[] = await response.json()

    // validate data at runtime using zod
    const result = tourSchema.array().safeParse(rawData)
    // if error throw error
    if (!result.success) {
      throw new Error(`Invalid data: ${result.error}`)
    }
    console.log(result)
    // otherwise return data
    return result.data
  } catch (error) {
    const errorMsg =
      error instanceof Error ? error.message : 'There was an error...'
    console.log(errorMsg)
    // If can't get data then just return empty array
    return []
  }
}

const tourData = await fetchTourData(url)

tourData.map((tour) => {
  console.log(tour.name)
})

// CLASSES - serve as a way to construct objects

class Book {
  // With classes in typescript we need to explicitly set the types above the constructor
  public readonly title: string
  public author: string
  // instance / default properties - set inside of class instead of constructor
  private checkedOut: boolean = false

  constructor(title: string, author: string) {
    this.title = title
    this.author = author
    // this.checkedOut = false
  }

  public checkOut() {
    this.checkedOut = this.toggleCheckedOutStatus()
  }
  public isCheckedOut() {
    return this.checkedOut
  }
  private toggleCheckedOutStatus() {
    return !this.checkedOut
  }
}

const deepWork = new Book('Deep Work', 'Cal Newport')

console.log(deepWork.checkedOut) // false
// deepWork.checkedOut = 'hello' // won't work as tpyescript infers it needs to be boolean
deepWork.checkOut()
console.log(deepWork.isCheckedOut)

// GETTERS and SETTERS
class NewBook {
  private checkedOut: boolean = false

  constructor(readonly title: string, public author: string) {}

  get info() {
    return `${this.title} by ${this.author}`
  }

  private set checkOut(checkedOut: boolean) {
    this.checkedOut = checkedOut
  }

  get checkOut() {
    return this.checkedOut
  }
  public get someInfo() {
    this.checkOut = true
    return `${this.title} by ${this.author}`
  }
}

interface IPerson {
  name: string
  age: number
  greet(): void
}

class Person implements IPerson {
  constructor(public name: string, public age: number) {}

  greet(): void {
    console.log(`Hello my name is ${this.name} and I'm ${this.age} years old`)
  }
}

const hipster = new Person('roger', 55)
hipster.greet()
