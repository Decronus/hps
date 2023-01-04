<template>
  <div class="app">
    <side-nav
      v-if="!isVisibleFinalReport"
      @change="setNewPotential"
      :answers="answers"
      :currentPotential="currentPotential"
      :isEditMode="isEditMode"
      @toggle-edit-mode="toggleEditMode"
    />
    <colors-wrap
      v-if="!isVisibleFinalReport"
      @choiced="setAnswer"
      @show="setIsVisibleFinalReport"
      :answers="answers"
      :currentPotential="currentPotential"
      :colors="colors"
      @open-editor="openEditor"
      :isEditMode="isEditMode"
    />
    <final-report
      v-if="isVisibleFinalReport"
      :answers="answers"
      :colors="colors"
      :dbSnapshot="dbSnapshot"
    />
    <content-editor
      v-if="isVisibleEditor"
      @close-editor="closeEditor"
      :currentTextColorForEditor="currentTextColorForEditor"
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
      isVisibleFinalReport: false,
      isVisibleEditor: false,
      isEditMode: false,
      currentTextColorForEditor: "",
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

  watch: {
    currentPotential() {
      localStorage.setItem("currentPotential", this.currentPotential);
    },
  },

  methods: {
    toggleEditMode() {
      this.isEditMode = !this.isEditMode;
      localStorage.setItem("isEditMode", this.isEditMode);
      this.currentPotential = 1;
      this.answers = [];
    },

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
    openEditor(textColor) {
      this.isVisibleEditor = true;
      this.currentTextColorForEditor = textColor;
      console.log("curtextcolor", this.currentTextColorForEditor);
    },
    closeEditor() {
      const close = confirm(
        "Несохранненые изменения будут потеряны. Вы действительно хотите выйти?"
      );
      if (close) {
        this.isVisibleEditor = false;
        location.reload();
      }
    },
  },

  mounted() {
    if (localStorage.getItem("isEditMode")) {
      if (localStorage.getItem("isEditMode") === "true") {
        this.isEditMode = true;
        this.currentPotential = +localStorage.getItem("currentPotential");
      } else {
        this.isEditMode = false;
      }
    } else {
      localStorage.setItem("isEditMode", false);
    }
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
