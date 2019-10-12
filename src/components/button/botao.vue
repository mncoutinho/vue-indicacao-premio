<template>
  <q-btn rounded
         :label="label"
         :icon="icon"
         :size="size ? size : 'sm'"
         :color="type ? type : 'primary'"
         :flat="type === 'secondary'"
         :inverted="type === 'negative'"
         :loading="loading"
         @click="$emit('emit')"
  >
    <span slot="loading">
      <q-spinner-facebook class="on-left" />
      Carregando...
    </span>
  </q-btn>
</template>
<script>
export default {
  props: ['label', 'type', 'icon', 'size', 'loading']
}
</script>
