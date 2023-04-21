import { IMaxSession, IMaxSessionWUser, IScore } from '@/core/types/IScore'
import { ISport } from '@/core/types/ISport'

export const getSessionSum = (session: IMaxSession) => {
  return (
    (session?.break ?? 0) +
    (session?.climbing ?? 0) +
    (session?.skate ?? 0) +
    (session?.surf ?? 0)
  )
}

export const getSortedMaxSessionsWUser = (maxSessions: IMaxSessionWUser[]) => {
  return maxSessions
    .sort((a, b) => getSessionSum(b.maxSession) - getSessionSum(a.maxSession))
    .map((maxSession, index) => ({
      ...maxSession,
      maxSession: { ...maxSession.maxSession, rank: index + 1 },
    }))
}

export const getUserSurroundingScores = (userId: string = '', inScores: IScore[]) => {
  const userScoreIndex = inScores.map((score) => score.userId).indexOf(userId)

  if (userScoreIndex === -1) {
    return []
  }

  if (userScoreIndex < 3) {
    return null
  }

  return inScores.slice(userScoreIndex - 1, userScoreIndex + 2)
}

export const getSortedInProgressMaxSessions = (
  maxSessions: IMaxSessionWUser[],
  doneSports: ISport[],
) => {
  const truncateMaxSessions = maxSessions.map((maxSession) => ({
    ...maxSession,
    maxSession: Object.assign(
      {
        userId: maxSession.maxSession.userId,
      },
      ...doneSports.map((doneSport) => ({
        [doneSport]: maxSession.maxSession[doneSport],
        [doneSport + 'Quiz']: (maxSession.maxSession as any)[doneSport + 'Quiz'],
      })),
    ),
  }))

  return truncateMaxSessions
}
