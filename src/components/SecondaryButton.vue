<template>
  <button class="secondary-button"><slot></slot></button>
</template>

<script>
export default {
  name: "secondary-button",
};
</script>

<style scoped>
.secondary-button {
  align-self: flex-end;
  padding: 10px 20px;
  border: 1px solid #28282828;
  background: none;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  margin-top: 30px;
}

.secondary-button:hover {
  background: #f9f9f9;
}

.secondary-button:active {
  box-shadow: none;
}
</style>
