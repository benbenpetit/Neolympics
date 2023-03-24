<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/feed">Feed</router-link>
    <router-link to="/game">Game</router-link>
    <router-link to="/register">Register</router-link>
    <router-link to="/sign-in">SignIn</router-link>
    <button @click="handleSignOut" v-if="isLoggedIn">Sign out</button>
  </nav>
  <router-view />
</template>

<script setup lang="ts">
import router from '@/core/router'
import { Auth, getAuth, onAuthStateChanged, signOut } from '@firebase/auth'
import { onMounted, ref } from 'vue'

const isLoggedIn = ref(false)
let auth: Auth

onMounted(() => {
  auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true
    } else {
      isLoggedIn.value = false
    }
  })
})

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push('/')
  })
}
</script>
