import router from '@/core/router'
import { useUserStore } from '@/core/store/user'
import { IUser } from '@/core/types/IUser'
import {
  GoogleAuthProvider,
  TwitterAuthProvider,
  User,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'

const getErrorMessage = (code: string) => {
  switch (code) {
    case 'auth/account-exists-with-different-credential':
      return 'Autre service utilisé'
    case 'auth/invalid-email':
      return 'Invalid email'
    case 'auth/user-not-found':
      return 'No account with that email was found'
    case 'auth/wrong-password':
      return 'Incorrect password'
    default:
      return 'Une erreur est survenue'
  }
}

export const signIn = (email: string, password: string) => {
  signInWithEmailAndPassword(getAuth(), email, password)
    .then(() => {
      console.log('Successfully signed in!')
      router.push('/')
    })
    .catch((error) => {
      const message = getErrorMessage(error.code)
      console.warn(message)
      return message
    })
}

export const register = (email: string, password: string) => {
  createUserWithEmailAndPassword(getAuth(), email, password)
    .then(() => {
      console.log('Successfully registered!')
      router.push('/')
    })
    .catch((error) => {
      const message = getErrorMessage(error.code)
      console.warn(message)
      return message
    })
}

export const signInWithGoogle = async (route = '/') => {
  const provider = new GoogleAuthProvider()
  await signInWithPopup(getAuth(), provider)
    .then(() => {
      console.log('Successfully registered!')
      router.push(route)
    })
    .catch((error) => {
      const message = getErrorMessage(error.code)
      console.warn(message)
      return message
    })
}

export const signInWithTwitter = async (route = '/') => {
  const provider = new TwitterAuthProvider()
  await signInWithPopup(getAuth(), provider)
    .then(() => {
      console.log('Successfully registered!')
      router.push(route)
    })
    .catch((error) => {
      const message = getErrorMessage(error.code)
      console.warn(message)
      return message
    })
}
