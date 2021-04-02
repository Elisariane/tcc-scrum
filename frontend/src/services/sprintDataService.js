import http from "../http-common";

class SprintDataService {
    getAll() {
      return http.get("/sprint");
    }
  
    get(id) {
      return http.get(`/sprint/${id}`);
    }
  
    create(data) {
      return http.post("/sprint", data);
    }
  
    update(id, data) {
      return http.put(`/sprint/${id}`, data);
    }
  
    delete(id) {
      return http.delete(`/sprint/${id}`);
    }

}

export default new SprintDataService();
