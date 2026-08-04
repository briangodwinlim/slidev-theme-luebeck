<script setup lang="ts">
import { computed } from 'vue'
import { useNav } from '@slidev/client'
import type { SlideRoute } from '@slidev/types'

const { slides, currentPage } = useNav()

function getFrontmatter(route: SlideRoute | undefined) {
  return route?.meta?.slide?.frontmatter ?? route?.meta?.frontmatter ?? {}
}

const activeSection = computed(() => {
  const list = slides.value
  if (!list?.length) return ''
  for (let i = currentPage.value - 1; i >= 0; i--) {
    const sec = getFrontmatter(list[i])?.section
    if (sec) return sec
  }
  return ''
})

const activeSubsection = computed(() => {
  const list = slides.value
  if (!list?.length) return ''
  for (let i = currentPage.value - 1; i >= 0; i--) {
    const fm = getFrontmatter(list[i])
    if (fm?.subsection) return fm.subsection
    if (fm?.section) {
      const prevSection = i > 0 ? getFrontmatter(list[i - 1])?.section : undefined
      if (!prevSection || fm.section !== prevSection)
        return ''
    }
  }
  return ''
})
</script>

<template>
  <header class="w-full font-sans flex h-6 text-[11px] text-white shrink-0">
    <div class="flex-1 bg-[var(--luebeck-tertiary)] px-4 flex items-center justify-end font-normal">
      <span>{{ activeSection }}</span>
    </div>
    <div class="flex-1 bg-[var(--luebeck-primary)] px-4 flex items-center justify-start font-normal">
      <span>{{ activeSubsection }}</span>
    </div>
  </header>
</template>
