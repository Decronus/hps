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
  display: flex;
  align-self: flex-end;
  padding: 16px 30px;
  border: 1px solid #28282828;
  background: none;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.secondary-button:hover {
  background: #f9f9f9;
}

.secondary-button:active {
  box-shadow: none;
}
</style>
