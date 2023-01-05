const sprites = new Image();
sprites.src = './sprites.png';

const som_punch = new Audio();
som_punch.src = './som/punch.wav';

const canvas = document.querySelector('#game-canvas');
const contexto = canvas.getContext('2d'); 

const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 35,
    altura: 25,
    x: 10,
    y: 50,
    pulo: 4.6,
    pula() {
        flappyBird.velocidade = -flappyBird.pulo;
    },
        desenha(){
            contexto.drawImage(
                sprites,
                flappyBird.spriteX, flappyBird.spriteY,
                flappyBird.largura, flappyBird.altura,
                flappyBird.x, flappyBird.y,
                flappyBird.largura, flappyBird.altura,
            );
        },
        gravidade: 0.25,
        velocidade: 0,
        atualiza(){
            if(fazColisao() == true){
                som_punch.play();
                telaAtiva = TelaInicio;
                return;
            }
            flappyBird.velocidade += flappyBird.gravidade;
            flappyBird.y = flappyBird.y + flappyBird.velocidade;
        }
}


const chao = {
    spriteX: 0,
    spriteY: 611,
    largura: 225,
    altura: 112,
    x: 0,
    y: 370,
        desenha(){
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                chao.x, chao.y,
                321, chao.altura,
            );
        }
}
    
const plano = {
    spriteX: 390,
    spriteY: 4,
    largura: 276,
    altura: 199,
    x: 0,
    y: 280,
        desenha(){
            contexto.drawImage(
                sprites,
                plano.spriteX, plano.spriteY,
                plano.largura, plano.altura,
                plano.x, plano.y,
                321, plano.altura,
                contexto.fillStyle= '#70c5ce',
                contexto.fillRect(0,0, canvas.width, canvas.height),
            );
        }
}

const inicio = {
    spriteX: 130,
    spriteY: 0,
    largura: 180,
    altura: 152,
    x: 70,
    y:70,
    desenha(){
        contexto.drawImage(
            sprites,
            inicio.spriteX, inicio.spriteY,
            inicio.largura, inicio.altura,
            inicio.x, inicio.y,
            inicio.largura, inicio.altura,
        );
    }
}

const TelaInicio = {
    desenha(){
        plano.desenha();
        chao.desenha();
        flappyBird.desenha();
        inicio.desenha();
    },
    click(){
        telaAtiva = TelaJogo;
    }
}

const TelaJogo = {
    desenha() {
        plano.desenha();
        chao.desenha();
        flappyBird.desenha();
        flappyBird.atualiza();
    },

    click(){
        flappyBird.pula();
    }
}

var telaAtiva = TelaInicio;

function mudaTelaAtiva(){
    telaAtiva.click();
}

function fazColisao(){
    if(flappyBird.y+flappyBird.altura > chao.y){
        return true;
    }
    else {
        return false;
    }
}

window.addEventListener('click', mudaTelaAtiva);

    
    

function loop(){
    telaAtiva.desenha()
    requestAnimationFrame(loop);
}

loop();
