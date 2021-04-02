import http from "../http-common";

class UsuarioDataService {
   
    getAllByUsuario(id) {
        return http.get(`/usuario/allBy/${id}`); 
      }
   
   
}

export default new UsuarioDataService();
