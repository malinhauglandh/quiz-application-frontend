<script>
export default {
  data() {
    return {
      errorMessage: "oops! something went wrong!",
      showError: false
    };
  },
};

</script>

<template>
  <div class="log-in-page">
    <div class="logo">
      <img src="../assets/logo.png" alt="logo" />
    </div>
    <h1>Login</h1>
    <div class="log-in-form">
      <form>
        <div class="username-input">
          <label for="username">Username:</label>
          <input type="text" id="username" name="username" />
        </div>
        <div class="password-input">
          <label for="password">Password:</label>
          <input type="password" id="password" name="password" />
        </div>
        <button class="log-in-button">Log in</button>
      </form>
      <p class="sign-up-text">If you don't have a user, click <a href="#">here</a> to sign up</p>
      <div class="error-message" v-if="showError">
        <p> {{ errorMessage }}</p>
      </div>
    </div>
  </div>

</template>

<style scoped>

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

h1 {
  margin-bottom: 30px;
  font-size: 4rem;
}

.username-input, .password-input {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

label {
  font-size: 1.2rem;
  margin-bottom: 5px;
}

input {
  padding: 8px;
  font-size: 1rem;
  width: 280px;
  border-radius: 5px;
  border: none;
}

.log-in-button {
  background-color: #6320EE;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  cursor: pointer;
  width: 300px;
  margin-top: 20px;
  font-size: 0.8rem;
}

.sign-up-text {
  margin-top: 30px;
}

.sign-up-text a {
  text-decoration: none;
  color: black;
  font-weight: bolder;
}

</style>