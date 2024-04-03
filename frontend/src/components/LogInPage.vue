<template>
  <body class="login">
  <div class="log-in-page">
    <div class="logo">
      <img src="../assets/logo.png" alt="logo" @click="goBack" />
    </div>
    <div class="log-in-box">
      <h1>Login</h1>
      <div class="log-in-form">
        <form>
          <div class="username-input">
            <font-awesome-icon icon="user" id="user" />
            <input type="text" id="username" name="username" placeholder="username" />
          </div>
          <div class="password-input">
            <font-awesome-icon icon="lock" id="password" />
            <input type="password" id="password" name="password" placeholder="password" />
          </div>
          <p class="sign-up-text">If you don't have a user, click <a @click="goToSignUp">here</a> to sign up</p>
          <div class="error-message" v-if="showError">
            <p> {{ errorMessage }}</p>
          </div>
          <button class="log-in-button" @click="login">Log in</button>
        </form>
      </div>
    </div>
  </div>
  </body>
</template>

<script setup>
import {onBeforeUnmount, onMounted, ref} from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useStore } from '../store/store.js';

const username = ref('');
const password = ref('');
const errorMessage = ref("Oops! Something went wrong!");
const showError = ref(false);

onMounted(() => {
  document.body.classList.add('login');
});

onBeforeUnmount(() => {
  document.body.classList.remove('login');
});

const router = useRouter();
const store = useStore();

const goToSignUp = () => {
    router.push("/signup");
};

const goBack = () => {
    router.push("/");
};

const login = async (e) => {
    e.preventDefault();

    showError.value = false;

    if (username.value.trim() === '' || password.value.trim() === '') {
        errorMessage.value = "Username and password are required.";
        showError.value = true;
        return;
    }

    try {
        const response = await axios.post('http://localhost:8080/api/login', {
            username: username.value,
            password: password.value
        });

        store.saveToken(username.value, response.data);

        router.push("/home");
        console.log("Logged in!");

    } catch (error) {
        if (error.response && error.response.status === 401) {
            errorMessage.value = "Login failed: Incorrect username or password.";
        } else {
            errorMessage.value = "An error occurred. Please try again later.";
        }
        showError.value = true;
    }
};
</script>

<style scoped>
.login {
  background-image: linear-gradient(120deg, #bcb6ff 20%, #6320EE 80%);

}

.log-in-page {
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

.log-in-box {
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

.log-in-form {
  margin-bottom: -20px;
  position: relative;
}

h1 {
  margin-bottom: 30px;
  font-size: 4rem;
}

.username-input, .password-input {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  height: 35px;
}

.username-input input, .password-input input {
  flex: 1;
  padding: 8px;
  font-size: 1rem;
  background-color: rgba(255, 255, 255, 0);
  border: none;
  border-bottom: 1px solid white;
  margin-left: 10px;
}

.username-input input::placeholder, .password-input input::placeholder {
  color: white;
}

.username-input input:focus, .password-input input:focus {
  outline: none;
  border-bottom: 1px solid #f7567c;
}

.username-input input::placeholder, .password-input input::placeholder {
  color: white;
}

.username-input .box, .password-input .box {
  background-color: #f7567c;
  width: 35px;
  height: 35px;
  margin-bottom: 5px;
  border: none;
}

.log-in-button {
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

.log-in-button:hover {
  background-color: #6320EE;
  color: white;
  cursor: pointer;
}

.sign-up-text {
  margin-top: 30px;
  margin-bottom: 40px;
}

.sign-up-text a {
  text-decoration: underline;
  background-color: rgba(255, 255, 255, 0.3);
  color: white;
  font-weight: bolder;
  cursor: pointer;
}

.input-icon {
  color: white;
  margin-right: 10px;
}

.error-message {
  color: red;
  font-weight: bold;
  font-size: 12px;
}

</style>