const formularioHabito = document.getElementsByClassName('formularioHabito')[0];
const campoNomeHabito = document.getElementsByClassName('campoNomeHabito')[0];
const campoDia = document.getElementsByClassName('campoDia')[0];
const campoMes = document.getElementsByClassName('campoMes')[0];
const campoAno = document.getElementsByClassName('campoAno')[0];
const listaHabitos = document.getElementsByClassName('listaHabitos')[0];
const avisoListaVazia = document.getElementsByClassName('avisoListaVazia')[0];
const quantidadeTotalEl = document.getElementById('quantidadeTotal');
const quantidadeConcluidosEl = document.getElementById('quantidadeConcluidos');
const botaoLimparConcluidos = document.getElementsByClassName('botaoLimparConcluidos')[0];

const CHAVE_STORAGE = 'controleHabitos';


let habitos = [];

const NOMES_MESES = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
];

function removerAcentos(texto) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}


function validarData(dia, mesTexto, ano) {
  dia = parseInt(dia, 10);
  ano = parseInt(ano, 10);
  const mesDigitado = removerAcentos(mesTexto.trim().toLowerCase());

  let mesEncontrado = null;

  for (let i = 0; i < NOMES_MESES.length; i++) {
    if (removerAcentos(NOMES_MESES[i]) === mesDigitado) {
      mesEncontrado = NOMES_MESES[i];
      break;
    }
  }

  if (isNaN(dia) || isNaN(ano)) {
    alert('Preencha dia e ano corretamente.');
    return null;
  } else if (dia < 1 || dia > 31) {
    alert('O dia deve estar entre 1 e 31.');
    return null;
  } else if (mesEncontrado === null) {
    alert('Digite o nome de um mês válido (ex: Janeiro).');
    return null;
  } else if (ano < 1900 || ano > 2100) {
    alert('Digite um ano válido.');
    return null;
  }

  const mesCapitalizado = mesEncontrado.charAt(0).toUpperCase() + mesEncontrado.slice(1);

  return dia + ' de ' + mesCapitalizado + ' de ' + ano;
}


function gerarId() {
  let id = 1;

  while (habitos.some(h => h.id === id)) {
    id++;
  }

  return id;
}

function carregarHabitos() {
  const dadosSalvos = localStorage.getItem(CHAVE_STORAGE);

  if (dadosSalvos) {
    habitos = JSON.parse(dadosSalvos);
  } else {
    habitos = [];
  }
}

function salvarHabitos() {
  localStorage.setItem(CHAVE_STORAGE, JSON.stringify(habitos));
}

function adicionarHabito(texto, dia, mes, ano) {
  const textoLimpo = texto.trim();

  if (textoLimpo === '') {
    alert('Digite um hábito válido antes de adicionar.');
    return;
  }

  const dataFormatada = validarData(dia, mes, ano);

  if (dataFormatada === null) {
    return;
  }

  const novoHabito = {
    id: gerarId(),
    texto: textoLimpo,
    data: dataFormatada,
    concluido: false
  };

  habitos.push(novoHabito);
  salvarHabitos();
  renderizarHabitos();
}

function alternarHabito(id) {
  for (let i = 0; i < habitos.length; i++) {
    if (habitos[i].id === id) {
      habitos[i].concluido = !habitos[i].concluido;
      break;
    }
  }

  salvarHabitos();
  renderizarHabitos();
}

function excluirHabito(id) {
  habitos = habitos.filter(h => h.id !== id);
  salvarHabitos();
  renderizarHabitos();
}

function limparConcluidos() {
  const existeConcluido = habitos.some(h => h.concluido);

  if (!existeConcluido) {
    alert('Não há hábitos concluídos para limpar.');
    return;
  }

  habitos = habitos.filter(h => !h.concluido);
  salvarHabitos();
  renderizarHabitos();
}

function atualizarResumo() {
  const total = habitos.length;
  let concluidos = 0;

  habitos.forEach(h => {
    if (h.concluido) {
      concluidos++;
    }
  });

  quantidadeTotalEl.textContent = total;
  quantidadeConcluidosEl.textContent = concluidos;
}

function criarElementoHabito(habito) {
  const li = document.createElement('li');
  li.id = 'habito-' + habito.id;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = habito.concluido;
  checkbox.addEventListener('change', () => alternarHabito(habito.id));

  const paragrafoTexto = document.createElement('p');
  paragrafoTexto.textContent = habito.texto;

  const spanData = document.createElement('small');
  spanData.textContent = habito.data;

  const btnExcluir = document.createElement('button');
  btnExcluir.textContent = '🗑️';
  btnExcluir.title = 'Excluir hábito';
  btnExcluir.addEventListener('click', () => excluirHabito(habito.id));

  li.appendChild(checkbox);
  li.appendChild(paragrafoTexto);
  li.appendChild(spanData);
  li.appendChild(btnExcluir);

  return li;
}

function renderizarHabitos() {
  listaHabitos.innerHTML = '';

  if (habitos.length === 0) {
    avisoListaVazia.style.display = 'block';
  } else {
    avisoListaVazia.style.display = 'none';

    // for tradicional para percorrer a lista de hábitos
    for (let i = 0; i < habitos.length; i++) {
      const elemento = criarElementoHabito(habitos[i]);
      listaHabitos.appendChild(elemento);
    }
  }

  atualizarResumo();
}



formularioHabito.addEventListener('submit', (evento) => {
  evento.preventDefault();
  adicionarHabito(campoNomeHabito.value, campoDia.value, campoMes.value, campoAno.value);
  campoNomeHabito.value = '';
  campoDia.value = '';
  campoMes.value = '';
  campoAno.value = '';
  campoNomeHabito.focus();
});

botaoLimparConcluidos.addEventListener('click', limparConcluidos);

// ===== Inicialização =====
carregarHabitos();
renderizarHabitos();
