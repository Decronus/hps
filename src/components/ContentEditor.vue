<script setup>
import Editor from "@tinymce/tinymce-vue";

const data = [
  {
    id: 1,
    name: "Alex",
    text: "<p>Какой-то <strong>рыб<u>ный</strong> те</u>кст</p>",
  },
];

function getEditorContent() {
  var myContent = tinymce.activeEditor.getContent();
  data[0].text = myContent;
  console.log(myContent);
  console.log(typeof myContent);
}

function setEditorContent() {
  tinymce.activeEditor.setContent(data[0].text);
}
</script>

<script>
export default {
  name: "content-editor",
  methods: {
    closeEditor() {
      this.$emit("close-editor");
    },
  },
  props: {
    currentTextColorForEditor: {
      type: String,
    },
    currentPotential: {
      type: Number,
    },
  },
};
</script>

<template>
  <div class="editor-background">
    <div class="editor-wrap">
      <h2>
        Изменить текст для цвета «{{ currentTextColorForEditor }}» Потенциала
        {{ currentPotential }}
      </h2>
      <Editor
        api-key="o3crh8ud95s2ltixocc9jzhrnw6bwwx3eq3rug53lqhsf5sa"
        :init="{
          plugins: 'lists link image table code help wordcount',
        }"
      />
      <div class="buttons-wrap">
        <secondary-button @click="closeEditor"
          >Выйти без сохранения</secondary-button
        >
        <main-button @click="getEditorContent">Сохранить и выйти</main-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* @media (min-width: 1024px) {
  #sample {
    display: flex;
    flex-direction: column;
    place-items: center;
    width: 1000px;
  }
} */

h2 {
  margin-bottom: 30px;
}

.editor-background {
  position: fixed;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.8);
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.editor-wrap {
  width: 1000px;
  padding: 40px;
  background: white;
  border-radius: 20px;
}

.buttons-wrap {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}
</style>
