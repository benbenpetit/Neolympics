<template>
  <h1>Create an account</h1>
  <input type="text" placeholder="email" name="email" id="email" v-model="email" />
  <input
    type="password"
    placeholder="password"
    name="password"
    id="password"
    v-model="password"
  />
  <button @click="register">Submit</button>
  <button @click="signInWithGoogle">Sign In with Google</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import router from '@/core/router'

const email = ref('')
const password = ref('')

const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log('Successfully registered!')
      router.push('/')
    })
    .catch((error) => {
      console.warn(error.code)
    })
}

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider()
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      console.log(result.user)
      router.push('/feed')
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>
