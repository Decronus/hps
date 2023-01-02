<template>
  <div class="app">
    <side-nav
      v-if="!isVisibleFinalReport"
      @change="setNewPotential"
      :answers="answers"
      :currentPotential="currentPotential"
    />
    <colors-wrap
      v-if="!isVisibleFinalReport"
      @choiced="setAnswer"
      @show="setIsVisibleFinalReport"
      :answers="answers"
      :currentPotential="currentPotential"
      :colors="colors"
    />
    <final-report
      v-if="isVisibleFinalReport"
      :answers="answers"
      :colors="colors"
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
      isVisibleFinalReport: false,
      colors: [
        { color: "#48BF23", textColor: "Изумруд" },
        { color: "#F19E38", textColor: "Цитрин" },
        { color: "#8C1AF5", textColor: "Аметист" },
        { color: "#52DCDE", textColor: "Сапфир" },
        { color: "#CA2213", textColor: "Рубин" },
        { color: "#ECEC33", textColor: "Гелиодор" },
        { color: "#282828", textColor: "Шунгит" },
        { color: "#A46F63", textColor: "Янтарь" },
        { color: "#DE9E9C", textColor: "Гранат" },
      ],
    };
  },

  methods: {
    setNewPotential(newPotential) {
      this.currentPotential = +newPotential;
    },

    setAnswer(textColor) {
      this.answers[this.currentPotential - 1] = textColor;
      if (this.currentPotential === 12) {
        this.currentPotential = 0;
        return;
      }
      this.currentPotential += 1;
    },
    setIsVisibleFinalReport() {
      this.isVisibleFinalReport = !this.isVisibleFinalReport;
    },
  },

  //   nextPotential() {
  //     if (this.currentPotential === 9) {
  //       this.currentPotential = 0;
  //       return;
  //     }
  //   },

  // setAnswer(textColor) {
  //   if (this.currentPotential >= 7 && this.currentPotential <= 9) {
  //     if (this.temporaryAnswersArray.includes(textColor)) {
  //       this.temporaryAnswersArray.splice(
  //         this.temporaryAnswersArray.indexOf(textColor),
  //         1
  //       );
  //     } else {
  //       this.temporaryAnswersArray.push(textColor);
  //     }
  //   } else {
  //     this.answers[this.currentPotential - 1] = textColor;
  //     if (this.currentPotential === 12) {
  //       this.currentPotential = 0;
  //       return;
  //     }
  //     this.currentPotential += 1;
  //   }
  // },

  // nextPotential() {
  //   if (!this.temporaryAnswersArray[0]) {
  //     this.isError = true;
  //     return;
  //   }
  //   this.answers[this.currentPotential - 1] = this.temporaryAnswersArray;
  //   this.temporaryAnswersArray = [];

  //   if (this.currentPotential === 9) {
  //     this.isError = false;
  //     this.currentPotential = 0;
  //     return;
  //   }
  //   this.isError = false;
  //   this.currentPotential += 1;
  // },
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
