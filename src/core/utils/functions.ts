import { ISport } from '@/core/types/ISport'

export const getArrayUnique = (array: any[]) => {
  const a = array.concat()

  for (let i = 0; i < a.length; ++i) {
    for (let j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j]) a.splice(j--, 1)
    }
  }

  return a
}
