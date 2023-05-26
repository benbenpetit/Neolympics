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
import { IMaxSession, IMaxSessionWUser, IScore, IScoreWUser } from '@/core/types/IScore'

export const addScoreSkate = async (sport: IScore) => {
  sport = {
    ...sport,
    createdAt: sport.createdAt ?? new Date(),
    sportId: 'skate',
  }

  await addDoc(collection(db, 'scores'), {
    ...sport,
  })
}

export const addScore = async (sport: IScore) => {
  sport = { ...sport, createdAt: new Date() }

  await addDoc(collection(db, 'scores'), {
    ...sport,
  })
}

export const addMaxSession = async (maxSession: IMaxSession, userId?: string) => {
  const totalScore =
    (maxSession?.break ?? 0) +
    (maxSession?.skate ?? 0) +
    (maxSession?.surf ?? 0) +
    (maxSession?.climbing ?? 0)

  await addDoc(collection(db, 'maxSessions') as CollectionReference<IMaxSession>, {
    ...maxSession,
    userId,
    totalScore,
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
  let scores: IScoreWUser[] = []

  const scoresQuerySnapshot = await getDocs(
    query(
      collection(db, 'scores') as CollectionReference<IScore>,
      where('sportId', '==', sportId),
      orderBy('points', 'asc'),
      limitToLast(limit),
    ),
  )

  for (const scoreDoc of scoresQuerySnapshot.docs) {
    const userId = scoreDoc.get('userId')
    const userDoc = await getDoc(doc(db, 'users', userId))

    scores.push({
      score: scoreDoc.data(),
      user: userDoc.data(),
    })
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
