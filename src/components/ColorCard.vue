<template>
  <div class="color-card-wrap" :style="{ pointerEvents: pointerEvents }">
    <div class="color-area" :style="{ background: color }"></div>
    <div class="color-text-and-edit">
      <p class="color-text">{{ textColor }}</p>
      <div class="edit-image" @click.stop @click="openEditor" v-if="isEditMode">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 11.0837V14H2.91626L11.5173 5.39897L8.60103 2.48271L0 11.0837ZM13.7725 3.14373C14.0758 2.84044 14.0758 2.35051 13.7725 2.04722L11.9528 0.227468C11.6495 -0.0758228 11.1596 -0.0758228 10.8563 0.227468L9.43314 1.6506L12.3494 4.56687L13.7725 3.14373V3.14373Z"
            fill="#D0D0D0"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "color-card",

  props: {
    color: {
      type: String,
      required: true,
    },

    textColor: {
      type: String,
      required: true,
    },

    currentPotential: {
      type: Number,
      required: true,
    },

    isEditMode: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    openEditor(event) {
      this.$emit("open-editor", event.target.id);
    },
  },

  computed: {
    pointerEvents() {
      return this.isEditMode ? "none" : "all";
    },
  },
};
</script>

<style scoped>
.color-card-wrap {
  width: 260px;
  height: 138px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  cursor: pointer;
}

.color-card-wrap:hover {
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.15);
}

.color-area {
  width: 260px;
  height: 100px;
  background: #75fbfd;
  border-radius: 8px 8px 0px 0px;
}

.color-text-and-edit {
  width: 260px;
  height: 38px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px 0 16px;
}

.edit-image {
  pointer-events: initial;
}

.edit-image svg:hover path {
  fill: #333333;
}
</style>
