<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
    <div class="q-pa-md"  v-if="this.sprint === null">
        <q-stepper
            v-model="step"
            header-nav
            ref="stepper"
            done-color="green-7"
            active-color="deep-orange-6"
            animated
        >
        <q-step
            :name="1"
            title="Informações da Sprint"
            icon="move_to_inbox"
            :done="done1"
        >
            <h5 class="text-title2 text-center">Informações da Sprint</h5>

            <p class="q-mb-md text-center text-body2 text-weight-light text-grey-7"  >Sprint é o ciclo iterativo de tempo de execução e tem duração de 15 dias. Toda Sprint tem seu 
            objetivo, pode ser algo importante
            á ser atingido. Exemplo: "Concluir navegação na página por permissão de usuário"
            </p>
            <div class="q-pa-lg" style="max-width: 100%">
                <q-form
                @submit="onSubmit"
                class="q-gutter-md"
                >
                <div class="row q-ma-md">
                    <q-input
                        filled
                        v-model="sprint.dataInicio"
                        @blur="this.addDataFim()"
                        label="Data de Inicio *"
                        lazy-rules
                        type="date"
                        stack-label
                        :rules="[ val => val && val.length > 0 || 'Informe uma data']"
                    />
                    <q-space/>
                    <q-input
                        filled
                        v-model="sprint.dataFim"
                        label="Data de Fim *"
                        lazy-rules
                        type="date"
                        stack-label
                        readonly
                    />
                    <q-space/>
                <q-input
                    filled
                    type="textarea"
                    v-model="sprint.objetivo"
                    label="Objetivo da Sprint*"
                    lazy-rules
                    :rules="[
                    val => val !== null && val !== '' || 'O objetivo da Sprint deve ser definido'
                    ]"
                />
                </div>


                </q-form>

            </div>

            <q-stepper-navigation>
            <q-btn @click="() => { done1 = true; step = 2 }" color="deep-orange-8" label="Continuar" />
            </q-stepper-navigation>
        </q-step>

        <q-step
            :name="2"
            title="Selecionar tarefas da Sprint"
            icon="add_task"
            :done="done2"
        >
        <h5 class="text-title2 text-center">Selecione tarefas para a Sprint</h5>

            <p class="q-mb-md text-center text-body2 text-weight-light text-grey-7"  > 
            Agora é a hora de escolher as tarefas que você irá desenvolver durante a Sprint. <strong>Atenção</strong>  ao total de tempo!
            O recomendado é que o total de horas de todas as tarefas escolhidas esteja dentro do seu tempo que usará de dedicação ao projeto.
            </p>
            <br>
            <div class="row text-center text-body2 text-weight-light text-grey-7 ">
            <span class="q-ma-sm text-center">Informe aqui quantas horas por dia você irá se dedicar ao seu TCC</span> 
            <q-input
                filled
                dense
                v-model="this.horasTotaisPorDia"
                @blur="this.calcularLimiteHorasTotais()"
                label="Horas por dia"
                lazy-rules
                :rules="[ val => val <= 8 || 'Não é muito saudável essa quantidade de horas :( Tente dedicar-se no máximo 8 horas' ]"
                type="number" 
                max="8"
                min="1"
            />        
            </div>
            <br>
            <p  v-if="horasTotaisPorDia > 0" class="q-mb-md text-center text-body2 text-weight-light text-grey-7">
            Dedicando-se <strong>{{ horasTotaisPorDia > 1 ? horasTotaisPorDia + ' horas' : horasTotaisPorDia + ' hora'}}</strong>  por dia,
            o <strong>máximo do total de tempo</strong> das tarefas escolhidas pode ser de até <strong>{{this.horasTotaisLimite}}</strong> horas para esta sprint.
            </p>
        <div class="row  justify-between">
        <div class="col-6">
            <div class="q-pa-lg " style="max-width: 100%">
            
                <q-form
                @submit="onSubmit"
                class="q-gutter-md"
                >
                <div class="row q-ma-md">
                    <q-list bordered padding>
                        <q-item-label header class="text-center text-dark">Escolha as Tarefas</q-item-label>

                        <q-separator spaced />
                        <q-item-label header class="text-red-5 text-center">TAREFAS COM PRIORIDADE ALTA</q-item-label>
                        <p v-if="this.listaTarefasPrioridadeAlta.length === 0" class="text-center text-grey-8">
                            Não existe tarefas com essa prioridade ...
                        </p>
                        <q-item tag="label" v-ripple v-for="item in this.listaTarefasPrioridadeAlta" :key="item.id">
                            <q-item-section side top>
                            <q-btn outline flat color="positive" @click=" this.listaTarefasEscolhidas.push(item); this.listaTarefasPrioridadeAlta.pop(item)">
                            <q-icon name="add_circle_outline"></q-icon>
                            </q-btn>
                            </q-item-section>

                            <q-item-section >
                            <q-item-label>{{item.requisito}}</q-item-label>
                            <q-item-label caption>
                                <strong>Estimativa: </strong>{{item.estimativa}}
                            </q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-separator spaced />
                        <q-item-label header class="text-yellow-9 text-center">TAREFAS COM PRIORIDADE MÉDIA</q-item-label>
                        <p v-if="this.listaTarefasPrioridadeMedia.length === 0" class="text-center text-grey-8">
                            Não existe tarefas com essa prioridade ...
                        </p>
                        <q-item tag="label" v-ripple  v-for="item in this.listaTarefasPrioridadeMedia" :key="item.id">
                        <q-item-section side top>
                                <q-btn outline flat color="positive" @click=" this.listaTarefasEscolhidas.push(item); this.listaTarefasPrioridadeMedia.pop(item)">
                                    <q-icon name="add_circle_outline"></q-icon>
                                </q-btn>
                            </q-item-section>

                        <q-item-section>
                            <q-item-label>{{item.requisito}}</q-item-label>
                            <q-item-label caption  >
                                <strong>Estimativa: </strong>{{item.estimativa}}
                            </q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-separator spaced />
                        <q-item-label header class="text-blue-grey-7 text-center">TAREFAS COM PRIORIDADE BAIXA</q-item-label>
                        <p v-if="this.listaTarefasPrioridadeBaixa.length === 0" class="text-center text-grey-8">
                            Não existe tarefas com essa prioridade ...
                        </p>
                        <q-item tag="label" v-ripple v-for="item in this.listaTarefasPrioridadeBaixa" :key="item.id">
                            <q-item-section side top>
                                <q-btn outline flat color="positive" @click=" this.listaTarefasEscolhidas.push(item); this.listaTarefasPrioridadeBaixa.pop(item); disabled">
                                    <q-icon name="add_circle_outline"></q-icon>
                                </q-btn>
                            </q-item-section>

                            <q-item-section>
                            <q-item-label>{{item.requisito}}</q-item-label>
                            <q-item-label caption >
                                <strong>Estimativa: </strong>{{item.estimativa}}
                            </q-item-label>
                            </q-item-section>
                        </q-item>

                    </q-list>
                </div>


                </q-form>

            </div>
        </div>

        <div class="col-6 ">
            <div class="q-pa-lg " >
                <q-form
                @submit="onSubmit"
                class="q-gutter-md"
                >
            <div class="row q-ma-md  ">
                <q-list bordered padding>
                    <q-item-label header class="text-center text-dark">Tarefas Escolhidas</q-item-label>

                    <q-separator spaced />
                        <p v-if="this.listaTarefasEscolhidas.length === 0" class="text-center text-grey-8 bg-grey-2">
                        Nenhuma tarefa escolhida ainda...
                    </p>
                    <q-item tag="label" v-ripple v-for="item in this.listaTarefasEscolhidas" :key="item.id">
                        <q-item-section side top>
                            <q-btn color="negative" outline flat @click=" this.listaTarefasEscolhidas.pop(item); this.backItemForYoursList(item)">
                            <q-icon name="highlight_off"></q-icon>
                            </q-btn>
                        </q-item-section>
                        <q-item-section>
                        <q-item-label>{{item.requisito}}</q-item-label>
                        <q-item-label caption>
                            <strong>Estimativa: </strong>{{item.estimativa}}
                            
                        </q-item-label>
                        <q-item-label caption>
                        <strong>Prioridade: </strong>
                            <q-badge color="red-7" rounded  :label="item.prioridade.toUpperCase()" v-if="item.prioridade === 'alta' "/>
                            <q-badge color="lime-7" rounded  :label="item.prioridade.toUpperCase()" v-if="item.prioridade === 'media' "/>
                            <q-badge color="brown-5" rounded  :label="item.prioridade.toUpperCase()" v-if="item.prioridade === 'baixa' "/>
                        </q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-separator spaced />
                    <q-item tag="label"> 
                    <strong>Total de tempo: </strong> {{somaHoras()}}
                    </q-item>
                </q-list>
            </div>


                </q-form>

            </div>      
        
        </div>
        </div>

            

            <q-stepper-navigation>
            <q-btn @click="() => { done2 = true; step = 3 }" color="deep-orange-8" label="Continuar" />
            <q-btn flat @click="step = 1" color="deep-orange-8" label="Voltar" class="q-ml-sm" />
            </q-stepper-navigation>
        </q-step>

        <q-step
            :name="3"
            title="Confirmar a Sprint"
            icon="check_circle_outline"
            :done="done3"
        >
        <h5 class="text-title2 text-center">Confirme os dados e salve a Sprint</h5>

            <p class="q-mb-md text-center text-body2 text-weight-light text-grey-7"  > 
            Confira todas Informações passadas nos passos anteriores e salve apentando no botão "Salvar e Finalizar" localizado abaixo, 
            para então iniciar sua Sprint!
        
            </p>
        <div class="row justify-between">
            <div class="col">
            <div  style="max-width: 450px">
                <h5 class="text-title text-center">Informações da Sprint</h5>
                <p> <strong>Data Início:</strong> {{this.sprint.dataInicio}} </p> 
                <p> <strong>Data Fim:</strong>  {{this.sprint.dataFim}} </p>
                <p style="max-width: 350px"> <strong>Objetivo: </strong> {{this.sprint.objetivo}} </p>
            </div>
            </div>
            <div class="col-4">
                    <div style="max-width: 350px">
                    <h5 class="text-title text-center">Tarefas da Sprint</h5>
                        <q-expansion-item
                        class="shadow-1 overflow-hidden"
                        style="border-radius: 30px"
                        icon="task"
                        label="Tarefas escolhidas"
                        header-class="bg-deep-purple text-white"
                        expand-icon-class="text-white"
                        >
                        <q-card>
                            <q-card-section>
                            <q-list padding>
                                    <p v-if="this.listaTarefasEscolhidas.length === 0" class="text-center text-red-8 bg-grey-1">
                                    Nenhuma tarefa escolhida ainda... Volte ao passo anterior e escolhas as tarefas
                                    </p>
                                    <q-item tag="label" v-ripple v-for="item in this.listaTarefasEscolhidas" :key="item.this.idUsuario">
                                        <q-item-section>
                                        <q-item-label>{{item.requisito}}</q-item-label>
                                        <q-item-label caption>
                                            <strong>Estimativa: </strong>{{item.estimativa}}
                                            
                                        </q-item-label>
                                        <q-item-label caption>
                                        <strong>Prioridade: </strong>
                                            <q-badge color="red-7" rounded  :label="item.prioridade.toUpperCase()" v-if="item.prioridade === 'alta' "/>
                                            <q-badge color="lime-7" rounded  :label="item.prioridade.toUpperCase()" v-if="item.prioridade === 'media' "/>
                                            <q-badge color="brown-5" rounded  :label="item.prioridade.toUpperCase()" v-if="item.prioridade === 'baixa' "/>
                                        </q-item-label>
                                        </q-item-section>
                                    </q-item>
                                </q-list>
                            </q-card-section>
                        </q-card>
                        </q-expansion-item>
                    </div>
            </div>
        </div>  
            <q-stepper-navigation>
            <q-btn color="deep-orange-8" @click="done3 = true;  this.save()" type="submit" label="Salvar e Finalizar" />
            <q-btn flat @click="step = 2" color="deep-orange-8" label="Voltar" class="q-ml-sm" />
            </q-stepper-navigation>
        </q-step>
        </q-stepper>
    </div>

    <div class="q-pa-md justify-center" v-if="this.sprint !== null">
        <div class="q-pa-lg row q-gutter-md">
            <q-card class="my-card">
            <q-card-section class="bg-deep-orange-8 text-white">
                <div class="text-h4 text-center"> 
                    Informações da Sprint
                </div>
            </q-card-section>
            <q-card-section>
                <div class="row justify-between">
                <div class="col-8">
                <div  style="max-width: 450px">
                    <p> <strong>ID Sprint:</strong> {{this.sprint.id}} </p>
                    <p> <strong>Data Início:</strong> {{this.sprint.dataInicio}} </p> 
                    <p> <strong>Data Fim:</strong>  {{this.sprint.dataFim}} </p>
                    <p style="max-width: 350px"> <strong>Objetivo: </strong> {{this.sprint.objetivo}} </p>
                </div>
                </div>
                    <div class="col-4">
                            <div style="max-width: 350px">
                                <q-expansion-item
                                class="shadow-1 overflow-hidden"
                                style="border-radius: 30px"
                                icon="task"
                                label="Tarefas escolhidas"
                                header-class="bg-deep-purple text-white"
                                expand-icon-class="text-white"
                                >
                                <q-card>
                                    <q-card-section>
                                    <q-list padding>
                                            <p v-if="this.listaTarefasEscolhidas.length === 0" class="text-center text-red-8 bg-grey-1">
                                            Nenhuma tarefa escolhida ainda... Volte ao passo anterior e escolhas as tarefas
                                            </p>
                                            <q-item tag="label" v-ripple v-for="item in this.listaTarefasEscolhidas" :key="item.id">
                                                <q-item-section>
                                                <q-item-label>{{item.requisito}}</q-item-label>
                                                <q-item-label caption>
                                                    <strong>Estimativa: </strong>{{item.estimativa}}
                                                    
                                                </q-item-label>
                                                <q-item-label caption>
                                                <strong>Prioridade: </strong>
                                                    <q-badge color="red-7" rounded  :label="item.prioridade.toUpperCase()" v-if="item.prioridade === 'alta' "/>
                                                    <q-badge color="lime-7" rounded  :label="item.prioridade.toUpperCase()" v-if="item.prioridade === 'media' "/>
                                                    <q-badge color="brown-5" rounded  :label="item.prioridade.toUpperCase()" v-if="item.prioridade === 'baixa' "/>
                                                </q-item-label>
                                                </q-item-section>
                                            </q-item>
                                        </q-list>
                                    </q-card-section>
                                </q-card>
                                </q-expansion-item>
                            </div>
                    </div>
                </div>  
            <q-separator class="q-ma-md" color="orange"  />
            <q-section>
                <p class="  text-center"> <strong>Informações extras</strong></p>
                <p>Faltam <strong>{{  this.checkCountTimeForDoneSprint() }}</strong> dias para terminar a sprint.</p>
                <p>Resta <strong>{{ this.checkCountTarefasIsPendente() }}</strong> {{this.checkCountTarefasIsPendente() !== 1 ? 'tarefas a serem finalizadas.' : 'tarefa para ser finalizada.'}}</p>
                <h1>{{ this.checkNowIsDateEnd() }}</h1>
               <div class="text-right" v-if="this.checkCountTarefasIsPendente() === 0 && ( this.checkNowIsDateEnd() === true)">
                    <q-btn 
                        icon="check"
                        rounded
                        color="positive" 
                        label="Concluir Sprint" 
                    />
               </div>
            </q-section>
            </q-card-section>
            </q-card>
        </div>
    
    </div>
     

    </q-page-container>

    <Menu/>
    <Footer/>

  </q-layout>  
</template>

<script>
import Menu from '@/components/Menu/index.vue';
import Footer from '@/components/Footer/index.vue';
import { ref } from 'vue'
import TccBacklogDataService from '../../services/tccBacklogDataService';
import SprintDataService from  '../../services/sprintDataService';
import ItensTccSprintDataService from '../../services/itensTccSprintDataService';
import moment from 'moment';
import draggable from "vuedraggable";
import usuarioDataService from '../../services/usuarioDataService';
import { date } from 'quasar';

export default {
  name: 'CriarSprint',
  components: {
    Menu,
    Footer,
    draggable
  },
  mounted(){
    this.verifyExistsSprintAtiva(),
    this.getAllPrioridadeAlta(),
    this.getAllPrioridadeMedia(),
    this.getAllPrioridadeBaixa()
    
  },
     data() {
    return { 
        listaTarefasEscolhidas: [],
        listaTarefasPrioridadeAlta: [],
        listaTarefasPrioridadeMedia: [],
        listaTarefasPrioridadeBaixa: [],
        allTarefasByUsuario: [],
        horasTotaisPorDia: 0,
        horasTotaisLimite: 0,
        idUsuario: 0,
        idSprintForSearch: 0,

        sprint: {
            dataInicio: "",
            dataFim: "",
            objetivo: ""
        },

        itensTccSprint: {
            id_sprint: "",
            id_item_tcc_backlog: "",
            concluido: false,
        },
    }    
  },
  methods: {
        save() {
        let dataSprint = {
        dataInicio: this.sprint.dataInicio,
        dataFim: this.sprint.dataFim,
        objetivo: this.sprint.objetivo,
        };
        
        SprintDataService.create(dataSprint)
        .then(response => {
            this.sprint.id = response.data.id;
            this.sprint = response.data;

             for (const item in this.listaTarefasEscolhidas) {
            let dataItensTccSprint = {
                id_sprint: this.sprint.id,
                id_item_tcc_backlog: this.listaTarefasEscolhidas[item].id,
                concluido: false
            };
            ItensTccSprintDataService.create(dataItensTccSprint)
            .then(response => {
                this.itensTccSprint.id = response.dataItensTccSprint.id;
                this.itensTccSprint = dataItensTccSprint;
            })
            .catch(e => {
                console.log(e);
            });
        }
        })
        .catch(e => {
            console.log(e);
        });
       
      
    },
    getAllPrioridadeAlta() {
        TccBacklogDataService.getAllPrioridadeAlta(this.idUsuario).then( response => {
            this.listaTarefasPrioridadeAlta = response.data;
        })
        },
    getAllPrioridadeMedia() {
        TccBacklogDataService.getAllPrioridadeMedia(this.idUsuario).then( response => {
            this.listaTarefasPrioridadeMedia = response.data;
    })
        },
    getAllPrioridadeBaixa () {
        TccBacklogDataService.getAllPrioridadeBaixa(this.idUsuario).then( response => {
            this.listaTarefasPrioridadeBaixa = response.data;
            return this.listaTarefasPrioridadeBaixa.filter(e => e.status === 'pendente');
        })
    },
    getAllStatusPendente() {
       TccBacklogDataService.getAllStatusPendente(this.idUsuario).then( response => {  
        this.listaTarefasPendentes = response.data;
      })
      
    },
    somaHoras () {
    let soma = moment.duration(0, 'hours')
    this.listaTarefasEscolhidas.forEach(element => {
        const total = moment.duration(element.estimativa)
        soma.add(total)
    });

     return `${ soma.hours() === 1 ? soma.hours() + ' hora' : soma.hours() + ' horas'} e ${ soma.minutes()} minutos`
    },
    backItemForYoursList(item) {
        if (item.prioridade === 'alta'){
           return this.listaTarefasPrioridadeAlta.push(item);
        } 
        if (item.prioridade === 'media') {
           return this.listaTarefasPrioridadeMedia.push(item)
        } 
        if (item.prioridade === 'baixa') {
           return this.listaTarefasPrioridadeBaixa.push(item)
        }
    },
    addDataFim() {
        let datetime = moment( this.sprint.dataInicio)
        let addDate =  moment(datetime.add(15,'days'))
       return this.sprint.dataFim = addDate.format('YYYY-MM-DD')
    },
    calcularLimiteHorasTotais() {
       return this.horasTotaisLimite = this.horasTotaisPorDia*15;
    },
    async verifyExistsSprintAtiva()  {
        await usuarioDataService.getAllByUsuario(this.idUsuario).then(response => {
            for (const i in response.data[0].tccBacklogs) {
                if (response.data[0].tccBacklogs[i].itensTccSprints[i].concluido === false) {
                    if(response.data[0].tccBacklogs[i].itensTccSprints[i].id_item_tcc_backlog === response.data[0].tccBacklogs[i].id) {
                        this.listaTarefasEscolhidas = [];
                        this.listaTarefasEscolhidas.push(response.data[0].tccBacklogs[i])
                    }
                    return this.idSprintForSearch =  response.data[0].tccBacklogs[i].itensTccSprints[i].id_sprint;
                }
               
            }
        });
        if (this.idSprintForSearch !== null) {
        SprintDataService.get(this.idSprintForSearch).then(response => {
            this.sprint.id = response.data.id;
            this.sprint.dataInicio = moment(response.data.dataInicio).format("DD/MM/YYYY");
            this.sprint.dataFim = moment(response.data.dataFim).format("DD/MM/YYYY"); 
            this.sprint.objetivo = response.data.objetivo;
        })
        } else {
            this.sprint = {}
        }
    },
    checkCountTimeForDoneSprint() {
       let datetime = moment(new Date(this.sprint.dataFim))
       let now = moment() 
       let duration = now.diff(datetime, 'days')
       return datetime 
    },
    checkCountTarefasIsPendente() {
        return this.listaTarefasEscolhidas.filter(item => item.status === 'pendente').length;
    },
    checkNowIsDateEnd() {
        let dateEnd = new Date(this.sprint.dataFim)
        let now = new Date()
        dateEnd.setHours(0,0,0,0)
         now.setHours(0,0,0,0) 
        return  dateEnd.toLocaleString() === now.toLocaleString()
    }
  },
   setup () {
    const step = ref(1)
    const done1 = ref(false)
    const done2 = ref(false)
    const done3 = ref(false)

    return {
      check: ref(false), 
      step,
      done1,
      done2,
      done3,
    } 
   },
 
}
</script>
