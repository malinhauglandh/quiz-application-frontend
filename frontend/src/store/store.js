import { defineStore } from "pinia";
import { ref } from "vue";

export const useStore = defineStore("token", () => {
  const jwtToken = ref(null);
  const loggedInUser = ref(null);


  function saveToken(username, token) {
    loggedInUser.value = username;
    jwtToken.value = token;
  }

  function clearToken() {
    jwtToken.value = null;
    loggedInUser.value = null;
  }

  return { jwtToken, loggedInUser, saveToken, clearToken};
}, 
{
  persist: {
    storage: sessionStorage,
    enabled: true
  }
});