<script setup lang="ts">
withDefaults(defineProps<{
  title: string
  type?: 'default' | 'alert' | 'example'
}>(), {
  type: 'default'
})
</script>

<template>
  <div class="my-4 font-sans">
    <div class="px-3 py-1.5 text-white text-sm font-bold" :class="{
      'bg-[var(--luebeck-primary)]': type === 'default',
      'bg-red-700': type === 'alert',
      'bg-green-700': type === 'example'
    }">
      {{ title }}
    </div>
    <div class="beamer-block-body px-3 py-2 text-sm text-black" :class="{
      'bg-[var(--luebeck-block-bg)]': type === 'default',
      'bg-[var(--luebeck-block-alert-bg)]': type === 'alert',
      'bg-[var(--luebeck-block-example-bg)]': type === 'example'
    }">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.beamer-block-body :deep(p) {
  margin: 0;
}

.beamer-block-body :deep(p:empty) {
  display: none;
}
</style>