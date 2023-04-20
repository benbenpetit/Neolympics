import { IMaxSession } from '@/core/types/IScore'
import { IGlobalScores, IScore } from '@/core/types/IScore'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useScoreStore = defineStore(
  'scoreStore',
  () => {
    const scoreState = ref<IGlobalScores>({
      currentScores: {},
      maxScores: {},
      maxSession: {},
    })

    const setScoreState = (globalScores: IGlobalScores) => {
      scoreState.value = globalScores
    }

    const setCurrentScore = (score: IScore) => {
      if (!score?.sportId) return
      scoreState.value.currentScores[
        score.sportId as keyof typeof scoreState.value.currentScores
      ] = score.points
    }

    const removeCurrentScore = (sportId: string) => {
      if (!sportId) return
      scoreState.value.currentScores[
        sportId as keyof typeof scoreState.value.currentScores
      ] = undefined
    }

    const removeCurrentScores = () => {
      scoreState.value.currentScores = {}
    }

    const setMaxScore = (score: IScore) => {
      if (!score.sportId) return
      scoreState.value.maxScores = scoreState.value.maxScores
    }

    const removeMaxScore = (sportId: string) => {
      if (!sportId) return
      scoreState.value.maxScores[sportId as keyof typeof scoreState.value.maxScores] =
        undefined
    }

    const removeMaxScores = () => {
      scoreState.value.maxScores = {}
    }

    const setMaxSession = (maxSession: IMaxSession) => {
      const totalScore =
        (maxSession?.break ?? 0) +
        (maxSession?.skate ?? 0) +
        (maxSession?.surf ?? 0) +
        (maxSession?.climbing ?? 0)

      scoreState.value.maxSession = { ...maxSession, totalScore }
    }

    const removeMaxSession = () => {
      scoreState.value.maxSession = {}
    }

    return {
      scoreState,
      setScoreState,
      setCurrentScore,
      removeCurrentScore,
      removeCurrentScores,
      setMaxScore,
      removeMaxScore,
      removeMaxScores,
      setMaxSession,
      removeMaxSession,
    }
  },
  {
    persist: true,
  },
)
