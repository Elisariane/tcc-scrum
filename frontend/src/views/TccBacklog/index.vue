<template> 
  <q-layout view="hHh lpR fFf">
    <Menu/>
      <q-page-container>
      <div class="q-pa-md">
      <div class="on-right q-ma-md">
        <q-btn round  :size="lg"  color="positive" @click="toolbar = true"> <q-icon name="add"  style="font-size: 52px; padding: 4px"/> </q-btn>  
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
              {{ props.row.descricao.length > 50 ? props.row.descricao.substr(0, 50) + ' ...' : props.row.descricao }} 
          <q-btn size="sm" rounded flat color="dark"  v-if="props.row.descricao.length > 50">
          <q-icon name="remove_red_eye" />
          <q-tooltip
            transition-show="scale"
            transition-hide="scale"
            anchor="bottom middle" self="center middle"
            
          >
            {{props.row.descricao}}
          </q-tooltip>
      </q-btn>
          </q-td>
          <q-td key="status" :props="props">
              <q-badge color="deep-orange-10" rounded  :label="props.row.status.toUpperCase()" v-if="props.row.status === 'pendente' "/>
              <q-badge color="yellow-8" rounded  :label="props.row.status.toUpperCase()" v-if="props.row.status === 'fazendo' "/>
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
              <q-btn  color="primary" @click="toolbar = true; selectItemForEdit(props.row.id)"  class="q-ma-sm">  <q-icon name="mode_edit" /> </q-btn>
              <q-btn color="negative"  @click="selectItemForDelete(props.row.id); confirmDelete = true" > <q-icon name="delete_forever" /> </q-btn>
          </q-td>  
          
        </q-tr>
      </template>
    </q-table>
  </div>
  
  <ProjetosEmHoras/>

  <q-dialog v-model="toolbar" persistent>
    <q-card>
      <q-toolbar>
        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>

      <q-card-section>
        <div class="q-pa-xs items-center justify-center content-center q-gutter-xs">
            <h4 class="text-title text-center" v-if="this.isEdit === false"> Nova tarefa no Tcc Backlog Nº {{(this.listItensTccBakclog.length + 1)}}</h4>
            <h4 class="text-title text-center" v-if="this.isEdit === true"> Editar tarefa {{this.idSelected}} no Tcc Backlog </h4>

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
                    lazy-rules
                    :rules="[
                      val => val !== 0 && val !== '' || 'Informe a prioridade do requisito']"
                    label="Prioridade *" />
                    
                  <q-input
                    stack-label
                    filled
                    type="time"
                    v-model="itemTccBacklog.estimativa"
                    label="Estimativa (hora:minuto) *"
                    lazy-rules
                    min="00:05:00" 
                    max="08:00:00"
                    :rules="[
                      val => val !== null && val !== '' || 'Informe a estimativa',
                      val => val <= '08:00:00' || 'As tarefas devem ter menos de 8 horas de duração',
                      val => val >= '00:04:00' || 'As tarefas devem ter no mínimo 5 minutos de duração'
                      ]"
                  />
                  <div class="justify-end">
                    <q-btn label="Salvar" type="submit"   @click="saveItem()" color="primary" v-if="this.isEdit === false"/>
                    <q-btn label="Editar" type="submit" @click="editItem()" color="info" v-if="this.isEdit === true" />
                    <q-btn label="Cancelar"  color="negative" @click="toolbar = false; this.isEdit = false; this.itemTccBacklog = {}" class="q-ml-sm" />
                  </div>
                </q-form>
        </div>     
      </q-card-section>
    </q-card>
  </q-dialog>
  
  <q-dialog v-model="confirmDelete" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar class="q-mrb-sm" icon="warning" color="warning" text-color="white" />
          <span class="q-ml-sm text-center">Tem certeza que deseja excluir a tarefa {{this.idSelected}} ? <br/> Este item não voltará nunca mais ... </span>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn  label="Deletar"  @click="deleteItem(this.idSelected)" color="negative" v-close-popup />
          <q-btn flat  label="Cancelar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
      

  </q-page-container>
  <Footer/>
  </q-layout>
</template>

<script> 
import Menu from '@/components/Menu/index.vue';
import Footer from '@/components/Footer/index.vue';
import ProjetosEmHoras from '@/components/ProjetosEmHoras/index.vue';
import TccBacklogDataService from '../../services/tccBacklogDataService';
import UsuarioDataService from '../../services/usuarioDataService';
import { ref } from 'vue'; 
import { useQuasar } from 'quasar'


export default {
  name: 'TccBacklog',
  components: {
    Menu,
    Footer,
    ProjetosEmHoras
  },
  mounted () {
    this.getItens()
  },
  setup () {
    return {
      toolbar: ref(false),
      confirmDelete: ref(false)
    }
  },
   data() {
    return { 
      isEdit: false,
      idSelected: 0,
      page: 1,
      pesquisaItem: '',
      dropdownPopoverShow: false,
      idUsuario: 1,
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
        id_usuario: 1, //por hora o usuario será fixo
        dataCadastro: new Date().toISOString()
      };

      TccBacklogDataService.create(data)
        .then(response => {
          this.itemTccBacklog.id = response.data.id;
          this.getItens();
          this.itemTccBacklog = {};
          toolbar = false
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
    selectItemForDelete(id){
       this.idSelected = id;
    },
    selectItemForEdit(id){
    this.isEdit = true;
    this.idSelected = id;
    TccBacklogDataService.get(id).then(response => {
      this.itemTccBacklog.id = response.data.id,
      this.itemTccBacklog.requisito = response.data.requisito,
      this.itemTccBacklog.descricao = response.data.descricao,
      this.itemTccBacklog.prioridade = response.data.prioridade,
      this.itemTccBacklog.estimativa = response.data.estimativa,
      this.itemTccBacklog.status = response.data.status,
      this.itemTccBacklog.dataCadastro = response.data.dataCadastro;
      return this.itemTccBacklog;
    })
    .catch(e => {
      console.log(e);
    });
    },
    editItem() {
      var data = {
        somaHoras: 0,
        id: this.idSelected,
        requisito: this.itemTccBacklog.requisito,
        descricao: this.itemTccBacklog.descricao,
        prioridade: this.itemTccBacklog.prioridade,
        estimativa: this.itemTccBacklog.estimativa,
        status: this.itemTccBacklog.status,
        dataCadastro: this.itemTccBacklog.dataCadastro
      };

      TccBacklogDataService.update(this.idSelected, data)
        .then(response => {
          this.itemTccBacklog = response.config.data;
          this.getItens();
          this.itemTccBacklog = {};
          toolbar = false;
        })
        .catch(e => {
          console.log(e);
        });
    },
    getItens() {
        UsuarioDataService.getAllByUsuario(this.idUsuario).then( response => {
          console.log(response.data)
        this.listItensTccBakclog = response.data[0].tccBacklogs;
      })
    },
    getAllPrioridadeAlta() {
       TccBacklogDataService.getAllPrioridadeAlta(this.idUsuario).then( response => {
        this.listItensTccBakclog = response.data;
      })
    },
    getAllPrioridadeMedia() {
       TccBacklogDataService.getAllPrioridadeMedia(this.idUsuario).then( response => {
        this.listItensTccBakclog = response.data;
      })
    },
    getAllPrioridadeBaixa () {
       TccBacklogDataService.getAllPrioridadeBaixa(this.idUsuario).then( response => {
        this.listItensTccBakclog = response.data;
      })
    },
    getAllStatusPendente() {
       TccBacklogDataService.getAllStatusPendente(this.idUsuario).then( response => {  
        this.listItensTccBakclog = response.data;
      })
      
    },
    getAllStatusFazendo() {
       TccBacklogDataService.getAllStatusFazendo(this.idUsuario).then( response => {
        this.listItensTccBakclog = response.data;
      })
    },
    getAllStatusFinalizado() {
       TccBacklogDataService.getAllStatusFinalizado(this.idUsuario).then( response => {
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
    },
}
} 
</script> 