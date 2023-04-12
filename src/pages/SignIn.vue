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
  <button @click="() => signIn(email, password)">Submit</button>
  <button @click="() => signInWithGoogle('/')">Google</button>
  <button @click="() => signInWithTwitter('/')">Twitter</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { signIn, signInWithGoogle, signInWithTwitter } from '@/core/utils/auth'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
</script>
