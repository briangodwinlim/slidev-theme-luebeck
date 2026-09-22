<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

const { $slidev } = useSlideContext()

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
}

const instituteShort = computed(() => $slidev.configs.institute_short ?? '')

const footerAuthorShortHtml = computed(() => {
  const short = $slidev.configs.author_short
  if (!short) return ''
  return short
})

const footerAuthorPlain = computed(() => {
  const raw = $slidev.configs.author_short || $slidev.configs.author
  if (!raw) return ''
  return stripHtml(raw)
})

const useAuthorShortHtml = computed(() => Boolean($slidev.configs.author_short))
</script>

<template>
  <footer class="w-full font-sans flex h-6 text-[11px] mt-auto shrink-0">
    <div class="flex-[3] bg-[var(--luebeck-primary)] text-white px-4 flex items-center justify-center footer-author-cell">
      <span v-if="useAuthorShortHtml" class="footer-author-html">
        <span v-html="footerAuthorShortHtml" />
        <span v-if="instituteShort">&nbsp;({{ instituteShort }})</span>
      </span>
      <span v-else-if="footerAuthorPlain">
        {{ footerAuthorPlain }}<span v-if="instituteShort">&nbsp;({{ instituteShort }})</span>
      </span>
    </div>
    <div class="flex-[4] bg-[var(--luebeck-secondary)] text-white px-4 flex items-center justify-center">
      {{ $slidev.configs.title_short || $slidev.configs.title || '' }}
    </div>
    <div class="flex-[3] bg-[var(--luebeck-tertiary)] text-white px-4 flex items-center justify-center relative">
      <span>{{ $slidev.configs.date_short || $slidev.configs.date || '' }}</span>
      <span class="absolute right-4 tabular-nums">{{ $slidev.nav.currentPage }}&#8201;/&#8201;{{ $slidev.nav.total }}</span>
    </div>
  </footer>
</template>

<style scoped>
.footer-author-html :deep(p),
.footer-author-html :deep(span) {
  margin: 0;
}

.footer-author-html :deep(.text-xs) {
  font-size: 9px;
  line-height: 1.2;
}

.footer-author-html :deep(.text-sm) {
  font-size: 10px;
  line-height: 1.2;
}
</style>
