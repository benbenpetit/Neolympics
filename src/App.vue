<template>
  <!-- <nav class="c-nav">
    <router-link to="/">Home</router-link>
    <router-link to="/game">Game</router-link>
    <router-link to="/register">Register</router-link>
    <router-link to="/sign-in">SignIn</router-link>
    <router-link to="/quiz">Quiz</router-link>
    <router-link to="/choix-epreuve">Choix épreuve</router-link>
    <router-link to="/three">Three</router-link>
    <router-link to="/pattern">Pattern</router-link>
    <button @click="handleSignOut" v-if="isLoggedIn">Sign out</button>
  </nav> -->
  <router-view />
</template>

<script setup lang="ts">
import router from '@/core/router'
import { Auth, getAuth, onAuthStateChanged, signOut } from '@firebase/auth'
import { onMounted, ref } from 'vue'
import { updateUserInDB } from '@/core/services/api/userApi'

const isLoggedIn = ref(false)
let auth: Auth

onMounted(() => {
  auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true
      updateUserInDB(user)
    } else {
      isLoggedIn.value = false
    }
  })

  router.push('/competition/preparation')
})

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push('/')
  })
}
</script>
