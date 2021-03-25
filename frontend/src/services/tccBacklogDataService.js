import http from "../http-common";

class TccBacklogDataService {
    getAll() {
      return http.get("/tccBacklog");
    }
  
    get(id) {
      return http.get(`/tccBacklog/${id}`);
    }
  
    create(data) {
      return http.post("/tccBacklog", data);
    }
  
    update(id, data) {
      return http.put(`/tccBacklog/${id}`, data);
    }
  
    delete(id) {
      return http.delete(`/tccBacklog/${id}`);
    }

    getAllPrioridadeAlta() {
      return http.get("/tccBacklog/filter/prioridade-alta");
    }

    getAllPrioridadeMedia() {
      return http.get("/tccBacklog/filter/prioridade-media");
    }

    getAllPrioridadeBaixa() {
      return http.get("/tccBacklog/filter/prioridade-baixa");
    }

    getAllStatusPendente() {
      return http.get("/tccBacklog/filter/status-pendente");
    }

    getAllStatusFazendo() {
      return http.get("/tccBacklog/filter/status-fazendo");
    }

    getAllStatusFinalizado() {
      return http.get("/tccBacklog/filter/status-finalizado");
    }
}

export default new TccBacklogDataService();
