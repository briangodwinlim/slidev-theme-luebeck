<template>
  <div class="slidev-layout contact w-full h-full bg-[var(--luebeck-bg)] text-[var(--luebeck-text)] flex flex-col relative p-0">
    <LuebeckHeader />
    <div class="flex-1 flex flex-col items-center justify-center px-4 py-2 overflow-y-auto gap-6">
      <slot />
    </div>
    <LuebeckFooter />
  </div>
</template>
