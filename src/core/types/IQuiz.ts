export interface IQuestion {
  question: string
  answer: number
  options: string[]
  selected: boolean | null
  img: string
  info: string
  index?: number
}
