<template>
  <div class="slidev-layout default w-full h-full bg-[var(--luebeck-bg)] text-[var(--luebeck-text)] flex flex-col relative p-0">
    <LuebeckHeader />
    <div class="flex-1 px-4 py-2 overflow-y-auto">
      <slot />
    </div>
    <LuebeckFooter />
  </div>
</template>