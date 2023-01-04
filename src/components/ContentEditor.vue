<template>
  <div class="editor-background">
    <p class="text-loader">Загрузка...</p>
    <div class="editor-wrap">
      <h2>
        Изменить текст для цвета «{{ currentTextColorForEditor }}» Потенциала
        {{ currentPotential }}
      </h2>
      <Editor
        api-key="o3crh8ud95s2ltixocc9jzhrnw6bwwx3eq3rug53lqhsf5sa"
        :init="{
          plugins: 'lists link image table code help wordcount',
          placeholder: 'Загрузка...',
        }"
      />
      <div class="buttons-wrap">
        <secondary-button @click="closeEditor"
          >Выйти без сохранения</secondary-button
        >
        <main-button @click="updateDbText">Сохранить и выйти</main-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Editor from "@tinymce/tinymce-vue";
import { onMounted } from "vue";
import { dbSnapshot } from "../firebase";
import { getDatabase, ref, child, push, update } from "firebase/database";

const props = defineProps(["currentTextColorForEditor", "currentPotential"]);

function updateDbText() {
  const db = getDatabase();

  const updates = {};
  updates[
    "/" +
      "potential" +
      props.currentPotential +
      "/" +
      props.currentTextColorForEditor
  ] = tinymce.activeEditor.getContent();

  return update(ref(db), updates);
}

// function getEditorContent() {
//   return tinymce.activeEditor.getContent();
// }

// function setNewDbValue() {
//   const db = getDatabase();

//   set(ref(db, "db/" + "potential" + props.currentPotential), {
//     [props.currentTextColorForEditor]: getEditorContent(),
//   });
// }

onMounted(() => {
  console.log(dbSnapshot);
  setTimeout(() => {
    tinymce.activeEditor.setContent(
      dbSnapshot["potential" + props.currentPotential][
        props.currentTextColorForEditor
      ]
    );
  }, 1000);
});
</script>

<script>
export default {
  name: "content-editor",
  methods: {
    closeEditor() {
      this.$emit("close-editor");
    },
  },
};
</script>

<style scoped>
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

.text-loader {
  position: absolute;
  top: 50%;
  left: 50%;
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
