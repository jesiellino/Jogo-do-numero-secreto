let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirNaTela(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
  exibirNaTela('h1', 'Jogo do número secreto');
  exibirNaTela('p', 'Tente adivinhar o número secreto entre 1 e 10');
}

exibirMensagemInicial();

function verificarChute() {
  let chute = parseInt(document.querySelector('input').value);

  if (chute === numeroSecreto) {
    exibirNaTela('h1', 'Parabéns, você acertou!');
    let palavraTentativas = tentativas > 1 ? ' tentativas' : ' tentativa';
    let mensagemTentativas = 'Você precisou de ' + tentativas + palavraTentativas;
    exibirNaTela('p', 'O número secreto era ' + numeroSecreto + '. ' + mensagemTentativas);
    document.getElementById('reiniciar').removeAttribute('disabled');
  } else if (chute > numeroSecreto) {
    exibirNaTela('h1', 'Errou! O número secreto é menor.');
  } else {
    exibirNaTela('h1', 'Errou! O número secreto é maior.');
  } 
  tentativas++;
  limparCampo();
}

function gerarNumeroAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
  let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

  if (quantidadeDeElementosNaLista == numeroLimite) {
    listaDeNumerosSorteados = [];
}
  if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
  } else {
    listaDeNumerosSorteados.push(numeroEscolhido);
    console.log(listaDeNumerosSorteados);
    return numeroEscolhido;
  }
}

function limparCampo() {
  let chute = document.querySelector('input');
  chute.value = '';
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  limparCampo();
  tentativas = 1;
  exibirMensagemInicial();
  document.getElementById('reiniciar').setAttribute('disabled', true);
}
