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

    <button class="edit-mode-button" @click="toggleEditMode">
      <div
        class="edit-mode-indicator"
        :style="{ background: isEditMode ? 'green' : undefined }"
      ></div>
      Режим<br />редактирования
    </button>
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

    isEditMode: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    toggleEditMode() {
      this.$emit("toggle-edit-mode");
    },

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
          pointerEvents: !this.isEditMode
            ? this.answers.length < potential - 1
              ? "none"
              : undefined
            : undefined,
          color: !this.isEditMode
            ? this.answers.length < potential - 1
              ? "grey"
              : undefined
            : undefined,
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

.edit-mode-button {
  position: relative;
  background: #f0f0f0;
  font-size: 13px;
  margin-top: 50px;
  padding: 10px;
  color: #666;
  border-radius: 6px;
  outline: none;
  border: 1px solid #666;
  cursor: pointer;
}

.edit-mode-button:hover {
  background: #ddd;
}

.edit-mode-indicator {
  position: absolute;
  top: 12.5px;
  left: 24px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgb(181, 4, 4);
}
</style>
