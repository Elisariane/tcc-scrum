<template>

<q-layout view="hHh lpR fFf" >
    <q-page-container>
        <q-page class="q-pa-sm">
            <div class="row q-col-gutter-sm q-ma-xs">
                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <q-card class="my-card" flat bordered>
                    <q-card-section horizontal>
                        <q-card-section class="q-pt-xs">
                        <div class="text-overline">
                            <q-badge
                            outline color="orange"
                            >
                                {{currentUser.tipoUsuario}}
                            </q-badge>
                        </div>
                        <div class="text-h5 q-mt-sm">{{currentUser.nome}}</div>
                        <div class="text-caption text-grey-8 q-mb-xs">{{currentUser.email}}</div>
                        <div class="text-caption text-grey" v-if="currentUser.tipoUsuario === 'PROFESSOR'">
                            Responsável por: Gerenciar e priorizar os itens do TCC Backlog | Instruir seu orientando com todo seu conhecimento e paciência
                        </div>
                        <div class="text-caption text-grey" v-if="currentUser.tipoUsuario === 'ALUNO'">
                            Responsável por: Garantir o entendimento sobre o Framework esua  devida  aplicação 
                            | Facilitar  o  desenvolvimento, removendo possíveis impedimentos | Desenvolver os itens do TCC Backlog | Gerenciar o tempo
                        </div>
                        
                        </q-card-section>

                        <q-card-section class="col-5 flex flex-center ">
                        <q-img
                            class="rounded-borders "
                            src="https://media.istockphoto.com/vectors/emoticon-cute-colors-facial-features-icon-design-vector-id1208686049?b=1&k=6&m=1208686049&s=170667a&w=0&h=gv0Tn6bcSMMNaJ9BlVPky_xYkk8ULUPzUeYh4Sl_QH4="
                        />
                        </q-card-section>
                    </q-card-section>

                   
                    </q-card>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <q-card>
                    <q-card-section>
                        <div class="text-h4 q-ma-sm q-pa-md text-center">Alterar dados</div>

                        <q-form
                        class="q-gutter-md"
                        >

                        <q-input
                            filled
                            v-model="usuario.nome"
                            label="Nome *"
                            hint="Nome e Sobrenome"
                            lazy-rules
                            :rules="[ val => val && val.length > 0 || 'Insira seu nome']"
                        />
                        <q-input
                            filled
                            v-model="usuario.email"
                            label="E-mail *"
                            hint="E-mail"
                            lazy-rules
                            :rules="[ val => val && val.length > 0 || 'Insira um e-mail válido']"
                        />

                        <q-input
                            filled
                            v-model="usuario.senha"
                            label="Senha *"
                            type="password"
                            lazy-rules
                            :rules="[ val => val && val.length >= 6 || 'Insira uma senha com pelo menos 6 caracteres']"
                        />

                        <q-input
                            filled
                            type="password"
                            v-model="usuario.senha_reapeat"
                            label="Confirme a senha *"
                            lazy-rules
                            :rules="[ val => val && val === usuario.senha || 'As senhas devem coincidir']"
                        />
 

                        <div class="text-center">
                            <q-btn rounded label="Alterar" type="submit" color="primary"/>
                        </div>
                        </q-form>
                    </q-card-section>
                    </q-card>
                </div>
                </div>
        </q-page>
    </q-page-container>
        <Menu/>
    <Footer/>
</q-layout>
</template>

<script>
import Menu from '@/components/Menu/index.vue';
import Footer from '@/components/Footer/index.vue';
import router from '@/router/index';

    export default {
        name: "Profile",
          components: {
            Menu,
            Footer,
        },
         data() {
            return {
                usuario: {
                    nome: '',
                    email: '',
                    senha: '',
                    senha_reapeat: '',
                    tipoUsuario: ''
                }
            }
        },
         computed: {
            currentUser() {
                return JSON.parse(localStorage.getItem('usuario')); 
            }
        },
        mounted() {
            if (!this.currentUser) {
               router.push('/login');
            }
        }
    }
</script>

<style scoped>
  .card-bg {
    background-color: #162b4d;
  }
</style>