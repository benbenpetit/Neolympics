import { IUser } from '@/core/types/IUser'
import { db } from '@/firebase'
import { User } from 'firebase/auth'
import { addDoc, collection, setDoc, updateDoc, doc } from 'firebase/firestore'

export const updateUserInDB = async (user: User) => {
  const dataUser: IUser = {
    id: user.uid,
    displayName: user.displayName ?? undefined,
    photoURL: user.photoURL ?? undefined,
  }
  // return await updateDoc(doc(collection(db, 'users', dataUser.id)), { ...dataUser })
}
