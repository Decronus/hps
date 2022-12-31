<template>
  <div class="side-nav">
    <p
      v-for="potential of potentialsAmount"
      :key="potential"
      :id="potential"
      :="setStyleProperty(currentPotential, potential)"
      class="side-nav-el"
      @click="changePotential"
    >
      Потенциал&nbsp;{{ potential }}
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
  },
  data() {
    return {
      potentialsAmount: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    };
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
          //   pointerEvents: currentPotential < potential ? "none" : undefined,
          //   color: currentPotential < potential ? "grey" : undefined,
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
  line-height: 60px;
  height: 60px;
  width: 100%;
  text-align: center;
  cursor: pointer;
  margin: 0 20px 0 20px;
}

.side-nav-el:hover {
  background: #e9e9e9;
}
</style>
