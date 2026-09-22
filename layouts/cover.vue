<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

const { $slidev } = useSlideContext()

type CoverAuthorsMode = 'full' | 'short' | 'both'

const coverAuthors = computed(
  () => ($slidev.configs.coverAuthors as CoverAuthorsMode | undefined) ?? 'full',
)

const showFullAuthor = computed(
  () => coverAuthors.value === 'full' || coverAuthors.value === 'both',
)

const showShortAuthor = computed(
  () => coverAuthors.value === 'short' || coverAuthors.value === 'both',
)
</script>

<template>
  <div class="slidev-layout cover w-full h-full bg-[var(--luebeck-bg)] flex flex-col relative text-center p-0">
    <LuebeckHeader />
    <div class="flex-1 flex flex-col items-center justify-center pt-4">
      <div class="bg-[var(--luebeck-primary)] w-full py-6 px-6 shadow-sm text-center">
        <h1 class="luebeck-cover-title font-normal m-0 !text-white !mb-0 text-3xl">
          {{ $slidev.configs.title }}
        </h1>
        <h2 v-if="$slidev.configs.subtitle" class="luebeck-cover-subtitle text-xl mt-2 font-normal text-white">{{ $slidev.configs.subtitle }}</h2>
      </div>
      <div class="px-12 flex flex-col items-center">
        <div
          v-if="showFullAuthor && $slidev.configs.author"
          class="mt-8 text-2xl font-medium text-black cover-author"
          v-html="$slidev.configs.author"
        />
        <div
          v-if="showShortAuthor && $slidev.configs.author_short"
          class="font-medium text-black cover-author-short"
          :class="showFullAuthor ? 'mt-3 text-lg' : 'mt-8 text-xl'"
          v-html="$slidev.configs.author_short"
        />
        <div
          v-if="$slidev.configs.institute"
          class="mt-6 text-base text-black leading-tight cover-institute"
          v-html="$slidev.configs.institute"
        />
        <div v-if="$slidev.configs.date" class="mt-8 text-xl text-black">
          {{ $slidev.configs.date }}
        </div>
        <div v-if="$slots.default" class="cover-slide-content mt-6">
          <slot />
        </div>
      </div>
    </div>
    <LuebeckFooter />
  </div>
</template>

<style scoped>
.luebeck-cover-title,
.luebeck-cover-subtitle {
  font-family: 'Roboto Slab', ui-serif, Georgia, serif !important;
}

.cover-author,
.cover-institute {
  white-space: pre-line;
}

/* Allow HTML tags / utility classes inside author_short on the cover */
.cover-author-short :deep(p),
.cover-author-short :deep(span) {
  margin: 0;
}

.cover-author-short :deep(.text-xs) {
  font-size: 0.75rem;
  line-height: 1.35;
}

.cover-author-short :deep(.text-sm) {
  font-size: 0.875rem;
  line-height: 1.4;
}

.cover-author-short :deep(.text-base) {
  font-size: 1rem;
}

.cover-author-short :deep(.text-lg) {
  font-size: 1.125rem;
}

.cover-slide-content :deep(img) {
  max-height: 5.5rem;
  width: auto;
  margin-inline: auto;
  display: block;
  object-fit: contain;
}
</style>
