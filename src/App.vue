<template>
  <div class="app">
    <side-nav
      @change="setNewPotential"
      :answers="answers"
      :currentPotential="currentPotential"
    />
    <colors-wrap
      @choiced="setAnswer"
      @next="nextPotential"
      :answers="answers"
      :currentPotential="currentPotential"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPotential: 1,
      answers: [],
      temporaryAnswersArray: [],
    };
  },
  methods: {
    setNewPotential(newPotential) {
      this.currentPotential = +newPotential;
    },

    setAnswer(textColor) {
      if (this.currentPotential >= 7 && this.currentPotential <= 9) {
        this.temporaryAnswersArray.push(textColor);
      } else {
        this.answers[this.currentPotential - 1] = textColor;
        if (this.currentPotential === 9) {
          this.currentPotential = 0;
          return;
        }
        this.currentPotential += 1;
      }
    },
    nextPotential() {
      this.answers[this.currentPotential - 1] = this.temporaryAnswersArray;
      this.temporaryAnswersArray = [];
      if (this.currentPotential === 9) {
        this.currentPotential = 0;
        return;
      }
      this.currentPotential += 1;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
  color: #282828;
}

.app {
  display: flex;
}
</style>
