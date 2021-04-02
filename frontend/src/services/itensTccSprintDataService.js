import http from "../http-common";

class ItensTccSprintDataService {
    getAll() {
      return http.get("/itensTccSprint");
    }
  
    get(id) {
      return http.get(`/itensTccSprint/${id}`);
    }
  
    create(data) {
      return http.post("/itensTccSprint", data);
    }
  
    update(id, data) {
      return http.put(`/itensTccSprint/${id}`, data);
    }
  
    delete(id) {
      return http.delete(`/itensTccSprint/${id}`);
    }

}

export default new ItensTccSprintDataService();
