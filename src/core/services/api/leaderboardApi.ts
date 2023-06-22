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
  updateDoc,
  DocumentReference,
  QueryDocumentSnapshot,
} from 'firebase/firestore'
import { db } from '@/firebase'
import { IMaxSession, IMaxSessionWUser, IScore, IScoreWUser } from '@/core/types/IScore'

export const addScoreSkate = async (sport: IScore) => {
  sport = {
    ...sport,
    createdAt: sport.createdAt ?? new Date(),
    sportId: 'skate',
  }

  const allUserScores = await getAllScoresByUserId(sport.userId ?? '')
  const skateScore = allUserScores.find((score) => score.data().sportId === 'skate')

  if (skateScore) {
    if (
      sport.points > skateScore.data().points ||
      (sport.points >= skateScore.data().points &&
        (sport?.quiz ?? 0) > (skateScore.data().quiz ?? 0))
    ) {
      await updateDoc(doc(db, 'scores', skateScore.id) as DocumentReference<IScore>, {
        points: sport.points,
        quiz: sport.quiz,
        createdAt: new Date(),
      })
    }
  } else {
    await addDoc(collection(db, 'scores'), {
      ...sport,
    })
  }
}

export const addScore = async (sport: IScore) => {
  sport = { ...sport, createdAt: new Date() }

  await addDoc(collection(db, 'scores'), {
    ...sport,
  })
}

export const getTotalScore = (maxSession: IMaxSession) =>
  (maxSession?.break ?? 0) +
  (maxSession?.skate ?? 0) +
  (maxSession?.surf ?? 0) +
  (maxSession?.climbing ?? 0)

export const addMaxSession = async (maxSession: IMaxSession, userId?: string) => {
  const totalScore = getTotalScore(maxSession)
  const { userMaxSessionId: existingMaxSessionId } = await getUserMaxSession(userId ?? '')

  if (existingMaxSessionId) {
    await updateDoc(
      doc(db, 'maxSessions', existingMaxSessionId) as DocumentReference<IMaxSession>,
      {
        ...maxSession,
        totalScore,
        createdAt: new Date(),
      },
    )
  } else {
    await addDoc(collection(db, 'maxSessions') as CollectionReference<IMaxSession>, {
      ...maxSession,
      userId,
      totalScore,
      createdAt: new Date(),
    })
  }
}

export const getMaxSessionHigherThanStored = async (
  maxSession: IMaxSession,
  userId?: string,
) => {
  const { userMaxSession: storedMaxSession } = await getUserMaxSession(userId ?? '')
  const totalScoreStoredMaxSession = getTotalScore(storedMaxSession ?? {})
  const totalScoreMaxSession = getTotalScore(maxSession)

  return totalScoreMaxSession > totalScoreStoredMaxSession
}

export const getAllScoresByUserId = async (userId: string) => {
  let scores: QueryDocumentSnapshot<IScore>[] = []

  const scoresQuerySnapshot = await getDocs(
    query(
      collection(db, 'scores') as CollectionReference<IScore>,
      where('userId', '==', userId),
    ),
  )

  for (const scoreDoc of scoresQuerySnapshot.docs) {
    scores.push(scoreDoc)
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

export const getUserMaxSession = async (userId: string) => {
  const maxSessionsQuerySnapshot = await getDocs(
    query(collection(db, 'maxSessions') as CollectionReference<IMaxSession>),
  )

  const userMaxSession = maxSessionsQuerySnapshot.docs.find(
    (doc) => doc.data().userId === userId,
  )

  return { userMaxSessionId: userMaxSession?.id, userMaxSession: userMaxSession?.data() }
}

export const getAllMaxSessions = async () => {
  let maxSessions: IMaxSessionWUser[] = []

  const maxSessionsQuerySnapshot = await getDocs(
    query(collection(db, 'maxSessions') as CollectionReference<IMaxSession>),
  )

  for (const maxSessionDoc of maxSessionsQuerySnapshot.docs) {
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
