<template>
<q-layout >
    <q-page-container>
      <q-page class="flex bg-image flex-center flex-grow-1 flex-shrink-0 flex-basis-auto flex-column">
        <q-card style="width: 100%; max-width: 500px" class=" q-ma-md q-pa-md">
          <q-card-section>
            <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="https://media.istockphoto.com/vectors/emoticon-cute-colors-facial-features-icon-design-vector-id1208686049?b=1&k=6&m=1208686049&s=170667a&w=0&h=gv0Tn6bcSMMNaJ9BlVPky_xYkk8ULUPzUeYh4Sl_QH4=">
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">
                Registre-se
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form
                @submit.prevent="handleRegister"
                @reset="onReset"
                class="q-gutter-xs"
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
                <div class="q-ma-md">
                    <span for="" class="row">Selecione o seu tipo de usuário:
                        <q-option-group
                            :options="options"
                            label="Tipo de usuário"
                            type="radio"
                            dense
                            v-model="usuario.tipoUsuario"
                        />
                    </span>
                </div>

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
                    <span class="text-grey-7 text-center q-ma-sm">Já possuí cadastro? <a   class="text-link text-orange" style="text-decoration: none" href="/login">entre aqui.</a></span>
                </div>

                <div class="text-center q-pa-md">
                    <q-btn label="Cadastrar" type="submit" color="orange"/>
                    <q-btn label="Limpar" type="reset" color="deep-orange-6" flat class="q-ml-sm" />
                </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import Auth from '../../services/usuarioDataService';
import router from '@/router/index';
export default {
    name: 'SignUp',
    setup () {
    return {
    group: ref(null),

      options: [
        { label: 'Professor', value: 'professor' },
        { label: 'Aluno', value: 'aluno' },
    ]
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
     router.push('/');
    }
  },
  data() {
    return {
        usuario: {
            nome: '',
            email: '',
            senha: '',
            senha_reapeat: '',
            tipoUsuario: ''
        },
        submitted: false,
        successful: false,
        message: ''
    }
  },
  methods: {
    handleRegister() {
      this.message = '';
      this.submitted = true;
        Auth.signUp(this.usuario).then(
        data => {
            this.message = data.message;
            this.successful = true;
            router.push('/login');

        },
        error => {
            this.message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
            this.successful = false;
        });
    }
  }
 
}
</script>

<style scoped>
.bg-image {
  background-color: #ff9d00;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg stroke='%23000' stroke-width='66.7' stroke-opacity='0.05' %3E%3Ccircle fill='%23ff9d00' cx='0' cy='0' r='1800'/%3E%3Ccircle fill='%23fd8e14' cx='0' cy='0' r='1700'/%3E%3Ccircle fill='%23fa7f21' cx='0' cy='0' r='1600'/%3E%3Ccircle fill='%23f5702a' cx='0' cy='0' r='1500'/%3E%3Ccircle fill='%23ef6132' cx='0' cy='0' r='1400'/%3E%3Ccircle fill='%23e75338' cx='0' cy='0' r='1300'/%3E%3Ccircle fill='%23de453e' cx='0' cy='0' r='1200'/%3E%3Ccircle fill='%23d43843' cx='0' cy='0' r='1100'/%3E%3Ccircle fill='%23c82b47' cx='0' cy='0' r='1000'/%3E%3Ccircle fill='%23bc1f4b' cx='0' cy='0' r='900'/%3E%3Ccircle fill='%23af124e' cx='0' cy='0' r='800'/%3E%3Ccircle fill='%23a10550' cx='0' cy='0' r='700'/%3E%3Ccircle fill='%23920051' cx='0' cy='0' r='600'/%3E%3Ccircle fill='%23830051' cx='0' cy='0' r='500'/%3E%3Ccircle fill='%23730050' cx='0' cy='0' r='400'/%3E%3Ccircle fill='%2363004e' cx='0' cy='0' r='300'/%3E%3Ccircle fill='%2352004c' cx='0' cy='0' r='200'/%3E%3Ccircle fill='%23420048' cx='0' cy='0' r='100'/%3E%3C/g%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
}
</style>