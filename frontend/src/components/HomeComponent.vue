<template>
    <div class="home-component">
        <h1>Your recently made quizzes:</h1>
        <div class="quiz-box-container">
            <div class="quiz-box"></div>
            <div class="quiz-box"></div>
            <div class="quiz-box"></div>
        </div>
        <router-link to="/createquiz" class="create-quiz-button">CREATE NEW QUIZ</router-link>
    </div>
</template>

<style scoped>
.home-component {
    text-align: center;
}

.quiz-box-container {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
}

.quiz-box {
    width: calc(30% - 20px);
    background-color: white;
    height: 200px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    margin: 0 5px;
}

.create-quiz-button {
    display: inline-block;
    margin-top: 250px;
    margin-bottom: 20px;
    padding: 20px 40px;
    background-color: #6320EE;
    color: white;
    text-decoration: none;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 22px;
}

.create-quiz-button:hover {
    background-color: #7E41FDFF;
}
</style>
