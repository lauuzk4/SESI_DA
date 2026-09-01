// ===== Jogo da Velha =====

// Pega os campos de nome dos jogadores
const inputJogador1 = document.getElementById('jogador1');
const inputJogador2 = document.getElementById('jogador2');

// Pega todos os botões dos quadrados, na ordem 1 a 9
const quadrados = [
    document.querySelector('#quadrado01 button'),
    document.querySelector('#quadrado02 button'),
    document.querySelector('#quadrado03 button'),
    document.querySelector('#quadrado04 button'),
    document.querySelector('#quadrado05 button'),
    document.querySelector('#quadrado06 button'),
    document.querySelector('#quadrado07 button'),
    document.querySelector('#quadrado08 button'),
    document.querySelector('#quadrado09 button'),
];

// Estado do tabuleiro: array com 9 posições (null = vazio, 'X' ou 'O')
let tabuleiro = Array(9).fill(null);

// Controle de turno: true = vez do jogador 1 (X), false = vez do jogador 2 (O)
let vezDoJogador1 = true;

// Se o jogo já acabou (vitória ou empate), trava novas jogadas
let jogoTerminado = false;

// Todas as combinações possíveis de vitória (índices do array tabuleiro)
const combinacoesVitoria = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // colunas
    [0, 4, 8], [2, 4, 6]             // diagonais
];

// Retorna o nome do jogador atual (ou um nome padrão se o campo estiver vazio)
function nomeJogadorAtual() {
    if (vezDoJogador1) {
        return inputJogador1.value.trim() || 'Jogador 1';
    }
    return inputJogador2.value.trim() || 'Jogador 2';
}

// Adiciona o clique em cada botão
quadrados.forEach((botao, indice) => {
    botao.addEventListener('click', () => jogar(indice, botao));
});

function jogar(indice, botao) {
    // Ignora clique se o jogo acabou ou a casa já está ocupada
    if (jogoTerminado || tabuleiro[indice] !== null) {
        return;
    }

    const simbolo = vezDoJogador1 ? 'X' : 'O';

    tabuleiro[indice] = simbolo;
    botao.textContent = simbolo;
    botao.disabled = true;

    const vencedor = verificarVencedor();

    if (vencedor) {
        jogoTerminado = true;
        alert(`${nomeJogadorAtual()} venceu com ${simbolo}! 🎉`);
        return;
    }

    if (tabuleiro.every(casa => casa !== null)) {
        jogoTerminado = true;
        alert('Empate! 🤝');
        return;
    }

    // Passa a vez
    vezDoJogador1 = !vezDoJogador1;
}

function verificarVencedor() {
    return combinacoesVitoria.some(([a, b, c]) => {
        return tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c];
    });
}

function reiniciarJogo() {
    tabuleiro = Array(9).fill(null);
    vezDoJogador1 = true;
    jogoTerminado = false;

    quadrados.forEach((botao, indice) => {
        botao.textContent = indice + 1;
        botao.disabled = false;
    });
}