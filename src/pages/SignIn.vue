<template>
  <h1>Sign in to existing account</h1>
  <p v-if="errorMessage">{{ errorMessage }}</p>
  <input type="text" placeholder="email" name="email" id="email" v-model="email" />
  <input
    type="password"
    placeholder="password"
    name="password"
    id="password"
    v-model="password"
  />
  <button @click="signIn">Submit</button>
  <button @click="signInWithGoogle">Sign In with Google</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import router from '@/core/router'

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const signIn = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log('Successfully signed in!')
      router.push('/')
    })
    .catch((error) => {
      console.warn(error.code)
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage.value = 'Invalid email'
          break
        case 'auth/user-not-found':
          errorMessage.value = 'No account with that email was found'
          break
        case 'auth/wrong-password':
          errorMessage.value = 'Incorrect password'
          break
        default:
          errorMessage.value = 'Email or password was incorrect'
          break
      }
    })
}

const signInWithGoogle = () => {}
</script>
