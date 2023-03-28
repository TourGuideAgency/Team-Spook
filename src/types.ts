export type AgentsInput = {
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  phone: string,
  databaseAccessLevel: number
}

export type CustomersInput = {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    emergency_phone: string,
    passport: string,
    seat: number
  }

export type GuidesInput = {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    languages: string,
    databaseAccessLevel: number
}

export type DestinationsInput = {
  country: string,
  city: string,
  currency: string,
  language: string,
  description: string,
  meals: string,
  lodging: string,
  price: number,
  Bus_id: number,
  image: string
}

export type BusesInput={
  Name:string,Description:string,Tour_Guide:string, Total_Seat:number,Empty_Seat:number,Full_Seat:number,Patent:string
}