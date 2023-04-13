import { IUser } from '@/core/types/IUser'

export interface IScore {
  id?: string
  points: number
  createdAt?: Date
  userId?: string
  sportId?: string
}

export interface IScoreWUser {
  user?: IUser
  score: IScore
}

export interface IMaxSession {
  id?: string
  createdAt?: Date
  userId?: string
  break?: number
  breakQuiz?: number
  climbing?: number
  climbingQuiz?: number
  skate?: number
  skateQuiz?: number
  surf?: number
  surfQuiz?: number
  totalScore?: number
  rank?: number
}

export interface IMaxSessionWUser {
  user?: IUser
  maxSession: IMaxSession
}
