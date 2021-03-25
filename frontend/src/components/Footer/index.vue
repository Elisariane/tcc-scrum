
<template>
  <q-layout view="hHh lpR lFf">
     <q-footer bordered class="bg-grey-3 text-black text-center  text-weight-medium">
        <p class=" q-ma-sm text-center ">
          <span class="">Feito com ❤️ e ☕️ por <a class="text-yellow-700" href="https://github.com/Elisariane" style="text-decoration: none; color: #FE7524;" target="_blank">Elisariane</a> Copyright &copy; 2021 </span>
      </p>
    </q-footer>
  </q-layout>
</template>
<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      tab: ref('images')
    }
  }
}
</script>