<template>
  <div class="colors-wrap">
    <div
      class="colors-group-and-buttons"
      v-if="answers.length < 9 || currentPotential !== 0"
    >
      <div class="colors-group">
        <color-card
          v-for="el of colors"
          :key="el.color"
          :color="el.color"
          :textColor="el.textColor"
          @click="choicedColor(el.textColor)"
        />
      </div>
      <secondary-button
        v-if="currentPotential >= 7 && currentPotential <= 9"
        @click="nextPotential"
        >Далее</secondary-button
      >
    </div>

    <div class="colors-choiced-wrap">
      <h2>Выбранные&nbsp;цвета</h2>
      <div class="colors-choiced-text-and-button">
        <ol>
          <li v-for="color in answers" :key="color">
            {{ color }}
          </li>
        </ol>
      </div>
      <main-button :="disabledButton">СОЗДАТЬ&nbsp;ОТЧЕТ</main-button>
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
  },
  data() {
    return {
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
    choicedColor(textColor) {
      this.$emit("choiced", textColor);
      console.log(textColor);
    },
    nextPotential() {
      this.$emit("next");
    },
  },
  computed: {
    disabledButton() {
      return {
        style: {
          background: this.answers.length < 9 ? "#cccccc" : undefined,
          boxShadow: this.answers.length < 9 ? "none" : undefined,
          pointerEvents: this.answers.length < 9 ? "none" : undefined,
          cursor: this.answers.length < 9 ? "none" : undefined,
        },
      };
    },
  },
};
</script>

<style scoped>
.colors-wrap {
  width: 100%;
  padding: 66px 40px 0 40px;
  display: flex;
  gap: 50px;
}

.colors-group {
  display: grid;
  grid-template-columns: repeat(3, 260px);
  grid-template-rows: repeat(3, 138px);
  gap: 44px;
}

.colors-group-and-buttons {
  display: flex;
  flex-direction: column;
}

.colors-choiced-text-and-button {
  padding: 30px 0 30px 18px;
}

.colors-choiced-text-and-button ol li {
  padding: 5px 0;
}
</style>
