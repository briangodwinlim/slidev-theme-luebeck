<script setup lang="ts">
import type { ContactEntry } from './contact-types'

defineProps<{
  icon: ContactEntry['icon']
}>()
</script>

<template>
  <span class="contact-entry-icon-slot">
    <span
      v-if="icon === 'web'"
      class="i-carbon:earth-filled contact-entry-icon"
      aria-hidden="true"
    />
    <span
      v-else-if="icon === 'email'"
      class="i-carbon:email contact-entry-icon"
      aria-hidden="true"
    />
    <span
      v-else-if="icon === 'github'"
      class="i-carbon:logo-github contact-entry-icon"
      aria-hidden="true"
    />
    <span
      v-else-if="icon === 'linkedin'"
      class="i-carbon:logo-linkedin contact-entry-icon"
      aria-hidden="true"
    />
    <svg
      v-else-if="icon === 'orcid'"
      class="contact-entry-icon contact-entry-icon--svg"
      viewBox="0 0 256 256"
      role="img"
      aria-label="ORCID"
    >
      <path
        fill="currentColor"
        d="M256 128c0 70.7-57.3 128-128 128C57.3 256 0 198.7 0 128 0 57.3 57.3 0 128 0c70.7 0 128 57.3 128 128z"
      />
      <path
        fill="#fff"
        d="M86.3 186.2H70.9V79.1h15.4v107.1zM108.9 79.1h41.6c39.6 0 57 28.3 57 53.6 0 27.5-21.5 53.6-56.8 53.6h-41.8V79.1zm15.4 93.3h24.5c34.9 0 42.9-26.5 42.9-39.6 0-14.8-13.7-32.8-43.7-32.8h-23.7v79.4z"
      />
    </svg>
    <svg
      v-else-if="icon === 'researchgate'"
      class="contact-entry-icon contact-entry-icon--svg contact-entry-icon--researchgate"
      viewBox="0 0 21 24"
      role="img"
      aria-label="ResearchGate"
    >
      <path
        fill="currentColor"
        d="M19.586 0c-.818 0-1.508.19-2.073.565-.563.377-.97.936-1.213 1.68a3.193 3.193 0 0 0-.112.437 8.365 8.365 0 0 0-.078.53 9 9 0 0 0-.05.727c-.01.282-.013.621-.013 1.016a31.121 31.123 0 0 0 .014 1.017 9 9 0 0 0 .05.727 7.946 7.946 0 0 0 .077.53h-.005a3.334 3.334 0 0 0 .113.438c.245.743.65 1.303 1.214 1.68.565.376 1.256.564 2.075.564.8 0 1.536-.213 2.105-.603.57-.39.94-.916 1.175-1.65.076-.235.135-.558.177-.93a10.9 10.9 0 0 0 .043-1.207v-.82c0-.095-.047-.142-.14-.142h-3.064c-.094 0-.14.047-.14.141v.956c0 .094.046.14.14.14h1.666c.056 0 .084.03.084.086 0 .36 0 .62-.036.865-.038.244-.1.447-.147.606-.108.385-.348.664-.638.876-.29.212-.738.35-1.227.35-.545 0-.901-.15-1.21-.353-.306-.203-.517-.454-.67-.915a3.136 3.136 0 0 1-.147-.762 17.366 17.367 0 0 1-.034-.656c-.01-.26-.014-.572-.014-.939a26.401 26.403 0 0 1 .014-.938 15.821 15.822 0 0 1 .035-.656 3.19 3.19 0 0 1 .148-.76 1.89 1.89 0 0 1 .742-1.01c.344-.244.593-.352 1.137-.352.508 0 .815.096 1.144.303.33.207.528.492.764.925.047.094.111.118.198.07l1.044-.43c.075-.048.09-.115.042-.199a3.549 3.549 0 0 0-.466-.742 3 3 0 0 0-.679-.607 3.313 3.313 0 0 0-.903-.41A4.068 4.068 0 0 0 19.586 0zM8.217 5.836c-1.69 0-3.036.086-4.297.086-1.146 0-2.291 0-3.007-.029v.831l1.088.2c.744.144 1.174.488 1.174 2.264v11.288c0 1.777-.43 2.12-1.174 2.263l-1.088.2v.832c.773-.029 2.12-.086 3.465-.086 1.29 0 2.951.057 3.667.086v-.831l-1.49-.2c-.773-.115-1.174-.487-1.174-2.264v-4.784c.688.057 1.29.057 2.206.057 1.748 3.123 3.41 5.472 4.355 6.56.86 1.032 2.177 1.691 3.839 1.691.487 0 1.003-.086 1.318-.23v-.744c-1.031 0-2.063-.716-2.808-1.518-1.26-1.376-2.95-3.582-4.355-6.074 2.32-.545 4.04-2.722 4.04-4.9 0-3.208-2.492-4.698-5.758-4.698zm-.515 1.29c2.406 0 3.839 1.26 3.839 3.552 0 2.263-1.547 3.782-4.097 3.782-.974 0-1.404-.03-2.063-.086v-7.19c.66-.059 1.547-.059 2.32-.059z"
      />
    </svg>
  </span>
</template>

<style scoped>
.contact-entry-icon-slot {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
}

.contact-entry-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: var(--luebeck-primary);
}

.contact-entry-icon--svg {
  display: block;
}

.contact-entry-icon--researchgate {
  width: 1.15rem;
  height: 1.15rem;
}
</style>
