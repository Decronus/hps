<template>
  <div class="colors-wrap">
    <div
      class="colors-group"
      v-if="answers.length < 9 || currentPotential !== 0"
    >
      <color-card
        v-for="el of colors"
        :key="el.color"
        :color="el.color"
        :textColor="el.textColor"
        @click="colorChoiced(el.textColor)"
      />
    </div>
    <div class="button-and-text">
      <h2>Выбранные цвета</h2>
      <div class="text-wrap">
        <p v-for="color in answers" :key="color">
          {{ color }}
        </p>
      </div>
      <button class="button">СОЗДАТЬ ОТЧЕТ</button>
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
    colorChoiced(textColor) {
      this.$emit("choiced", textColor);
      console.log(textColor);
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

.button {
  padding: 20px 40px;
  border-radius: 8px;
  background: #2d9b0c;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.button:hover {
  background: #61a409;
}

.button:active {
  box-shadow: none;
}

.button-and-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
}

.text-wrap {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
