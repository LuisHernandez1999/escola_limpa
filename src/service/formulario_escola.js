import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/';

export const criarEscola = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}api/escolas/criar/`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return { sucesso: true, dados: response.data };
  } catch (erro) {
    if (erro.response && erro.response.data) {
      return { sucesso: false, erro: erro.response.data };
    }
    return { sucesso: false, erro: 'Erro ao conectar com o servidor.' };
  }
};




export const criarColeta = async (data) => {
  if (!data.escola) {
    return { erro: "campo 'escola' obrigatório." };
  }

  let dataConvertida = null;
  if (typeof data.data === 'string') {
    const regexData = /^\d{4}-\d{2}-\d{2}$/;
    if (!regexData.test(data.data)) {
      return { erro: `data '${data.data}' invalida, use o formato YYYY-MM-DD` };
    }
    dataConvertida = data.data;
  } else {
    return { erro: `campo 'data' inválido ou ausente.` };
  }


  const parseHorario = (horario) => {
    if (typeof horario === 'string') {
      const regexHorario = /^\d{2}:\d{2}$/;
      if (regexHorario.test(horario)) {
        return horario;
      }
    }
    return null;
  };

  const horarioChegada = parseHorario(data.horario_chegada);
  const horarioSaida = parseHorario(data.horario_saida);


  const intFields = [
    "bag_plastico", "bag_papel", "bag_aluminio", "bag_eletronico",
    "bag_vazio", "bag_semi_cheio", "bag_cheio"
  ];

  intFields.forEach(field => {
    data[field] = parseInt(data[field]) || 0;
  });


  const payload = {
    prefixo_caminhao: data.prefixo_caminhao || '',
    data: dataConvertida,
    bairro: data.bairro || '',
    motorista_nome: data.motorista_nome || '',
    motorista_matricula: data.motorista_matricula || '',
    coletor_nome: data.coletor_nome || '',
    coletor_matricula: data.coletor_matricula || '',
    escola: data.escola, 
    horario_chegada: horarioChegada,
    horario_saida: horarioSaida,
    bag_plastico: data.bag_plastico,
    bag_papel: data.bag_papel,
    bag_aluminio: data.bag_aluminio,
    bag_eletronico: data.bag_eletronico,
    bag_vazio: data.bag_vazio,
    bag_semi_cheio: data.bag_semi_cheio,
    bag_cheio: data.bag_cheio,
    assinatura_responsavel: data.assinatura_responsavel || '',
    telefone_responsavel: data.telefone_responsavel || '',
    cpf_responsavel: data.cpf_responsavel || '',
  };

  try {
    const response = await fetch(`${BASE_URL}api/form/criar_coleta/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const resultado = await response.json();

    if (!response.ok) {
      return { erro: resultado };
    }

    return { sucesso: true, coleta: resultado };
  } catch (error) {
    return { erro: `erro ao enviar requisição: ${error.message}` };
  }
};