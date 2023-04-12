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

export const addScoreSkate = async (sport: IScore) => {
  sport = { ...sport, createdAt: new Date(), sportId: 'skate' }

  return await addDoc(collection(db, 'scores'), {
    ...sport,
  })
}

export const getAllScoresByUserId = async (userId: string) => {
  let scores: IScore[] = []

  const scoresQuerySnapshot = await getDocs(
    query(
      collection(db, 'scores') as CollectionReference<IScore>,
      where('userId', '==', userId),
    ),
  )

  for (const scoreDoc of scoresQuerySnapshot.docs) {
    scores.push(scoreDoc.data())
  }

  return scores
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

  for (const scoreDoc of scoresQuerySnapshot.docs) {
    scores.push(scoreDoc.data())
  }

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

  for (const scoreDoc of scoresQuerySnapshot.docs) {
    scores.push(scoreDoc.data())
  }

  return scores
}

export const getUser = async (userId: string) => {
  const userQuerySnapshot = await getDoc(doc(db, 'users', userId))

  return userQuerySnapshot.data()
}

export const getAllMaxSessions = async () => {
  let maxSessions: IMaxSessionWUser[] = []

  const maxScoresQuerySnapshot = await getDocs(
    query(collection(db, 'maxSessions') as CollectionReference<IScore>),
  )

  for (const maxSessionDoc of maxScoresQuerySnapshot.docs) {
    const userId = maxSessionDoc.get('userId')
    const userDoc = await getDoc(doc(db, 'users', userId))

    maxSessions.push({
      maxSession: maxSessionDoc.data(),
      user: userDoc.data(),
    })
  }

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

  for (const scoreDoc of scoresQuerySnapshot.docs) {
    scores.push(scoreDoc.data())
  }

  return scores
}
