<template>
  <div class="final-report-wrap">
    <div class="buttons-wrap" v-if="!isEditMode">
      <secondary-button @click="setFinalReportFalse">Назад</secondary-button>
      <main-button @click="savePDF">Сохранить в PDF</main-button>
    </div>

    <main-button v-else @click="setFinalReportFalse">Назад</main-button>

    <div class="final-report-content" ref="PDF">
      <h1 class="template-title" v-if="isEditMode">РЕДАКТИРОВАНИЕ ШАБЛОНА</h1>
      <p class="tip" v-if="isEditMode">
        Кликните по необходимому абзацу для редактирования.
      </p>
      <hr v-if="isEditMode" />

      <div
        :class="['title', { 'edit-elem': isEditMode }]"
        id="title"
        @click="openEditor"
        :style="{ cursor: pointer }"
        v-html="dbSnapshot?.template.title"
      ></div>

      <div
        :class="{ 'edit-elem': isEditMode }"
        id="subtitle"
        @click="openEditor"
        :style="{ cursor: pointer }"
        style="margin-bottom: 50px"
        v-html="dbSnapshot?.template.subtitle"
      ></div>

      <div class="potentials-table-wrap">
        <h3>Таблица потенциалов</h3>
        <div class="potentials-table">
          <div v-for="(answer, index) of answers" :key="index">
            <div class="potentials-table-color-wrap" v-if="index <= 8">
              <div
                class="color-wrap-rect"
                :style="{ background: findColor(colors, answer) }"
              ></div>
              <p>{{ `${index + 1}. ${answer}` }}</p>
            </div>
          </div>
        </div>
      </div>

      <div
        :class="{ 'edit-elem': isEditMode }"
        id="descriptionMain"
        :style="{ cursor: pointer }"
        style="margin-bottom: 60px"
        @click="openEditor"
        v-html="dbSnapshot?.template.descriptionMain"
      ></div>

      <div class="potential-group">
        <h3 class="subtitle">Описание 1 ряда:</h3>
        <div
          :class="{ 'edit-elem': isEditMode }"
          id="description1"
          :style="{ cursor: pointer }"
          @click="openEditor"
          v-html="dbSnapshot?.template.description1"
        ></div>

        <div class="template-color-wrap">
          <div
            class="color-wrap-rect"
            :style="{ background: findColor(colors, answers[0]) }"
          ></div>
          <p>{{ answers[0] }}</p>
        </div>
        <div
          class="template-text-wrap"
          v-html="dbSnapshot?.potential1[answers[0]]"
        ></div>
      </div>

      <hr />

      <div class="potential-group">
        <div
          :class="{ 'edit-elem': isEditMode }"
          id="description2"
          :style="{ cursor: pointer }"
          @click="openEditor"
          v-html="dbSnapshot?.template.description2"
        ></div>

        <div class="template-color-wrap">
          <div
            class="color-wrap-rect"
            :style="{ background: findColor(colors, answers[1]) }"
          ></div>
          <p>{{ answers[1] }}</p>
        </div>
        <div
          class="template-text-wrap"
          v-html="dbSnapshot?.potential2[answers[1]]"
        ></div>
      </div>

      <hr />

      <div class="potential-group">
        <div
          :class="{ 'edit-elem': isEditMode }"
          id="description3"
          :style="{ cursor: pointer }"
          @click="openEditor"
          v-html="dbSnapshot?.template.description3"
        ></div>

        <div class="template-color-wrap">
          <div
            class="color-wrap-rect"
            :style="{ background: findColor(colors, answers[2]) }"
          ></div>
          <p>{{ answers[2] }}</p>
        </div>
        <div
          class="template-text-wrap"
          v-html="dbSnapshot?.potential3[answers[2]]"
        ></div>
      </div>

      <div class="potential-group">
        <h3 class="subtitle">Описание 2 ряда:</h3>
        <div
          :class="{ 'edit-elem': isEditMode }"
          id="description4"
          :style="{ cursor: pointer }"
          @click="openEditor"
          v-html="dbSnapshot?.template.description4"
        ></div>

        <div class="template-color-wrap">
          <div
            class="color-wrap-rect"
            :style="{ background: findColor(colors, answers[3]) }"
          ></div>
          <p>{{ answers[3] }}</p>
        </div>
        <div
          class="template-text-wrap"
          v-html="dbSnapshot?.potential4[answers[3]]"
        ></div>
      </div>

      <hr />

      <div class="potential-group">
        <div
          :class="{ 'edit-elem': isEditMode }"
          id="description5"
          :style="{ cursor: pointer }"
          @click="openEditor"
          v-html="dbSnapshot?.template.description5"
        ></div>

        <div class="template-color-wrap">
          <div
            class="color-wrap-rect"
            :style="{ background: findColor(colors, answers[4]) }"
          ></div>
          <p>{{ answers[4] }}</p>
        </div>
        <div
          class="template-text-wrap"
          v-html="dbSnapshot?.potential5[answers[4]]"
        ></div>
      </div>

      <hr />

      <div class="potential-group">
        <div
          :class="{ 'edit-elem': isEditMode }"
          id="description6"
          :style="{ cursor: pointer }"
          @click="openEditor"
          v-html="dbSnapshot?.template.description6"
        ></div>

        <div class="template-color-wrap">
          <div
            class="color-wrap-rect"
            :style="{ background: findColor(colors, answers[5]) }"
          ></div>
          <p>{{ answers[5] }}</p>
        </div>
        <div
          class="template-text-wrap"
          v-html="dbSnapshot?.potential6[answers[5]]"
        ></div>
      </div>

      <hr />

      <div
        :class="{ 'edit-elem': isEditMode }"
        id="description7"
        :style="{ cursor: pointer }"
        style="margin-bottom: 20px"
        @click="openEditor"
        v-html="dbSnapshot?.template.description7"
      ></div>

      <div class="potential-group">
        <div
          :class="{ 'edit-elem': isEditMode }"
          id="description8"
          :style="{ cursor: pointer }"
          @click="openEditor"
          v-html="dbSnapshot?.template.description8"
        ></div>

        <div class="template-color-wrap">
          <div
            class="color-wrap-rect"
            :style="{ background: findColor(colors, answers[9]) }"
          ></div>
          <p>{{ answers[9] }}</p>
        </div>
        <div
          class="template-text-wrap"
          v-html="dbSnapshot?.hobby4[answers[9]]"
        ></div>
      </div>

      <hr />

      <div class="potential-group">
        <div
          :class="{ 'edit-elem': isEditMode }"
          id="description9"
          :style="{ cursor: pointer }"
          @click="openEditor"
          v-html="dbSnapshot?.template.description9"
        ></div>

        <div class="template-color-wrap">
          <div
            class="color-wrap-rect"
            :style="{ background: findColor(colors, answers[10]) }"
          ></div>
          <p>{{ answers[10] }}</p>
        </div>
        <div
          class="template-text-wrap"
          v-html="dbSnapshot?.hobby5[answers[10]]"
        ></div>
      </div>

      <hr />

      <div class="potential-group">
        <div
          :class="{ 'edit-elem': isEditMode }"
          id="description10"
          :style="{ cursor: pointer }"
          @click="openEditor"
          v-html="dbSnapshot?.template.description10"
        ></div>

        <div class="template-color-wrap">
          <div
            class="color-wrap-rect"
            :style="{ background: findColor(colors, answers[11]) }"
          ></div>
          <p>{{ answers[11] }}</p>
        </div>
        <div
          class="template-text-wrap"
          v-html="dbSnapshot?.hobby6[answers[11]]"
        ></div>
      </div>

      <div class="potential-group">
        <h3 class="subtitle">Описание 3 ряда:</h3>
        <div
          :class="{ 'edit-elem': isEditMode }"
          id="description11"
          :style="{ cursor: pointer }"
          style="margin-bottom: 20px"
          @click="openEditor"
          v-html="dbSnapshot?.template.description11"
        ></div>

        <div class="potential-group">
          <div
            :class="{ 'edit-elem': isEditMode }"
            id="description12"
            :style="{ cursor: pointer }"
            style="margin-bottom: 20px"
            @click="openEditor"
            v-html="dbSnapshot?.template.description12"
          ></div>

          <div class="template-color-wrap">
            <div
              class="color-wrap-rect"
              :style="{ background: findColor(colors, answers[6]) }"
            ></div>
            <p>{{ answers[6] }}</p>
          </div>
          <div
            class="template-text-wrap"
            v-html="dbSnapshot?.potential7[answers[6]]"
          ></div>
        </div>
      </div>

      <hr />

      <div class="potential-group">
        <div
          :class="{ 'edit-elem': isEditMode }"
          id="description13"
          :style="{ cursor: pointer }"
          style="margin-bottom: 20px"
          @click="openEditor"
          v-html="dbSnapshot?.template.description13"
        ></div>

        <div class="template-color-wrap">
          <div
            class="color-wrap-rect"
            :style="{ background: findColor(colors, answers[7]) }"
          ></div>
          <p>{{ answers[7] }}</p>
        </div>
        <div
          class="template-text-wrap"
          v-html="dbSnapshot?.potential8[answers[7]]"
        ></div>
      </div>

      <hr />

      <div class="potential-group">
        <div
          :class="{ 'edit-elem': isEditMode }"
          id="description14"
          :style="{ cursor: pointer }"
          style="margin-bottom: 20px"
          @click="openEditor"
          v-html="dbSnapshot?.template.description14"
        ></div>

        <div class="template-color-wrap">
          <div
            class="color-wrap-rect"
            :style="{ background: findColor(colors, answers[8]) }"
          ></div>
          <p>{{ answers[8] }}</p>
        </div>
        <div
          class="template-text-wrap"
          v-html="dbSnapshot?.potential9[answers[8]]"
        ></div>
      </div>
    </div>
    <div class="buttons-wrap" v-if="!isEditMode">
      <secondary-button @click="setFinalReportFalse">Назад</secondary-button>
      <main-button @click="savePDF">Сохранить в PDF</main-button>
    </div>
    <main-button v-else @click="setFinalReportFalse">Назад</main-button>
  </div>
</template>

<script>
import html2pdf from "html2pdf.js";
import SecondaryButton from "./SecondaryButton.vue";

export default {
  components: { SecondaryButton },
  name: "final-report",

  props: {
    dbSnapshot: {
      type: Object,
      require: true,
    },

    answers: {
      type: Array,
      require: true,
    },

    colors: {
      type: Array,
      required: true,
    },

    isEditMode: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    openEditor(event) {
      if (this.isEditMode) {
        this.$emit("open-editor", event.currentTarget.id);
      }
    },

    setFinalReportFalse() {
      this.$emit("set-final-report-false");
    },

    afterSavingPDF() {
      this.$emit("after-saving-pdf");
    },

    savePDF() {
      const opt = {
        margin: 0.6,
        filename: "myfile.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        pagebreak: { mode: "avoid-all" },
      };
      const el = this.$refs.PDF;
      console.log("el", el);
      console.log("html", html2pdf);
      html2pdf(el, opt).then(() => {
        setTimeout(() => {
          this.afterSavingPDF();
          this.setFinalReportFalse();
        }, 500);
      });
    },

    findColor(colors, answer) {
      for (let color of colors) {
        if (color.textColor === answer) {
          return color.color;
        }
      }
    },
  },

  computed: {
    pointer() {
      return this.isEditMode ? "pointer" : undefined;
    },
  },
};
</script>

<style scoped>
h3 {
  text-decoration: underline;
}

p {
  margin-bottom: 20px;
}

.final-report-wrap {
  padding: 30px 0;
  margin: 0 auto;
  display: flex;
  gap: 30px;
  flex-direction: column;
  align-items: center;
}

.final-report-content {
  margin: 0 auto;
  width: 700px;
}

.potential-group {
  margin-bottom: 30px;
  margin-top: 10px;
}

.template-title {
  margin-bottom: 15px;
  text-align: center;
  text-decoration: underline;
}

.title {
  margin-bottom: 10px;
}

.potentials-table-wrap {
  margin: 20px 0;
}
.potentials-table {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-top: 20px;
}

.subtitle {
  margin-top: 50px;
  margin-bottom: 20px;
}

.template-color-wrap,
.potentials-table-color-wrap {
  margin-top: 20px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.template-color-wrap p {
  font-weight: 700;
}

.color-wrap-rect {
  width: 20px;
  height: 20px;
  background: black;
}

hr {
  margin-bottom: 30px;
}

.tip {
  color: #aaa;
  font-size: 12px;
  text-align: center;
}

.buttons-wrap {
  display: flex;
  gap: 20px;
}

.edit-elem:hover {
  opacity: 60%;
}
</style>
