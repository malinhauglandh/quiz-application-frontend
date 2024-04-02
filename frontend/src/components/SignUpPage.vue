<script setup>
import {onBeforeUnmount, onMounted, ref} from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useStore } from '../store/store.js';

const email = ref('');
const username = ref('');
const password = ref('');

onMounted(() => {
  document.body.classList.add('signup');
});

onBeforeUnmount(() => {
  document.body.classList.remove('signup');
});

const errorMessage = ref("oops! something went wrong!");
const showError = ref(false);

const router = useRouter();
const store = useStore();

const goToLogIn = () => {
  router.push("/login");
};

const goBack = () => {
  router.push("/");
};

async (e) => { 
    e.preventDefault();

    if(email.value.trim() === '' || username.value.trim() === '' || password.value.trim() === '') {
        errorMessage.value = "Email, username, and password are required.";
        showError.value = true;
        return;
    }

    try {
        const response = await axios.post('http://localhost:8080/api/createUser', {
            email: email.value,
            username: username.value,
            password: password.value
        });
        store.saveToken(username.value, response.data);
        router.push("/home");
    } catch (error) {
        if (error.response && error.response.status === 409) {
            errorMessage.value = "Sign up failed: Username or email already in use.";
        }
        if(error.response && error.response.status === 500) {
            errorMessage.value = "User already exists.";
        } else {
            errorMessage.value = "An error occurred. Please try again later.";
        }
        showError.value = true;
    }
};
</script>

<template>
<body class="signup">
    <div class="sign-up-page">
      <div class="logo">
        <img src="../assets/logo.png" alt="logo" @click="goBack" />
      </div>
      <div class="sign-up-box">
        <h1>Sign up</h1>
        <div class="sign-up-form">
          <form>
            <div class="email-input">
              <font-awesome-icon icon="envelope" id="envelope-icon" />
              <input type="email" id="email" name="email" placeholder="email" />
            </div>
            <div class="username-input">
              <font-awesome-icon icon="user" id="user-icon" />
              <input type="text" id="username" name="username" placeholder="username" />
            </div>
            <div class="password-input">
              <font-awesome-icon icon="lock" id="lock-icon" />
              <input type="password" id="password" name="password" placeholder="password" />
            </div>
            <button class="sign-up-button" @click="goToHome">Sign up</button>
          </form>
          <p class="log-in-text">If you already have a user, click <a @click="goToLogIn">here</a> to log in</p>
          <div class="error-message" v-if="showError">
            <p> {{ errorMessage }}</p>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<style scoped>
.signup {
  background-image: linear-gradient(120deg, #bcb6ff 20%, #6320EE 80%);
}

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

.email-input, .username-input, .password-input {
  display: flex;
  align-items: center; 
  margin-bottom: 20px;
}


#envelope-icon, #user-icon, #lock-icon {
  margin-right: 10px;
  color: white; 
}


.email-input input, .username-input input, .password-input input {
  flex-grow: 1;
  padding: 8px;
  font-size: 1rem;
  background-color: rgba(255, 255, 255, 0);
  border: none;
  border-bottom: 1px solid white;
  margin-left: 5px; 
}

.email-input input::placeholder, .username-input input::placeholder, .password-input input::placeholder {
  color: white;
}

.email-input input:focus, .username-input input:focus, .password-input input:focus {
  outline: none;
  border-bottom: 1px solid #f7567c;
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

.error-message {
    color: #ff3860;
    font-weight: bold;
    font-size: 12px;
}
</style>
