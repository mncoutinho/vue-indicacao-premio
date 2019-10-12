<template>
  <div>
    <q-select
      color="secondary"
      separator
      float-label="NÍVEL"
      :error="v.$error"
      :value="value"
      :options="listNiveis"
      @input="$emit('input', $event)"
    />
</div>
</template>
<script>
import listNiveis from '../../assets/niveis'
export default {
  props: [ 'v', 'value' ],
  data () {
    return {
      listNiveis
    }
  }
}
</script>
