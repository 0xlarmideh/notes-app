<template>
  <button
    :href="[link]"
    :class="[
      'py-[.8rem]',
      'px-[1.3rem]',
      'rounded-full',
      'text-white',
      'flex',
      'gap-[1rem]',
      'items-center',
      className,
    ]"
  >
    {{ text }}
    <Icon icon="carbon:dot-mark" color="white" width="10" height="10" />
  </button>
</template>

<script lang="ts">
import { Icon } from "@iconify/vue";
export default {
  components: {
    Icon,
  },
  props: {
    text: {
      type: String,
      required: true,
    },

    link: {
      type: String,
      required: false,
    },
    className: {
      type: String,
      default: "",
    },
  },
};
</script>
