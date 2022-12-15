const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('#game-canvas');
const contexto = canvas.getContext('2d'); 

const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 35,
    altura: 25,
    x: 10,
    y: 50,
        desenha(){
            contexto.drawImage(
                sprites,
                flappyBird.spriteX, flappyBird.spriteY,
                flappyBird.largura, flappyBird.altura,
                flappyBird.x, flappyBird.y,
                flappyBird.largura, flappyBird.altura,
            );
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
            );
        }
}

contexto.fillStyle= '#70c5ce';
contexto.fillRect(0,0, canvas.width, canvas.height)
    
    

function loop(){

    flappyBird.desenha();
    plano.desenha();
    chao.desenha();
    requestAnimationFrame(loop);
}
loop();