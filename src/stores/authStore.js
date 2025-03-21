import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const token = ref('')
    const setToken = (t) => (token.value = t)
    const account = ref('')
    const setAccount = (a) => {
      account.value = a
    }

    return { token, setToken, account, setAccount }
  },
  {
    persist: true,
  },
)
