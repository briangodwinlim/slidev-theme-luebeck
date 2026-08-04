<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'
import type { ContactConfig, ContactEntry } from './contact-types'

const props = defineProps<{
  title?: string
  left?: ContactEntry[]
  right?: ContactEntry[]
}>()

const { $slidev, $frontmatter } = useSlideContext()

const deckContact = computed(() => ($slidev.configs.contact ?? {}) as ContactConfig)
const slideContact = computed(() => ($frontmatter.contact ?? {}) as ContactConfig)

const title = computed(() =>
  props.title
  ?? slideContact.value.title
  ?? deckContact.value.title
  ?? 'Contact Me',
)

const left = computed(() =>
  props.left
  ?? slideContact.value.left
  ?? deckContact.value.left
  ?? [],
)

const right = computed(() =>
  props.right
  ?? slideContact.value.right
  ?? deckContact.value.right
  ?? [],
)
</script>

<template>
  <div class="contact-slide">
    <h1 class="contact-slide__title">
      {{ title }}
    </h1>

    <div class="contact-slide__grid">
      <ul class="contact-slide__column">
        <li v-for="(entry, index) in left" :key="`left-${index}`" class="contact-slide__item">
          <ContactEntryIcon :icon="entry.icon" />
          <component
            :is="entry.href ? 'a' : 'span'"
            :href="entry.href"
            class="contact-slide__label"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ entry.label }}
          </component>
        </li>
      </ul>

      <ul class="contact-slide__column">
        <li v-for="(entry, index) in right" :key="`right-${index}`" class="contact-slide__item">
          <ContactEntryIcon :icon="entry.icon" />
          <component
            :is="entry.href ? 'a' : 'span'"
            :href="entry.href"
            class="contact-slide__label"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ entry.label }}
          </component>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.contact-slide {
  width: 100%;
  text-align: center;
}

.contact-slide__title {
  margin: 0 0 2.5rem;
  font-size: 1.75rem;
  font-weight: 400;
}

.contact-slide__grid {
  display: inline-grid;
  grid-template-columns: max-content max-content;
  column-gap: 3.5rem;
  row-gap: 0;
  text-align: left;
}

.contact-slide__column {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-slide__item {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  white-space: nowrap;
}

.contact-slide__label {
  color: var(--luebeck-text);
  text-decoration: none;
  line-height: 1.3;
  border: none !important;
}

a.contact-slide__label:hover {
  color: var(--luebeck-primary);
}
</style>
