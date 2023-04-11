import { initializeApp } from 'firebase/app'
import { useFirestore } from 'vuefire'

const firebaseConfig = {
  apiKey: 'AIzaSyDmCAXEFXmPUqle4yRK3gqNGEINoGIAluk',
  authDomain: 'neo-jo.firebaseapp.com',
  projectId: 'neo-jo',
  storageBucket: 'neo-jo.appspot.com',
  messagingSenderId: '164298982481',
  appId: '1:164298982481:web:9047c52d2df9b2a6172470',
}

export const firebaseApp = initializeApp(firebaseConfig)

export const db = useFirestore()
