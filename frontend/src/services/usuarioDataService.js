import http from "../http-common";
import router from '@/router/index'

class UsuarioDataService {
   
    getAllByUsuario(id) {
        return http.get(`/usuario/allBy/${id}`); 
      }

    signUp(data){
      return http.post('/auth/signup', data)
    }
    signIn(data){
      return http.post(`/auth/signin`, data, {headers:{"Content-Type" : "application/json"}})
    }
   
  logout() {
    localStorage.removeItem('usuario');
    router.push('/login');
  }
}

export default new UsuarioDataService();
