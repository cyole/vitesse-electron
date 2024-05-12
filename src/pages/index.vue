<script setup lang="ts" generic="T extends any, O extends any">
defineOptions({
  name: 'IndexPage',
})

const name = ref('')

const router = useRouter()
function go() {
  if (name.value)
    router.push(`/hi/${encodeURIComponent(name.value)}`)
}
</script>

<template>
  <div>
    <div flex justify-center gap4>
      <div i-carbon:campsite inline-block text-4xl />
      <div i-ion:logo-electron inline-block text-4xl />
    </div>

    <p>
      <a rel="noreferrer" href="https://github.com/cyole/vitesse-electron" target="_blank">
        Vitesse Electron
      </a>
    </p>
    <p>
      <em text-sm op75>Opinionated Vite Starter Template</em>
    </p>

    <div py-4 />

    <TheInput
      v-model="name"
      placeholder="What's your name?"
      autocomplete="false"
      @keydown.enter="go"
    />

    <div>
      <button
        class="m-3 text-sm btn"
        :disabled="!name"
        @click="go"
      >
        Go
      </button>
    </div>
  </div>
</template>
