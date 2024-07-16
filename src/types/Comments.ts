import { Designer } from "./Designer"


export interface Comment {
  id: number
  issue: string
  designer: Designer
  date_created: Date
  message: string
}
