<template>
  <div class="editor-background">
    <div class="editor-wrap">
      <h2 v-if="isVisibleFinalReport">Изменить абзац шаблона</h2>
      <h2 v-else>
        Изменить текст цвета «{{ currentTextColorForEditor }}»
        {{
          currentPotential >= 9
            ? `для Хобби ${currentPotential - 6}. `
            : `для Потенциала ${currentPotential}. `
        }}
      </h2>
      <Editor
        ref="editorRef"
        api-key="o3crh8ud95s2ltixocc9jzhrnw6bwwx3eq3rug53lqhsf5sa"
        :init="{
          plugins: 'lists link image table code help wordcount',
          placeholder: 'Введите текст...',
          menubar: false,
          toolbar: [
            { name: 'history', items: ['undo', 'redo'] },
            { name: 'styles', items: [] },
            { name: 'formatting', items: ['bold', 'italic', 'underline'] },
            {
              name: 'alignment',
              items: [],
            },
            { name: 'indentation', items: [] },
          ],
        }"
      />
      <div class="buttons-wrap">
        <secondary-button @click="closeEditor">Выйти</secondary-button>
        <div class="button-and-loader">
          <div class="lds-ring" v-if="isLoaderVisible">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <main-button @click="updateDbText(isLoaderVisible)"
            >Сохранить</main-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Editor from "@tinymce/tinymce-vue";
import { getDatabase, ref, update } from "firebase/database";
import { onMounted } from "vue";
import { ref as vueRef } from "vue";

const isLoaderVisible = vueRef(false);

const props = defineProps([
  "currentTextColorForEditor",
  "currentIdForEditor",
  "currentPotential",
  "isVisibleFinalReport",
  "dbSnapshot",
]);

const emit = defineEmits(["update-fetched-db", "close-editor"]);

function updateDbText() {
  isLoaderVisible.value = true;

  const db = getDatabase();
  const updates = {};

  if (!props.isVisibleFinalReport) {
    updates["/" + potentialOrHobby() + "/" + props.currentTextColorForEditor] =
      tinymce.activeEditor.getContent();
    emit(
      "update-fetched-db",
      potentialOrHobby(),
      tinymce.activeEditor.getContent()
    );
  } else {
    updates["/template/" + "/" + props.currentIdForEditor] =
      tinymce.activeEditor.getContent();
    emit("update-fetched-db", "template", tinymce.activeEditor.getContent());
  }

  return update(ref(db), updates)
    .then(() => {
      setTimeout(() => {
        isLoaderVisible.value = false;
      }, 500);
    })
    .catch((err) => {
      isLoaderVisible.value = false;
      alert("Сохранение неудачно. Попробуйте ещё раз.");
    });
}

function potentialOrHobby() {
  return props.currentPotential <= 9
    ? "potential" + props.currentPotential
    : "hobby" + (props.currentPotential - 6);
}

onMounted(() => {
  const tinyInterval = setInterval(() => {
    try {
      if (!props.isVisibleFinalReport) {
        tinymce.activeEditor.setContent(
          props.dbSnapshot[potentialOrHobby()][props.currentTextColorForEditor]
        );
      } else {
        tinymce.activeEditor.setContent(
          props.dbSnapshot.template[props.currentIdForEditor]
        );
      }

      if (tinymce.activeEditor.initialized) {
        setTimeout(() => {
          clearInterval(tinyInterval);
        }, 100);
      }
    } catch (err) {}
  }, 50);
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

.button-and-loader {
  display: flex;
  align-items: flex-start;
}

.lds-ring {
  position: relative;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 40px;
  height: 40px;
  margin-top: 4px;
  right: 14px;
  border: 5px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #ddd transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
