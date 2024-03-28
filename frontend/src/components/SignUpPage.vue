<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const errorMessage = ref("oops! something went wrong!");
const showError = ref(false);

const router = useRouter();

const goToLogIn = () => {
  router.push("/login");
};

const goBack = () => {
  router.push("/");
};
</script>

<template>
  <div class="sign-up-page">
    <div class="logo">
      <img src="../assets/logo.png" alt="logo" @click="goBack" />
    </div>
    <div class="sign-up-box">
      <h1>Sign up</h1>
      <div class="sign-up-form">
        <form>
          <div class="email-input">
            <div class="box" />
            <input type="email" id="email" name="email" placeholder="email" />
          </div>
          <div class="username-input">
            <div class="box" />
            <input type="text" id="username" name="username" placeholder="username" />
          </div>
          <div class="password-input">
            <div class="box" />
            <input type="password" id="password" name="password" placeholder="password" />
          </div>
          <button class="sign-up-button">Sign up</button>
        </form>
        <p class="log-in-text">If you already have a user, click <a @click="goToLogIn">here</a> to log in</p>
        <div class="error-message" v-if="showError">
          <p> {{ errorMessage }}</p>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

.sign-up-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  position: relative;
}

.logo {
  position: absolute;
  top: -10px;
  left: -20px;
}

.logo img {
  width: 130px;
}

.sign-up-box {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.3);
  padding: 20px;
  border-radius: 35px;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.4);
  color: white;
}

.sign-up-form {
  margin-bottom: -20px;
  position: relative;
}

h1 {
  margin-bottom: 30px;
  font-size: 4rem;
}

.username-input, .password-input, .email-input {
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  height: 35px;
}

.box {
  background-color: #f7567c;
  width: 35px;
  height: 35px;
  margin-bottom: 5px;
  border: none;
}

.username-input input, .password-input input, .email-input input {
  padding: 8px;
  font-size: 1rem;
  width: 255px;
  background-color: rgba(255, 255, 255, 0);
  border-bottom: 1px solid white;
  border-left: none;
  border-right: none;
  border-top: none;
  color: white;
}

.username-input input:focus, .password-input input:focus, .email-input input:focus {
  outline: none;
  border-bottom: 1px solid #f7567c;
}

.username-input input::placeholder, .password-input input::placeholder, .email-input input::placeholder {
  color: white;
}

.sign-up-button {
  position: absolute;
  bottom: -59px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
  border: none;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  width: 280px;
  padding: 20px 20px;
  font-size: 1rem;
  color: white;
}

.sign-up-button:hover {
  background-color: #6320EE;
  color: white;
  cursor: pointer;
}

.log-in-text {
  margin-top: 30px;
  margin-bottom: 40px;
}

.log-in-text a {
  text-decoration: underline;
  color: white;
  font-weight: bolder;
  cursor: pointer;
}

</style>