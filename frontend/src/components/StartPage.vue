<script setup>
import {useRouter} from "vue-router";

const router = useRouter();

function goToLogIn() {
  router.push("/login");
}

</script>

<template>
 <div class="start-page">
   <div class="logo">
     <img src="../assets/logo.png" alt="logo" />
   </div>
   <div class="top-row-buttons">
     <button class="login-button" @click="goToLogIn">Log in</button>
      <button class="sign-up-button">Sign up</button>
   </div>
   <div class="text-and-sign-up">
     <div class="start-page-text">
       <h1>Welcome!</h1>
       <p>
         Test your knowledge with our quizzes and have fun while learning something new!
       </p>
   </div>
     <div class="sign-up-today-button">
       <button>Sign up today!</button>
     </div>
    </div>
   <div class="big-logo">
     <img src="../assets/logo.png" alt="big-logo" />
 </div>
</div>
</template>

<style scoped>
.start-page {
  display: flex;
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

.top-row-buttons {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  gap: 10px;
}

.login-button, .sign-up-button {
  background-color: #6320EE;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 20px;
  cursor: pointer;
  margin-top: 5px;
  margin-right: 5px;
}

.text-and-sign-up {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  padding: 20px;
  margin-left: 20px;
}

.start-page-text h1 {
  font-size: 3.2rem;
  margin-bottom: 0.5rem;
}

.start-page-text p {
  font-size: 1.4rem;
}

.sign-up-today-button {
  margin-top: 20px;
}

.sign-up-today-button button {
  background-color: #EF8354;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 20px;
  cursor: pointer;
}

.big-logo {
  width: 50%;
  display: flex;
  align-items: center;
}

.big-logo img {
  max-width: 96%;
  height: auto;
  margin-top: 40px;
}

</style>