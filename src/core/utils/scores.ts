import { IMaxSession, IMaxSessionWUser } from '@/core/types/IScore'

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
