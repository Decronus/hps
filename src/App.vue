<template>
  <div class="app">
    <side-nav :currentPotential="currentPotential" @change="setNewPotential" />
    <colors-wrap
      @choiced="nextPotential"
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
    };
  },
  methods: {
    setNewPotential(newPotential) {
      this.currentPotential = +newPotential;
    },
    setAnswer(textColor) {
      this.answers[this.currentPotential - 1] = textColor;
    },
    nextPotential(textColor) {
      this.setAnswer(textColor);
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
