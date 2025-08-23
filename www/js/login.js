import { Http } from '@capacitor/http';

const login = async () => {
  const usuario = document.getElementById('usuario').value;
  const senha = document.getElementById('senha').value;

  try {
    const response = await Http.request({
      method: 'POST',
      url: 'https://inteligenciatitan.com.br/api/autenticacao',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        usuario,
        senha
      }
    });

    if (response.status === 200) {
      console.log('Login bem-sucedido:', response.data);
      // aqui você pode redirecionar para outra página ou salvar token
    } else {
      console.warn('Falha no login:', response.status, response.data);
      alert('Falha no login: ' + response.data.message || 'Erro desconhecido');
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    alert('Erro na requisição: ' + error.message);
  }
};

document.getElementById('btnLogin').addEventListener('click', login);
