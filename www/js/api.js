import { Http } from '@capacitor-community/http';

export async function autenticar(usuario, senha) {
  const response = await Http.request({
    method: 'POST',
    url: 'https://inteligenciatitan.com.br/api/autenticacao',
    headers: { 'Content-Type': 'application/json' },
    data: { usuario, senha }
  });

  return response.data;
}
