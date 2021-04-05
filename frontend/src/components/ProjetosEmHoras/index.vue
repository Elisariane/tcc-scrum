<template>
   <div class="q-ma-md">
      <div class="row q-mb-md q-col-gutter-md">
        <div class="col-md-3 col-lg-3 col-sm-12 col-xs-12 box_1">
          <q-card class="shadow">
            <q-card-section class="bg-teal-6 q-pa-sm text-white">
              <q-item class="q-pb-none q-pt-xs">
                <q-item-section>
                  <q-item-label class="text-h4" style="font-weight: 500;letter-spacing: 3px;">{{totalHoras()}}</q-item-label>
                  <q-item-label class="text-grey-4">Total Estimado do Projeto</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="access_time" class="box_1 text-white" size="80px"></q-icon>
                </q-item-section>
              </q-item>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-md-3 col-lg-3 col-sm-12 col-xs-12 box_2 ">
          <q-card class="shadow ">
            <q-card-section class="bg-green-6 q-pa-sm text-white">
              <q-item class="q-pb-none q-pt-xs">
                <q-item-section>
                  <q-item-label class="text-h4" style="font-weight: 500;letter-spacing: 3px;">{{ totalHorasConcluido() !== 0 ? 0 : totalHorasConcluido() }}%</q-item-label>
                  <q-item-label class="text-grey-4">Total de Tarefas Concluídas</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="access_time" class="box_2 text-white" size="80px"></q-icon>
                </q-item-section>
              </q-item>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-md-3 col-lg-3 col-sm-12 col-xs-12 box_3 ">
          <q-card class="shadow">
            <q-card-section class="bg-yellow-8  q-pa-sm text-white">
              <q-item class="q-pb-none q-pt-xs">
                <q-item-section>
                  <q-item-label class="text-h4" style="font-weight: 500;letter-spacing: 3px;">{{ totalHorasEmAndamento() !== 0 ? 0 : totalHorasEmAndamento() }}%</q-item-label>
                  <q-item-label class="text-grey-4">Total de Tarefas em Andamento</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="access_time" class="box_3 text-white" size="80px"></q-icon>
                </q-item-section>
              </q-item>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-md-3 col-lg-3 col-sm-12 col-xs-12 box_3 ">
          <q-card class="shadow">
            <q-card-section class="bg-deep-orange-6  q-pa-sm text-white">
              <q-item class="q-pb-none q-pt-xs">
                <q-item-section>
                  <q-item-label class="text-h4" style="font-weight: 500;letter-spacing: 3px;">{{totalHorasPendente() !== 0 ? 0 : totalHorasPendente() }}%</q-item-label>
                  <q-item-label class="text-grey-4">Total de Tarefas Pendentes </q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="access_time" class="box_3 text-white" size="80px"></q-icon>
                </q-item-section>
              </q-item>
            </q-card-section>
          </q-card>
        </div>
      </div>
  </div>
</template>

<script>
import TccBacklogDataService from '../../services/tccBacklogDataService';
import UsuarioDataService from '../../services/usuarioDataService';
import moment from 'moment';
export default {
   mounted () {
    this.getAllItens()
  },
  data() {
        return {
        listTodosItens: [],
        idUsuario: 0
        }
    },
    methods: {
        getAllItens(){
            UsuarioDataService.getAllByUsuario(this.idUsuario).then( response => {
             this.listTodosItens = response.data[0].tccBacklogs;
           })
        },
        somaEstimativa: function () {
        let soma = moment.duration(0, 'hours')
        this.listTodosItens.forEach(element => {
            const estimativa = moment.duration(element.estimativa)
            soma.add(estimativa)
        });
        return soma
        },
        totalHoras: function(){
            return `${this.somaEstimativa().hours()}:${this.somaEstimativa().minutes()}`
        }, 

        totalHorasConcluido: function(){
            let concluido = moment.duration(0, 'hours')
            const total = this.somaEstimativa()
            this.listTodosItens.filter( item => item.status === 'finalizado').forEach(element => {
            const estimativa = moment.duration(element.estimativa)
            concluido.add(estimativa)
            });
            const porcentagem = Math.round((concluido.asMinutes() / total.asMinutes()) * 100, 2)
            return porcentagem
        }, 

        totalHorasEmAndamento: function(){
            let emAndamento = moment.duration(0, 'hours')
            const total = this.somaEstimativa()
            this.listTodosItens.filter( item => item.status === 'fazendo').forEach(element => {
            const estimativa = moment.duration(element.estimativa)
            emAndamento.add(estimativa)
            });
            const porcentagem = Math.round((emAndamento.asMinutes() / total.asMinutes()) * 100, 2)
            return porcentagem
        }, 

        totalHorasPendente: function(){
            let pendente = moment.duration(0, 'hours')
            const total = this.somaEstimativa()
            this.listTodosItens.filter( item => item.status === 'pendente').forEach(element => {
            const estimativa = moment.duration(element.estimativa)
            pendente.add(estimativa)
            });
            const porcentagem = Math.round((pendente.asMinutes() / total.asMinutes()) * 100, 2)
            return porcentagem
        }, 
        
    },
 
}
</script>
