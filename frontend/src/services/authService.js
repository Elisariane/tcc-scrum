import axios from 'axios';
import router from '@/router/index'

const API_URL = 'http://localhost:8080/api/auth/';

class AuthService {
  login(usuario) {
    return axios
      .post(API_URL + 'signin', {
        email: usuario.email,
        senha: usuario.senha
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('usuario', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('usuario');
    router.push('/login');
  }

  register(usuario) {
    return axios.post(API_URL + 'signup', {
        nome: usuario.nome,
        email: usuario.email,
        senha: usuario.senha,
        tipoUsuario: usuario.tipoUsuario
    });
  }
}

export default new AuthService();