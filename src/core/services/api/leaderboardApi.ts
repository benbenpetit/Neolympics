import {
  addDoc,
  collection,
  CollectionReference,
  getDocs,
  orderBy,
  query,
  where,
  limitToLast,
  getDoc,
  doc,
} from 'firebase/firestore'
import { db } from '@/firebase'
import { IMaxSessionWUser, IScore } from '@/core/types/IScore'
import { IUser } from '@/core/types/IUser'

export const addScoreSkate = async (sport: IScore) => {
  sport = { ...sport, createdAt: new Date(), sportId: 'skate' }

  return await addDoc(collection(db, 'scores'), {
    ...sport,
  })
}

export const getAllScoresByUserId = async (userId: string) => {
  let scoresSkate: IScore[] = []

  const scoresSkateQuerySnapshot = await getDocs(
    query(
      collection(db, 'scores') as CollectionReference<IScore>,
      where('userId', '==', userId),
    ),
  )

  scoresSkateQuerySnapshot.forEach((doc) => scoresSkate.push(doc.data()))

  return scoresSkate
}

export const getTopScoresBySport = async (sportId: string, limit = 10) => {
  let scores: IScore[] = []

  const scoresQuerySnapshot = await getDocs(
    query(
      collection(db, 'scores') as CollectionReference<IScore>,
      where('sportId', '==', sportId),
      orderBy('points', 'desc'),
      limitToLast(limit),
    ),
  )

  scoresQuerySnapshot.forEach((doc) => scores.push(doc.data()))

  return scores
}

export const getAllScoresBySport = async (sportId: string) => {
  let scores: IScore[] = []

  const scoresQuerySnapshot = await getDocs(
    query(
      collection(db, 'scores') as CollectionReference<IScore>,
      where('sportId', '==', sportId),
      orderBy('points', 'desc'),
    ),
  )

  scoresQuerySnapshot.forEach((doc) => scores.push(doc.data()))

  return scores
}

export const getUser = async (userId: string) => {
  let user: IUser | undefined

  const userQuerySnapshot = await getDoc(doc(db, 'users', userId))

  user = userQuerySnapshot.data()

  return user
}

export const getAllMaxSessions = async () => {
  let maxSessions: IMaxSessionWUser[] = []

  const maxScoresQuerySnapshot = await getDocs(
    query(collection(db, 'maxSessions') as CollectionReference<IScore>),
  )

  maxScoresQuerySnapshot.forEach(async (doc) => {
    maxSessions.push({
      maxSession: doc.data(),
    })
    console.log(await getUser(doc.data().userId || ''))
  })

  return maxSessions
}

export const getRankingScoresFromUser = async (
  sportId: string,
  userId: string,
  limit = 10,
) => {
  let scores: IScore[] = []
  let userScore: IScore[] = []

  const userScoreQuerySnapshot = await getDocs(
    query(
      collection(db, 'scores') as CollectionReference<IScore>,
      where('sportId', '==', sportId),
      where('userId', '==', userId),
    ),
  )

  userScoreQuerySnapshot.forEach((doc) => userScore.push(doc.data()))

  const scoresQuerySnapshot = await getDocs(
    query(
      collection(db, 'scores') as CollectionReference<IScore>,
      where('sportId', '==', sportId),
      where('points', '>=', userScore[0]?.points || 0),
      orderBy('points', 'desc'),
    ),
  )

  scoresQuerySnapshot.forEach((doc) => scores.push(doc.data()))

  return scores
}
