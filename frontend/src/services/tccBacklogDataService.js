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

    getAllPrioridadeAlta(id) {
      return http.get(`/tccBacklog/usuario/${id}/filter/prioridade-alta`);
    }

    getAllPrioridadeMedia(id) {
      return http.get(`/tccBacklog/usuario/${id}/filter/prioridade-media`);
    }

    getAllPrioridadeBaixa(id) {
      return http.get(`/tccBacklog/usuario/${id}/filter/prioridade-baixa`);
    }

    getAllStatusPendente(id) {
      return http.get(`/tccBacklog/usuario/${id}/filter/status-pendente`);
    }

    getAllStatusFazendo(id) {
      return http.get(`/tccBacklog/usuario/${id}/filter/status-fazendo`);
    }

    getAllStatusFinalizado(id) {
      return http.get(`/tccBacklog/usuario/${id}/filter/status-finalizado`);
    }
}

export default new TccBacklogDataService();
