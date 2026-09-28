
const campoNomeHabito = document.getElementsByClassName('campoNomeHabito')[0];
const campoDia = document.getElementsByClassName('campoDia')[0];
const campoMes = document.getElementsByClassName('campoMes')[0];
const campoAno = document.getElementsByClassName('campoAno')[0];
const listaHabitos = document.getElementsByClassName('listaHabitos')[0];
const avisoListaVazia = document.getElementsByClassName('avisoListaVazia')[0];
const mensagem = document.getElementsByClassName('mensagem')[0];
const quantidadeTotal = document.getElementsByClassName('quantidadeTotal')[0];
const quantidadeConcluidos = document.getElementsByClassName('quantidadeConcluidos')[0];


const NOMES_MESES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];


let nomes = [];
let datas = [];
let feitos = [];   // s é concluido e n é nao concluido

const nomesSalvos = localStorage.getItem('nomes');

if (nomesSalvos !== null && nomesSalvos !== '') {
  nomes = nomesSalvos.split('|');
  datas = localStorage.getItem('datas').split('|');
  feitos = localStorage.getItem('feitos').split('|');
}




function salvar() {
  localStorage.setItem('nomes', nomes.join('|'));//join junta tudo em um texto
  localStorage.setItem('datas', datas.join('|'));
  localStorage.setItem('feitos', feitos.join('|'));
}

function mostrar() {
  let html = '';
  let concluidos = 0;
  let i = 0;

  while (i < nomes.length) {
    let marcado = '';

    if (feitos[i] === 's') {
      marcado = 'checked';
      concluidos = concluidos + 1;
    }

    html = html + '<li>' +
      '<input type="checkbox" ' + marcado + ' onclick="alternar(' + i + ')">' +
      '<p>' + nomes[i] + '</p>' +
      '<small>' + datas[i] + '</small>' +
      '<button onclick="excluir(' + i + ')">🗑️</button>' +
      '</li>';

    i = i + 1;
  }

  listaHabitos.innerHTML = html;
  quantidadeTotal.innerText = nomes.length;
  quantidadeConcluidos.innerText = concluidos;

  if (nomes.length === 0) {
    avisoListaVazia.style.display = 'block';
  } else {
    avisoListaVazia.style.display = 'none';
  }
}

function adicionar() {
  const nome = campoNomeHabito.value.trim();
  const dia = campoDia.value;
  const ano = campoAno.value;
  let mes = campoMes.value.trim().toLowerCase();

  if (mes === 'marco') {
    mes = 'março';
  }

  let mesCerto = '';
  let i = 0;

  while (i < NOMES_MESES.length) {
    if (NOMES_MESES[i].toLowerCase() === mes) {
      mesCerto = NOMES_MESES[i];
    }
    i = i + 1;
  }

  if (nome === '') {
    mensagem.innerText = 'Digite um hábito.';
  } else if (dia < 1 || dia > 31) {
    mensagem.innerText = 'O dia deve estar entre 1 e 31.';
  } else if (mesCerto === '') {
    mensagem.innerText = 'Digite um mês válido (ex: Janeiro).';
  } else if (ano < 1900 || ano > 2100) {
    mensagem.innerText = 'O ano deve estar entre 1900 e 2100.';
  } else {
    nomes.push(nome);
    datas.push(dia + ' de ' + mesCerto + ' de ' + ano);
    feitos.push('n');

    campoNomeHabito.value = '';
    campoDia.value = '';
    campoMes.value = '';
    campoAno.value = '';
    mensagem.innerText = 'Hábito adicionado!';

    salvar();
    mostrar();
  }
}

function alternar(i) {
  if (feitos[i] === 's') {
    feitos[i] = 'n';
  } else {
    feitos[i] = 's';
  }

  salvar();
  mostrar();
}

function excluir(i) {
  nomes.splice(i, 1);
  datas.splice(i, 1);
  feitos.splice(i, 1);

  mensagem.innerText = 'Hábito excluído.';
  salvar();
  mostrar();
}
function limparConcluidos() {
  let removidos = 0;
  let i = 0;

  while (i < nomes.length) {
    if (feitos[i] === 's') {
      nomes.splice(i, 1);
      datas.splice(i, 1);
      feitos.splice(i, 1);
      removidos = removidos + 1;
    } else {
      i = i + 1;
    }
  }

  if (removidos === 0) {
    mensagem.innerText = 'Não há hábitos concluídos.';
  } else {
    mensagem.innerText = 'Concluídos removidos!';
  }

  salvar();
  mostrar();
}

mostrar();
