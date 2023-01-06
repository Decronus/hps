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
        Кликните по необходимому абзацу для редактирования. <br />При наведении
        на абзац, который можно отредактировать, курсор меняется на перчатку.
      </p>
      <hr v-if="isEditMode" />

      <div
        class="title"
        id="title"
        @click="openEditor"
        :style="{ cursor: pointer }"
        v-html="dbSnapshot?.template.title"
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
        id="descriptionMain"
        :style="{ cursor: pointer }"
        @click="openEditor"
        v-html="dbSnapshot?.template.descriptionMain"
      ></div>

      <div class="potential-group">
        <h3 class="subtitle">Описание 1 ряда:</h3>
        <div
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
        <p>
          <strong>2 ПОТЕНЦИАЛ</strong> – это ваше творчество (действия для себя
          после того, как проанализировали Первым потенциалом), основная
          внутренняя мотивация для достижения цели (миссия) + то каким вас
          воспринимают и видят другие люди – ваш имидж (включая стиль одежды).
          Через 2 Потенциал можно понять, как правильно выстраивать свое
          позиционирование, продвижение, через него человек становится
          популярным и именно через него определяют в какой сфере лучше выбрать
          свою профессию.
        </p>
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
        <p>
          <strong>3 ПОТЕНЦИАЛ</strong> – инструмент (навыки), с помощью которого
          человек достигает своих целей наиболее быстро и эффективно. Ключ,
          который открывает двери на пути к его цели, через который он может
          помогать другим людям открывать какие-то двери к их целям. Это то, что
          человек непосредственно делает, чтобы достичь цели по Второму
          потенциалу.
        </p>
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
        <p>
          Целевая аудитория (ЦА) = ваш потенциальный клиент (запросы, с которыми
          приходят клиенты) и наполнение (хобби)
        </p>
        <p>
          <strong>4 ПОТЕНЦИАЛ</strong> – это боль/проблема вашего клиента,
          которую он может даже не осознавать.
        </p>
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
        <p>
          <strong>5 ПОТЕНЦИАЛ</strong> – отвечает за то, с какой целью к вам
          приходят люди/клиенты (какой у них запрос)
        </p>
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
        <p>
          <strong>6 ПОТЕНЦИАЛ</strong> – отвечает за результат, который получают
          Клиенты после взаимодействия с вами.
        </p>
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

      <p>
        <strong>Наполнение хобби</strong> – для достижения целей отдых так же
        важен, как и действия по потенциалам силы (30 % для второго ряда) и есть
        такая особенность, что тот потенциал, который находится во 2-м ряду, он
        наполняет тот потенциал, который находится над ним в 1-м ряду. Второй
        ряд потенциалов – это наш «бензин» для достижения целей и нужно по нему
        обязательно наполняться, вкладывать свои деньги, силы и время в это
        наполнение. Потому что, наполняясь по второму ряду, мы получаем энергию,
        возможности, ресурсы, а с помощью первого ряда потенциалов, мы реализуем
        пришедшие в нашу жизнь возможности и ресурсы для создания ценности.
      </p>

      <div class="potential-group">
        <p>
          <strong>4 ПОТЕНЦИАЛ</strong> – хобби восприятия (то, что человек любит
          воспринимать/анализировать) - какую узкую проблему вы настроены
          анализировать своим каналом восприятия в качестве хобби + как отдыхать
          от своего главного канала восприятия/анализа, используемого в
          деятельности, - 1 потенциала, куда переключить свое восприятие чтобы
          восстановиться/наполниться.
        </p>
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
        <p>
          <strong>5 ПОТЕНЦИАЛ</strong> – творческое хобби (в одиночестве),
          действия человека; то, что он любит делать именно для себя, а не
          других, чтобы получить вдохновение для основной цели по 2-му
          потенциалу
        </p>
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
        <p>
          <strong>6 ПОТЕНЦИАЛ</strong> – коллективное хобби с друзьями
          (вторичный инструмент) – отдых от инструмента в деятельности (3-ий
          потенциал):
        </p>
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
        <p>
          Слабые качества (действия), которые необходимо делегировать, у вас
          это:
        </p>
        <p>
          <strong>7 ПОТЕНЦИАЛ</strong>
        </p>
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

      <hr />

      <div class="potential-group">
        <p>
          <strong>8 ПОТЕНЦИАЛ</strong>
        </p>
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
        <p>
          <strong>9 ПОТЕНЦИАЛ</strong>
        </p>
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
      html2pdf(el, opt).then(() => {
        this.afterSavingPDF();
        this.setFinalReportFalse();
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
  margin-bottom: 30px;
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
</style>
