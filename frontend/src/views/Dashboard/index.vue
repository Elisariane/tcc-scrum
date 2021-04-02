<template>
  <q-layout view="hHh lpR fFf">

  <Menu/>
  <q-page-container>
 
  <ProjetosEmHoras/>
  </q-page-container>
  <Footer/>
  </q-layout>
</template>

<script>
import Menu from '@/components/Menu/index.vue';
import Footer from '@/components/Footer/index.vue';
import ProjetosEmHoras from '@/components/ProjetosEmHoras/index.vue';
export default {
  name: 'Dashboard',
  components: {
    Menu,
    Footer,
    ProjetosEmHoras
  },
}
</script>
