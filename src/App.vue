<template>
  <router-view />
</template>

<script setup lang="ts">
import { Auth, getAuth, onAuthStateChanged } from '@firebase/auth'
import { onMounted, ref } from 'vue'
import { updateUserInDB } from '@/core/services/api/userApi'
import { useUserStore } from '@/core/store/user'

const { setUser } = useUserStore()
const isLoggedIn = ref(false)
let auth: Auth

onMounted(() => {
  auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true
      updateUserInDB(user)
    } else {
      setUser({})
      isLoggedIn.value = false
    }
  })
})
</script>
