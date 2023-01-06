<template>
  <div class="app">
    <side-nav
      @set-final-report-true="isVisibleFinalReport = true"
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
      @open-editor="openColorEditor"
      :isEditMode="isEditMode"
    />
    <final-report
      @set-final-report-false="isVisibleFinalReport = false"
      v-if="isVisibleFinalReport || isVisibleFinalReportEditMode"
      :answers="answers"
      :colors="colors"
      :isEditMode="isEditMode"
      @open-editor="openDescriptionEditor"
      :dbSnapshot="dbSnapshot"
      @after-saving-pdf="resetDataAfterSavingPDF"
    />
    <content-editor
      v-if="isVisibleEditor"
      @close-editor="closeEditor"
      :currentTextColorForEditor="currentTextColorForEditor"
      :currentTextForEditor="currentTextForEditor"
      :currentIdForEditor="currentIdForEditor"
      :currentPotential="currentPotential"
      :isVisibleFinalReport="isVisibleFinalReport"
      :dbSnapshot="dbSnapshot"
    />
  </div>
</template>

<script>
import { getDatabase, ref, child, get } from "firebase/database";
import { dbSnapshot } from "./firebase";

export default {
  data() {
    return {
      dbSnapshot: null,

      answers: [],
      currentPotential: 1,
      currentTextColorForEditor: "",
      currentIdForEditor: "",

      isVisibleFinalReport: false,
      isVisibleFinalReportEditMode: false,
      isVisibleEditor: false,
      isEditMode: false,

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

    isVisibleFinalReport() {
      localStorage.setItem("isVisibleFinalReport", this.isVisibleFinalReport);
    },
  },

  methods: {
    resetDataAfterSavingPDF() {
      this.answers = [];
      this.currentPotential = 1;
    },

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
    openColorEditor(textColor) {
      this.isVisibleEditor = true;
      this.currentTextColorForEditor = textColor;
    },

    openDescriptionEditor(id) {
      this.isVisibleEditor = true;
      this.currentIdForEditor = id;
      console.log("id", id);
    },

    closeEditor() {
      const close = confirm(
        "Несохранненые изменения будут потеряны. \nВы действительно хотите выйти?"
      );
      if (close) {
        this.isVisibleEditor = false;
        location.reload();
      }
    },
  },

  mounted() {
    const database = getDatabase();
    const dbRef = ref(database);
    get(child(dbRef, "/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log("snapshot", snapshot.val());
          this.dbSnapshot = { ...snapshot.val() };
        } else {
          alert("Нет доступных данных");
        }
      })
      .catch((error) => {
        alert(error);
      });

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

    if (localStorage.getItem("isVisibleFinalReport")) {
      if (localStorage.getItem("isVisibleFinalReport") === "true") {
        this.isVisibleFinalReport = true;
      } else {
        this.isVisibleFinalReport = false;
      }
    } else {
      localStorage.setItem("isVisibleFinalReport", false);
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
