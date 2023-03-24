import { IUser } from '@/core/types/IUser'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'userStore',
  () => {
    const userState = ref<IUser>({})

    const setUser = (user: IUser) => {
      userState.value = user
    }

    return {
      userState,
      setUser,
    }
  },
  {
    persist: true,
  },
)
