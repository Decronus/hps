<template>
  <div class="app">
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
    <div class="colors-wrap">
      <color-card />
      <color-card />
      <color-card />
      <color-card />
      <color-card />
      <color-card />
      <color-card />
      <color-card />
      <color-card />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
  color: #282828;
}

.app {
  display: flex;
}

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

.colors-wrap {
  width: 100%;
  padding: 66px;
  display: grid;
  grid-template-columns: repeat(3, 260px);
  grid-template-rows: repeat(3, 138px);
  gap: 44px;
}
</style>
