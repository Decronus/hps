<template>
  <div class="colors-wrap">
    <div class="colors-group-and-buttons" v-if="currentPotential !== 0">
      <div class="colors-group">
        <color-card
          v-for="el of colors"
          :key="el.color"
          :color="el.color"
          :textColor="el.textColor"
          :currentPotential="currentPotential"
          :isEditMode="isEditMode"
          @click="!isEditMode && choicedColor(el.textColor)"
          @open-editor="openEditor(el.textColor)"
        />
      </div>
    </div>

    <div class="colors-choiced-wrap" v-if="answers.length > 0">
      <h3>Выбранные&nbsp;цвета</h3>
      <div class="colors-choiced-text">
        <p v-for="(color, index) in answers" :key="color">
          {{
            index + 1 >= 10
              ? `Хобби ${index - 5}. `
              : `Потенциал ${index + 1}. `
          }}
          <strong>{{ color }}</strong>
        </p>
      </div>
      <main-button
        :="disabledButton"
        @click="showFinalReport"
        v-if="answers.length === 12"
        >СОЗДАТЬ&nbsp;ОТЧЕТ</main-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "colors-wrap",

  props: {
    answers: {
      type: Array,
      required: true,
    },

    currentPotential: {
      type: Number,
      required: true,
    },

    colors: {
      type: Array,
      required: true,
    },

    isEditMode: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    choicedColor(textColor) {
      this.$emit("choiced", textColor);
    },

    nextPotential() {
      this.$emit("next");
    },

    showFinalReport() {
      this.$emit("show");
    },
    openEditor(textColor) {
      this.$emit("open-editor", textColor);
    },
  },

  computed: {
    disabledButton() {
      return {
        style: {
          background: this.answers.length < 12 ? "#cccccc" : undefined,
          boxShadow: this.answers.length < 12 ? "none" : undefined,
          pointerEvents: this.answers.length < 12 ? "none" : undefined,
          cursor: this.answers.length < 12 ? "none" : undefined,
        },
      };
    },
  },
};
</script>

<style scoped>
.colors-wrap {
  width: 100%;
  padding: 40px 40px 0 40px;
  display: flex;
  gap: 40px;
}

.colors-group {
  display: grid;
  grid-template-columns: repeat(3, 260px);
  grid-template-rows: repeat(3, 138px);
  gap: 20px;
}

.colors-group-and-buttons {
  display: flex;
  flex-direction: column;
}

.colors-choiced-text {
  padding: 16px 0;
}

.colors-choiced-text p {
  font-size: 14px;
  margin: 12px 0;
}

.error-and-button {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 30px;
}

.error {
  color: #c21c0d;
}
</style>
