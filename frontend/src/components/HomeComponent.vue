<template>
  <div class="home-component">
    <div class="content-wrapper">
      <h1>Your recently made quizzes:</h1>
      <div class="quiz-box-container">
        <div class="quiz-box"></div>
        <div class="quiz-box"></div>
        <div class="quiz-box"></div>
      </div>
    </div>
    <router-link to="/createquiz" class="create-quiz-button">CREATE NEW QUIZ</router-link>
  </div>
</template>

<style scoped>
.home-component {
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Ensures content is spaced out */
  height: 100vh; /* Full height of the viewport */
  text-align: center;
}

.content-wrapper {
  overflow-y: auto; /* Makes the content scrollable */
  margin-bottom: 20px; /* Gives some space before the button */
}

.quiz-box-container {
  display: flex;
  flex-direction: row; /* Default orientation */
  justify-content: space-between;
  margin: 20px 20px 0; /* Adjusted to add margin top */
  flex-wrap: wrap; /* Adjusts boxes to wrap in smaller screens */
}

.quiz-box {
  width: calc(30% - 20px);
  background-color: white;
  height: 200px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  margin: 0 5px 10px; /* Added bottom margin */
}

.create-quiz-button {
  display: block;
  position: fixed;
  bottom: 20px;
  left: 50%;
  margin-left: -150px;
  width: 300px;
  padding: 20px 0;
  background-color: #6320EE;
  color: white;
  text-decoration: none;
  border-radius: 20px;
  text-align: center;
  font-size: 22px;
}

@media (max-width: 768px) {
  .quiz-box-container {
    flex-direction: column;
    align-items: center;
  }

  .quiz-box {
    width: 90%;
    margin: 10px 0;
  }

  h1 {
    font-size: 1.8rem;
  }
}
</style>
