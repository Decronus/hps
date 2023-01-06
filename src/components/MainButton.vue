<template>
  <button class="main-button"><slot></slot></button>
</template>

<script>
export default {
  name: "main-button",
};
</script>

<style scoped>
.main-button {
  padding: 16px 30px;
  border-radius: 8px;
  background: #2d9b0c;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-size: 14px;
}

.main-button:hover {
  background: #61a409;
}

.main-button:active {
  box-shadow: none;
}
</style>
