<template>
  <div class="side-nav">
    <p class="side-nav-el">Потенциал&nbsp;1</p>
    <p class="side-nav-el">Потенциал&nbsp;2</p>
    <p class="side-nav-el">Потенциал&nbsp;3</p>
    <p class="side-nav-el">Потенциал&nbsp;4</p>
    <p class="side-nav-el">Потенциал&nbsp;5</p>
    <p class="side-nav-el">Потенциал&nbsp;6</p>
    <p class="side-nav-el">Потенциал&nbsp;7</p>
    <p class="side-nav-el">Потенциал&nbsp;8</p>
    <p class="side-nav-el">Потенциал&nbsp;9</p>
  </div>
</template>

<script>
export default {
  name: "side-nav",
};
</script>

<style scoped>
.side-nav {
  width: 260px;
  height: 100vh;
  padding-top: 50px;
  background: #f0f0f0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.side-nav-el {
  font-size: 20px;
  line-height: 60px;
  height: 60px;
  width: 100%;
  text-align: center;
  cursor: pointer;
  margin: 0 20px 0 20px;
}

.side-nav-el:hover {
  background: white;
}
</style>
