<template>
  <div class="side-nav">
    <p
      v-for="n of 12"
      :key="n"
      :id="n"
      :="setStyleProperty(currentPotential, n)"
      class="side-nav-el"
      @click="changePotential"
    >
      {{ n <= 9 ? `Потенциал&nbsp;${n}` : `Хобби ${n - 6}` }}
    </p>
  </div>
</template>

<script>
export default {
  name: "side-nav",

  props: {
    currentPotential: {
      type: Number,
      required: true,
    },
    answers: {
      type: Array,
      required: true,
    },
  },

  methods: {
    changePotential(event) {
      this.$emit("change", event.target.id);
    },

    setStyleProperty(currentPotential, potential) {
      return {
        style: {
          background: currentPotential === potential ? "white" : undefined,
          boxShadow:
            currentPotential === potential
              ? "-4px 4px 5px rgba(0, 0, 0, 0.05)"
              : undefined,
          pointerEvents:
            this.answers.length < potential - 1 ? "none" : undefined,
          color: this.answers.length < potential - 1 ? "grey" : undefined,
        },
      };
    },
  },
};
</script>

<style scoped>
.side-nav {
  width: 200px;
  height: 100vh;
  padding-top: 50px;
  background: #f0f0f0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.side-nav-el {
  font-size: 16px;
  line-height: 50px;
  height: 50px;
  width: 100%;
  text-align: center;
  cursor: pointer;
  margin: 0 20px 0 20px;
}

.side-nav-el:hover {
  background: #e9e9e9;
}
</style>
