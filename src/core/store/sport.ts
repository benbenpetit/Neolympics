import { ISport } from '@/core/types/ISport'
import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Props {
  doneSports: {
    sport: ISport
    step: number
    difficulty: number
  }[]
}

export const useSportStore = defineStore(
  'sportStore',
  () => {
    const sportState = ref<Props>({
      doneSports: [],
    })

    const setSportState = (state: Props) => {
      sportState.value = state
    }

    const setSportStep = (sport: ISport, step: number) => {
      const doc = sportState.value.doneSports.find(
        (doneSport) => doneSport.sport === sport,
      )
      if (doc) {
        doc.step = step
      } else {
        sportState.value.doneSports.push({ sport: sport, step: step, difficulty: 0 })
      }
    }

    const setSportDifficulty = (sport: ISport, difficulty: number) => {
      const doc = sportState.value.doneSports.find(
        (doneSport) => doneSport.sport === sport,
      )
      if (doc) {
        doc.difficulty = difficulty
      } else {
        sportState.value.doneSports.push({
          sport: sport,
          step: 0,
          difficulty: difficulty,
        })
      }
    }

    const setInitialSportsStep = () => {
      sportState.value.doneSports.map((doneSport) => ({ ...doneSport, step: 0 }))
    }

    return {
      sportState,
      setSportState,
      setSportStep,
      setSportDifficulty,
      setInitialSportsStep,
    }
  },
  {
    persist: true,
  },
)
