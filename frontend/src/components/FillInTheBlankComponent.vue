<template>
    <div class="true-or-false-component fill-in-the-blank-component">
      <h2>New question with fill in the blank answer</h2>
      <div class="input-field">
  <label for="first-part" class="question-label">First part</label>
  <div class="input-description">Fill in the first part of the question:</div>
  <input type="text" id="first-part" v-model="firstPart">
</div>
<div class="input-field">
  <label for="fill-in-the-blank" class="question-label">Fill in the blank</label>
  <div class="input-description">Fill in the blank word:</div>
  <input type="text" id="fill-in-the-blank" v-model="fillInTheBlank" class="blank-input">
</div>
<div class="input-field">
  <label for="rest-of-the-question" class="question-label">Remaining part</label>
  <div class="input-description">Fill in the rest of the question:</div>
  <input type="text" id="rest-of-the-question" v-model="restOfTheQuestion">
</div>
      <div class="button-container">
        <button class="button cancel-button" @click="cancelQuestion">CANCEL</button>
        <button class="button save-button" @click="saveQuestion">SAVE AND GO BACK</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const firstPart = ref('');
  const fillInTheBlank = ref('');
  const restOfTheQuestion = ref('');
  const router = useRouter();
  
  const saveQuestion = () => {
    router.push('/addQuestions');
  };
  
  const cancelQuestion = () => {
    router.push('/addQuestions');
  };
  
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,200..800;1,200..800&display=swap');

  .true-or-false-component {
    max-width: 800px;
    margin: 50px auto;
    padding: 40px;
    background: #fff;
    border-radius: 8px;
    font-family: 'Karla', sans-serif;
  }
  
  .true-or-false-component h2,
  .true-or-false-component h4 {
    color: #333;
    text-align: center;
    margin-top: 20px;
  }
  
  .true-or-false-component h2 {
    font-weight: 700;
    font-size: 2rem;
  }
  
  .true-or-false-component .input-field {
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
}

.true-or-false-component .question-label {
  align-self: flex-start;
  font-weight: bold;
  margin-bottom: 0.5rem; /* Reduced margin to better align with the input */
}

.true-or-false-component .input-description {
  align-self: flex-start;
  font-size: 14px;
  margin-bottom: 0.5rem; /* Adjusted spacing */
  text-align: left;
}

.true-or-false-component .input-field {
  display: flex;
  flex-direction: column;
  align-items: center; /* Centers the flex items on the cross axis */
  margin-bottom: 2rem;
}

.true-or-false-component input[type="text"] {
  width: 80%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 1rem;
}
  .true-or-false-component .cancel-button {
    margin-right: 80px;
  }
  
  .true-or-false-component .save-button {
    margin-left: 80px;
  }
  
  .true-or-false-component .button {
    padding: 15px 30px;
    background-color: #6320EE;
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    margin-top: 10px;
    font-family: "Karla", sans-serif;
  }
  
  .true-or-false-component .button:hover {
    background-color: #7E41FDFF;
  }
  
  .true-or-false-component h4 {
    color: #676767;
    margin-top: -15px;
  }

  .true-or-false-component input[type="text"]:focus {
    outline: none;
    border-color: #6320EE;
    box-shadow: 0 1px 6px -2px rgba(99, 32, 238, 0.5);
    background-color: #fff;
  }

  </style>
  