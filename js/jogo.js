// Selecionando os elementos DOM que representem o Mario, o tubo (pipe), o status de jogo e o corpo da tela
const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const overDiv = document.querySelector(".game-status");
var counterVal = 0;  // Inicializa o valor do contador (pontuação)
var body = document.querySelector(".tela-body");  // Seleciona o corpo do jogo

// Função que faz o Mario pular
function jump(){
    // Adiciona a classe "jump" no elemento Mario para aplicar a animação de pulo
    mario.classList.add("jump");

    // Após 500ms, remove a classe "jump", fazendo o Mario voltar para baixo
    setTimeout(() => {
        mario.classList.remove("jump");
    }, 500);  // A duração do pulo é de 500ms
}

// Loop principal do jogo que checa a colisão entre Mario e o tubo
const loop = setInterval(() => {
    // Posição do tubo no eixo X (esquerda da tela)
    const pipePosition = pipe.offsetLeft;
    // Posição do Mario no eixo Y (distância do fundo da tela)
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    
    // Verifica o tamanho da tela para ajustar a lógica de colisão
    if (document.body.offsetWidth >= 760) {
        // Caso o Mario colida com o tubo
        if (pipePosition <= 100 && pipePosition > 0 && marioPosition < 80) {
            // Para a animação do tubo
            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;

            // Para a animação do Mario e o posiciona corretamente
            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;

            // Muda a imagem do Mario para indicar Game Over
            mario.src = 'images/game-over.png';
            mario.style.width = '65px';  // Ajusta o tamanho do Mario
            mario.style.marginLeft = '35px';  // Ajusta a margem esquerda do Mario

            // Interrompe o loop do jogo
            clearInterval(loop);

            // Chama a função de Game Over
            gameOver();
        } 
        // Atualiza o contador se o Mario passar pelo tubo
        else if (pipePosition <= 40 && pipePosition >= 37 && marioPosition == 140 && marioPosition <= 150) {    
            updateDisplay(++counterVal);  // Incrementa o contador
        }
    } 
    // Caso a tela tenha largura entre 420px e 759px
    else if (document.body.offsetWidth >= 420) {
        if (pipePosition <= 85 && pipePosition > 0 && marioPosition < 50) {
            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;

            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;
            mario.src = 'images/game-over.png';
            mario.style.width = '50px';  // Ajuste de tamanho para telas menores
            mario.style.marginLeft = '35px';

            clearInterval(loop);
            gameOver();
        } 
        // Atualiza o contador
        else if (pipePosition <= 40 && pipePosition >= 37 && marioPosition == 140 && marioPosition <= 150) {    
            updateDisplay(++counterVal);  // Incrementa o contador
        }
    } 
    // Para telas menores que 420px
    else {
        if (pipePosition <= 80 && pipePosition > 0 && marioPosition < 50) {
            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;

            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;
            mario.src = 'images/game-over.png';
            mario.style.width = '50px';
            mario.style.marginLeft = '35px';

            clearInterval(loop);
            gameOver();
        }
        // Atualiza o contador
        else if (pipePosition <= 40 && pipePosition >= 37 && marioPosition == 140 && marioPosition <= 150) {    
            updateDisplay(++counterVal);  // Incrementa o contador
        }
    }
}, 10);  // O loop roda a cada 10ms para verificar constantemente as condições de colisão

// Função que exibe a tela de "Game Over"
function gameOver() {
    // Adiciona a imagem e o botão para reiniciar o jogo
    overDiv.innerHTML += `<img src="images/overpic.png" alt="imagem game over" class="game-over">
    <button class="buttonStart" onclick="start()">
        <img src="images/Daco_4422541.png" alt="imagem começar jogo" width="150px" class="start">
    </button>`;
}

// Função para reiniciar o jogo (recarrega a página)
function start() {
    location.reload();  // Recarrega a página, reiniciando o jogo
}

// Função que atualiza o contador na tela
function updateDisplay(val) {
    // Atualiza o elemento com o id "counter-label" com o valor atual do contador
    document.getElementById("counter-label").innerHTML = val;
}

// Adiciona o evento de toque (para dispositivos móveis) para fazer o Mario pular
body.addEventListener('touchstart', jump);

// Adiciona o evento de pressionamento de tecla para pular com a barra de espaço
document.addEventListener('keydown', function(event) {
    if (event.key === " ") {
        jump();  // Se pressionar a barra de espaço, o Mario pula
    }
});

// Adiciona o evento de pressionamento da tecla "Enter" para reiniciar o jogo
document.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        start();  // Se pressionar Enter, reinicia o jogo
    }
});

// Selecionando o elemento de instruções
const inst = document.querySelector(".instrucoes");

let i = 0;  // Variável de controle para exibir instruções apenas uma vez
// Função que exibe instruções de como jogar em dispositivos móveis
function handleInstrucao(){
    // Se a largura da janela for menor que 990px e as instruções ainda não foram exibidas
    if (window.innerWidth < 990 && i < 1) {
        // Adiciona uma mensagem de instruções para usuários móveis
        inst.innerHTML += "<p><b>Usando Mobile?</b> Toque a tela para pular e pressione <i>Start</i> para reiniciar o jogo.</p>";
        i += 1;  // Impede que a instrução seja exibida novamente
    } 
}

// Evento que é acionado ao redimensionar a janela (ajusta as instruções se necessário)
window.addEventListener("resize", handleInstrucao);

// Evento que é acionado quando a página é carregada (exibe instruções no carregamento)
window.addEventListener("pageshow", handleInstrucao);
