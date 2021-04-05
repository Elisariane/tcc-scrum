<template>
  <div class="q-pa-xg">
      <q-header elevated class="bg-deep-purple-7  ">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>TCCScrum</q-toolbar-title>
          
          <div class="q-pa-md q-gutter-sm">
           
          <q-btn-dropdown round flat fab dropdown-icon >
                <template v-slot:label>
                  <div class="row items-center no-wrap">
                  <q-icon name="account_circle" color="white" size="32px"/>
                  </div>
               </template>

            <q-list>
              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <a href="/profile" class="text-dark" style="text-decoration: none"> Ver Perfil</a>
                </q-item-section>
              </q-item>
              <q-item clickable >
                  <q-item-section @click="this.sair()">
                    Sair
                 </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          </div>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above

        :mini="miniState"
        @mouseover="miniState = false"
        @mouseout="miniState = true"
        mini-to-overlay

        :width="200"
        :breakpoint="500"
        bordered
        class="bg-grey-3"
      >
        <q-scroll-area class="fit">
          <q-list padding>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="dashboard" />
              </q-item-section>
              <q-item-section>
                <a href="/dashboard" class="text-dark" style="text-decoration: none"> Dashboard</a>
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="move_to_inbox" />
              </q-item-section>
              <q-item-section>
                <a href="/criar-sprint" class="text-dark" style="text-decoration: none">Criar Sprint</a>
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="list" />
              </q-item-section>

              <q-item-section>
              <a href="/tcc-backlog" class="text-dark" style="text-decoration: none">TCC Backlog</a>
                
              </q-item-section>
            </q-item>

            <q-separator />

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="logout" />
              </q-item-section>

              <q-item-section @click="this.sair()">
                Sair
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>      
  </div>
</template>

<script>
import { ref } from 'vue'
import Auth from '../../services/authService';
export default {
  setup () {
    return {
      drawer: ref(false),
      miniState: ref(true)
    }
  },
  methods: {
    sair(){
      Auth.logout();
    }
  }
}
</script>