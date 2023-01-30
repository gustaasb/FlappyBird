const sprites = new Image();
sprites.src = './sprites.png';

const som_punch = new Audio();
som_punch.src = './som/punch.wav';

let animation_frame = 0;

const canvas = document.querySelector('#game-canvas');
const contexto = canvas.getContext('2d'); 

const flappyBird = {
    movimentos: [
        {spriteX: 0, spriteY: 0},
        {spriteX: 0, spriteY: 26},
        {spriteX: 0, spriteY: 52},
        {spriteX: 0, spriteY: 26},
    ],
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
        frameAtual: 0,
        atualizaFrame(){
            if((animation_frame % 10) === 0){
                flappyBird.frameAtual = flappyBird.frameAtual + 1;
                flappyBird.frameAtual = flappyBird.frameAtual % flappyBird.movimentos.length;
                flappyBird.spriteX = flappyBird.movimentos[flappyBird.frameAtual].spriteX;
                flappyBird.spriteY = flappyBird.movimentos[flappyBird.frameAtual].spriteY;
            }
        },
        atualiza(){
            if(fazColisao() == true){
                som_punch.play();
                telaAtiva = TelaInicio;
                return;
            }
            flappyBird.velocidade += flappyBird.gravidade;
            flappyBird.y = flappyBird.y + flappyBird.velocidade;
            flappyBird.atualizaFrame();
        },
}


const chao = {

    spriteX: 0,
    spriteY: 611,
    largura: 223,
    altura: 112,
    x: 0,
    y: 370,
        desenha(){
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                chao.x, chao.y,
                chao.largura, chao.altura,
            );
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                chao.x+chao.largura, chao.y,
                chao.largura, chao.altura,
            );
        },
    atualiza() {
        chao.x = chao.x - 1;
        chao.x = chao.x % (chao.largura / 2);
    
    }
}
    
const plano = {
    spriteX: 390,
    spriteY: 0,
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
                320, plano.altura,
                contexto.fillStyle= '#70c5ce',
                contexto.fillRect(0,0, canvas.width, canvas.height),
            );
            contexto.drawImage(
                sprites,
                plano.spriteX, plano.spriteY,
                plano.largura, plano.altura,
                plano.x+plano.largura, plano.y,
                320, plano.altura,
            );
            contexto.drawImage(
                sprites,
                plano.spriteX, plano.spriteY,
                plano.largura, plano.altura,
                plano.x+2*plano.largura, plano.y,
                320, plano.altura,
            );
        },
    atualiza() {
        plano.x = plano.x - 0.4;
        plano.x = plano.x % (plano.largura);
    }
}

const canos = {
    largura: 52,
    altura: 400,
    ceu: {
        spriteX: 52,
        spriteY: 169,
        x: 120,
        y: -150
    },
    chao: {
        spriteX: 0,
        spriteY: 169
    },
    pares: [],
    espacamentoEntreCanos: 120,
    desenha(){
        
        for(i=0;i<canos.pares.length;i++){
            canos.ceu.x = canos.pares[i].x;
            canos.ceu.y = canos.pares[i].y;
            // [cano do céu]
            contexto.drawImage(
                sprites,
                canos.ceu.spriteX, canos.ceu.spriteY,
                canos.largura, canos.altura,
                canos.ceu.x, canos.ceu.y,
                canos.largura, canos.altura,
                )
                // [cano do chão]
                const canoChaoX = canos.ceu.x;
                const canoChaoY = canos.altura + canos.espacamentoEntreCanos + canos.ceu.y;
                contexto.drawImage(
                    sprites,
                    canos.chao.spriteX, canos.chao.spriteY,
                    canos.largura, canos.altura,
                    canoChaoX, canoChaoY,
                    canos.largura, canos.altura,
                )
        }

    },
    atualiza(){
        canos.ceu.x = canos.ceu.x - 2;
        const passou100Frames = (animation_frame % 100 === 0);
        if(passou100Frames) {
            const novoPar = {
                x: canvas.width,
                y: -150 * (Math.random() + 1),
            }
            canos.pares.push(novoPar);
        }
        for(i=0;i<canos.pares.length;i++){
            const par = canos.pares[i];
            par.x = par.x - 2;

            if(par.x + canos.largura <= 0){
                canos.pares.shift();
            }
            if(fazColisaoObstaculo(par)){
                som_punch.play();
                telaAtiva = TelaInicio;
                return;
            }
        }
    }
}

function fazColisaoObstaculo(par){
    if(flappyBird.x >= par.x){
        const alturaCabecaFlappy = flappyBird.y;
        const alturaPeFlappy = flappyBird.y + flappyBird.altura;
        const bocaCanoCeuY = par.y + canos.altura;
        const bocaCanoChaoY = par.y + canos.altura + canos.espacamentoEntreCanos;
        if(alturaCabecaFlappy <= bocaCanoCeuY){
            return true;
        }
        if(alturaPeFlappy >= bocaCanoChaoY){
            return true;
        }

    }
    return false;
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
        plano.atualiza();
        canos.desenha();
        canos.atualiza();
        chao.desenha();
        chao.atualiza();
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
    animation_frame = animation_frame + 1;
}

loop();
