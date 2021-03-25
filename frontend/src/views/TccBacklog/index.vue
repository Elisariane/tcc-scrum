<template> 
  <q-layout view="hHh lpR fFf">
    <Menu/>
      <q-page-container>
      <div class="q-pa-md">
      <div class="on-right q-ma-md">
        <q-btn rounded :size="lg"  color="positive" @click="toolbar = true"> <q-icon name="add"  style="font-size: 32px;"/> </q-btn>  
      </div>

    <q-table
      title="TCC Backlog"
      :rows="listItensTccBakclog" 
      :columns="columns"
      row-key="name"
      @request="onRequest"
      no-data-label="Eu não encontrei nada para você aqui :("
      binary-state-sort
    >

    <template v-slot:top-center>
   
    </template>

    <template v-slot:top-right class="q-ma-md">
       <div class="q-pa-md q-gutter-y-md column items-center">
        <span class="text-grey-8">Filtre por prioridade</span>
        <q-btn-group rounded >
          <q-btn color="secondary"  rounded label="Alta" @click="getAllPrioridadeAlta()"/>
          <q-btn color="secondary" rounded  label="Média" @click="getAllPrioridadeMedia()"/>
          <q-btn color="secondary" rounded label="Baixa" @click="getAllPrioridadeBaixa()" />
          <q-btn color="negative" rounded icon="close" @click="getItens()" />
        </q-btn-group>
      </div> 
      <div class="q-pa-md q-gutter-y-md column items-center">
        <span class="text-grey-8">Filtre por status</span>
        <q-btn-group rounded>
          <q-btn color="secondary"  rounded label="Pendente" @click="getAllStatusPendente()"/>
          <q-btn color="secondary" rounded label="Fazendo" @click="getAllStatusFazendo()" />
          <q-btn color="secondary" rounded  label="Finalizado" @click="getAllStatusFinalizado()" />
          <q-btn color="negative" rounded icon="close" @click="getItens()"/>
        </q-btn-group>
      </div>       
       
      </template>

      <template v-slot:no-data="{ message }">
          <div class="full-width row flex-center text-accent q-gutter-sm">
            <q-icon size="2em" name="sentiment_dissatisfied" />
            <span>
              Aqui parece bem vazio... {{ message }}
            </span>
          </div>
        </template>
 
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props"> 
              {{props.row.id}}
          </q-td>
          <q-td key="requisito" :props="props"> 
              {{props.row.requisito}}
          </q-td>
          <q-td key="descricao" :props="props" class="cols-3"> 
              {{props.row.descricao}}
          </q-td>
          <q-td key="status" :props="props">
              <q-badge color="deep-orange-10" rounded  :label="props.row.status.toUpperCase()" v-if="props.row.status === 'pendente' "/>
              <q-badge color="yellow-5" rounded  :label="props.row.status.toUpperCase()" v-if="props.row.status === 'fazendo' "/>
              <q-badge color="green-5" rounded  :label="props.row.status.toUpperCase()" v-if="props.row.status === 'finalizado' "/>
          </q-td>
          <q-td key="prioridade" :props="props"> 
            <q-badge color="red-7" rounded  :label="props.row.prioridade.toUpperCase()" v-if="props.row.prioridade === 'alta' "/>
            <q-badge color="lime-7" rounded  :label="props.row.prioridade.toUpperCase()" v-if="props.row.prioridade === 'media' "/>
            <q-badge color="brown-5" rounded  :label="props.row.prioridade.toUpperCase()" v-if="props.row.prioridade === 'baixa' "/>
          </q-td>
          <q-td key="estimativa" :props="props"> 
              {{props.row.estimativa}}
          </q-td>
          <q-td key="acao" :props="props"> 
              <q-btn  color="primary" @click="toolbar = true; editItem(props.row.id)"  class="q-ma-sm">  <q-icon name="mode_edit" /> </q-btn>
              <q-btn color="negative"  @click="deleteItem(props.row.id)" > <q-icon name="delete_forever" /> </q-btn>
          </q-td>  
          
        </q-tr>
      </template>
    </q-table>
  </div>
  
  <div class="q-ma-md">
      <div class="row q-mb-md q-col-gutter-md">
        <div class="col-md-3 col-lg-3 col-sm-12 col-xs-12 box_1">
          <q-card class="shadow">
            <q-card-section class="bg-teal-6 q-pa-sm text-white">
              <q-item class="q-pb-none q-pt-xs">
                <q-item-section>
                  <q-item-label class="text-h4" style="font-weight: 500;letter-spacing: 3px;">{{total}}</q-item-label>
                  <q-item-label class="text-grey-4">Total de Horas de Todo o 
                  Projeto</q-item-label>
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
                  <q-item-label class="text-h4" style="font-weight: 500;letter-spacing: 3px;">1050</q-item-label>
                  <q-item-label class="text-grey-4">Total de Horas de Tarefas já concluídas</q-item-label>
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
                  <q-item-label class="text-h4" style="font-weight: 500;letter-spacing: 3px;">80 %</q-item-label>
                  <q-item-label class="text-grey-4">Total de Horas de Tarefas em andamento</q-item-label>
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
                  <q-item-label class="text-h4" style="font-weight: 500;letter-spacing: 3px;">80 %</q-item-label>
                  <q-item-label class="text-grey-4">Total de Horas de Tarefas pendentes</q-item-label>
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

  <q-dialog v-model="toolbar">
    <q-card>
      <q-toolbar>
        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>

      <q-card-section>
        <div class="q-pa-xs items-center justify-center content-center q-gutter-xs">
            <h4 class="text-title text-center">Novo item no Tcc Backlog Nº {{(this.listItensTccBakclog.length + 1)}}</h4>
            <hr>
                <q-form
                  @submit="onSubmit"
                  @reset="onReset"
                  class="q-gutter-md"
                >
                  <q-input
                    filled
                    v-model="itemTccBacklog.requisito"
                    label="Requisito *"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Informe o nome do requisito']"
                  />

                  <q-input
                    filled
                    type="textarea"
                    v-model="itemTccBacklog.descricao"
                    label="Descrição do requisito *"
                    lazy-rules
                    :rules="[
                      val => val !== null && val !== '' || 'Informe a descrição do requisito']"
                  />
                  
                  <q-select filled 
                    v-model="itemTccBacklog.prioridade" 
                    :options="prioridades" 
                    v-bind:value="prioridades.value"
                    label="Prioridade" />

                  <q-input
                    filled
                    type="time"
                    v-model="itemTccBacklog.estimativa"
                    label="Estimativa (hora:minuto) *"
                    lazy-rules
                    min="00:05:00" 
                    max="08:00:00"
                    :rules="[
                      val => val !== null && val !== '' || 'Informe a descrição do requisito',
                      val => val <= '08:00:00' || 'As tarefas devem ter menos de 8 horas de duração',
                      val => val >= '00:04:00' || 'As tarefas devem ter no mínimo 5 minutos de duração'
                      ]"
                  />
                  <div class="justify-end">
                    <q-btn label="Add"   @click="saveItem()" color="primary"/>
                    <q-btn label="Limpar" type="reset" color="primary" flat class="q-ml-sm" />
                  </div>
                </q-form>
        </div>     
      </q-card-section>
    </q-card>
  </q-dialog>

      

      </q-page-container>
    <Footer/>
  </q-layout>
</template>

<script> 
import Menu from '@/components/Menu/index.vue';
import Footer from '@/components/Footer/index.vue';
import TccBacklogDataService from '../../services/tccBacklogDataService';
import { ref } from 'vue'

export default {
  mounted () {
    this.getItens()
  },
  name: 'TccBacklog',
  components: {
    Menu,
    Footer
  },
  setup () {
    return {
      toolbar: ref(false)
    }
  },
   data() {
    return {
      totalHoras: 0,
      page: 1,
      pesquisaItem: '',
      dropdownPopoverShow: false,
      prioridades: [
        'Alta',
        'Média',
        'Baixa'
      ],
      status: [
        'pendente',
        'fazendo',
        'finalizado'
      ],
      itemTccBacklog: {
        id: null,
        requisito: "",
        descricao: "",
        prioridade: "",
        status: "",
        estimativa: ""
      },
      listItensTccBakclog: [],
      columns: [
        {
          name: 'id',
          required: true,
          align: "center",
          label: '#',
          field: row => row.id,
          format: val => `${val}`,
          sortable: true
        },
        {  
          name: 'requisito', 
          label: 'Requisito', 
          field: 'requisito', 
          width: '80px', 
          align: "center",
          sort: true },
        {  
          name: 'descricao', 
          label: 'Descrição', 
          field: 'descricao', 
          width: '150px', 
          sort: true,
          align: "center"
        },
        {  
          name: 'status', 
          label: 'Status', 
          field: 'status', 
          width: '25px', 
          align: "center",
          sort: true 
        },
        {  
          name: 'prioridade', 
          label: 'Prioridade', 
          field: 'prioridade', 
          width: '25px', 
          align: "center",
          sort: true
         },
        { 
          name: 'estimativa', 
          label: 'Estimativa', 
          field: 'estimativa', 
          width: '25px', 
          align: "center",
          sort: true 
        },
        { 
          name: 'acao', 
          label: 'Ação', 
          field: 'acao', 
          align: "center",
          width: '50px'
        }
      ],
    }    
  },
  methods: {
    saveItem() {
      var data = {
        requisito: this.itemTccBacklog.requisito,
        descricao: this.itemTccBacklog.descricao,
        prioridade: this.itemTccBacklog.prioridade,
        estimativa: this.itemTccBacklog.estimativa,
        status: "pendente",
        dataCadastro: new Date().toISOString()
      };

      TccBacklogDataService.create(data)
        .then(response => {
          this.itemTccBacklog.id = response.data.id;
          this.getItens();
          this.itemTccBacklog = {};
        })
        .catch(e => {
          console.log(e);
        });
    },
    deleteItem(id) {
      TccBacklogDataService.delete(id)
        .then(response => {
          this.itemTccBacklog.id = response.data.id;
          this.getItens();
        })
        .catch(e => {
          console.log(e);
        });
    },
    editItem(id) {
      TccBacklogDataService.get(id).then(response => {
          this.itemTccBacklog.requisito = response.data.requisito,
          this.itemTccBacklog.descricao = response.data.descricao,
          this.itemTccBacklog.prioridade = response.data.prioridade,
          this.itemTccBacklog.estimativa = response.data.estimativa,
          this.itemTccBacklog.status = response.data.status,
          this.itemTccBacklog.dataCadastro = response.data.dataCadastro
        })
        .catch(e => {
          console.log(e);
        });
      var data = {
        requisito: this.itemTccBacklog.requisito,
        descricao: this.itemTccBacklog.descricao,
        prioridade: this.itemTccBacklog.prioridade,
        estimativa: this.itemTccBacklog.estimativa,
        status: this.itemTccBacklog.status,
        dataCadastro: this.itemTccBacklog.dataCadastro
      };

      TccBacklogDataService.update(data)
        .then(response => {
          console.log(response.data);
          this.getItens();
          this.itemTccBacklog = {};
        })
        .catch(e => {
          console.log(e);
        });
    },
    getItens() {
       TccBacklogDataService.getAll().then( response => {
        this.listItensTccBakclog = response.data;
      })
    },
    getAllPrioridadeAlta() {
       TccBacklogDataService.getAllPrioridadeAlta().then( response => {
        this.listItensTccBakclog = response.data;
      })
    },
    getAllPrioridadeMedia() {
       TccBacklogDataService.getAllPrioridadeMedia().then( response => {
        this.listItensTccBakclog = response.data;
      })
    },
    getAllPrioridadeBaixa () {
       TccBacklogDataService.getAllPrioridadeBaixa().then( response => {
        this.listItensTccBakclog = response.data;
      })
    },
    getAllStatusPendente() {
       TccBacklogDataService.getAllStatusPendente().then( response => {  
        this.listItensTccBakclog = response.data;
      })
      
    },
    getAllStatusFazendo() {
       TccBacklogDataService.getAllStatusFazendo().then( response => {
        this.listItensTccBakclog = response.data;
      })
    },
    getAllStatusFinalizado() {
       TccBacklogDataService.getAllStatusFinalizado().then( response => {
        this.listItensTccBakclog = response.data;
      })
    },
   
    watch: {
      page () {
        this.getItens()
      }
    },
    computed: {
      url () {
        return `itensTccBakclog?page=${this.page}&per_page=10${this.search}`
      },
      search () {
        return this.pesquisaItem ? `&item_name=${this.pesquisaItem}` : ''
      },
 
    },
}
} 
</script> 