<template>
  <q-layout view="hHh lpR fFf">

  <Menu/>
  <q-page-container>
 
  <ProjetosEmHoras/>

  <q-separator inset="" />

  <!-- <BurndownChart/> -->
  </q-page-container>
  <Footer/>
  </q-layout>
</template>

<script>
import Menu from '@/components/Menu/index.vue';
import Footer from '@/components/Footer/index.vue';
import ProjetosEmHoras from '@/components/ProjetosEmHoras/index.vue';
import BurndownChart from '@/components/BurndownChart/index.vue';
export default {
  name: 'Dashboard',
  components: {
    Menu,
    Footer,
    ProjetosEmHoras,
    BurndownChart
  },
  mounted(){
  }
}
</script>
