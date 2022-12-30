<template>
  <div class="colors-wrap">
    <color-card
      v-for="el of colors"
      :key="el.color"
      :color="el.color"
      :textColor="el.textColor"
    />
  </div>
</template>

<script>
export default {
  name: "colors-wrap",
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
};
</script>

<style scoped>
.colors-wrap {
  width: 100%;
  padding: 66px;
  display: grid;
  grid-template-columns: repeat(3, 260px);
  grid-template-rows: repeat(3, 138px);
  gap: 44px;
}
</style>
