<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

const { $slidev } = useSlideContext()

const footerAuthor = computed(() => {
  const author = $slidev.configs.author
  if (!author) return ''
  const institute = $slidev.configs.institute_short
  return institute ? `${author} (${institute})` : author
})

const footerTitle = computed(() =>
  $slidev.configs.title_short || $slidev.configs.title || '',
)

const footerDate = computed(() =>
  $slidev.configs.date_short || $slidev.configs.date || '',
)
</script>

<template>
  <footer class="w-full font-sans flex h-6 text-[11px] mt-auto shrink-0">
    <div class="flex-[3] bg-[var(--luebeck-primary)] text-white px-4 flex items-center justify-center">
      {{ footerAuthor }}
    </div>
    <div class="flex-[4] bg-[var(--luebeck-secondary)] text-white px-4 flex items-center justify-center">
      {{ footerTitle }}
    </div>
    <div class="flex-[3] bg-[var(--luebeck-tertiary)] text-white px-4 flex items-center justify-center relative">
      <span>{{ footerDate }}</span>
      <span class="absolute right-4 tabular-nums">{{ $slidev.nav.currentPage }}&#8201;/&#8201;{{ $slidev.nav.total }}</span>
    </div>
  </footer>
</template>
