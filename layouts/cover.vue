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
        <div class="mt-12 text-2xl font-medium text-black">{{ $slidev.configs.author }}</div>
        <div v-if="$slidev.configs.institute" class="mt-6 text-base text-black whitespace-pre-line leading-tight">
          {{ $slidev.configs.institute }}
        </div>
        <div v-if="$slidev.configs.date" class="mt-8 text-xl text-black">
          {{ $slidev.configs.date }}
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
</style>