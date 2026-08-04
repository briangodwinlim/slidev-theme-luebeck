import { defineKatexSetup } from '@slidev/types'

export default defineKatexSetup(() => {
  return {
    maxExpand: 2000,
    throwOnError: false,
    strict: 'warn',
  }
})
