var canvas = document.getElementById("canvas");
var contexto = canvas.getContext("2d");

function desenhaFundo(){
	//preenche o fundo com cinza escuro
	contexto.fillStyle = "dimgray";
	contexto.fillRect(0, 0, canvas.width, canvas.height);
	//calcada superior
	contexto.fillStyle = "lightgray";
	contexto.fillRect(0, 0, canvas.width, 80);
	 
	//calcada inferior
	contexto.fillStyle = "lightgray";
	contexto.fillRect(0, 380, canvas.width, 100);

	//faixas
	contexto.fillStyle = "white";
	for(var i = 0; i < 25; i++){
	  //faixa superior
	  contexto.fillRect(i*30-5, 185, 20, 4);
	 
	  //faixa inferior
	  contexto.fillRect(i*30-5, 280, 20, 4);
	}
}

function desenhaImage(){
	contexto.drawImage(imagem, x, y, imagem.width, imagem.height);
}

var imagem = new Image();
imagem.src = "./assets/image/dilminha.png";
var x = 320;
var y = 400;
imagem.onload = desenhaImagem;

//carrinho amarelo
var imagem2 = new Image();
imagem2.src = "./assets/image/carrinho-amarelo.png";
var x2 = -10;
var y2 = 300;
imagem2.onload = desenhaImagem;
 
//carrinho azul
var imagem3 = new Image();
imagem3.src = "./assets/image/carrinho-azul.png";
var x3 = 560;
var y3 = 200;
imagem3.onload = desenhaImagem;
 
//carrinho de polícia
var imagem4 = new Image();
imagem4.src = "./assets/image/carrinho-policia.png";
var x4 = 10;
var y4 = 100;
imagem4.onload = desenhaImagem;


function desenhaImagem(){
	contexto.drawImage(imagem, x, y, imagem.width, imagem.height);
}


function Sprite(caminhoDaImagem, xInicial, yInicial) {
    this.x = xInicial;
    this.y = yInicial;
 
    this.imagem = new Image();
    this.imagem.src = caminhoDaImagem;
 
    var that = this;
    this.imagem.onload = function() {
        that.largura = that.imagem.width;
        that.altura = that.imagem.height;
        that.desenhaImagem();
    }
 
    this.desenhaImagem = function() {
        contexto.drawImage(this.imagem, this.x, this.y, this.largura, this.altura);
    }

        this.move = function(dx, dy) {
        this.x += dx;
        this.y += dy;
        //limites
        if(this.x > canvas.width) {
            this.x = -this.largura;
        } else if(this.x < -this.largura) {
            this.x = canvas.width;
        }
        if(this.y > canvas.height - this.altura + 5) {
            this.y -= dy;
        } else if(this.y <= -5) {
            this.y = canvas.height - this.altura;
        }
    }
    

}


var dilminha = new Sprite("./assets/image/dilminha.png", 320, 400);
 
var carrinhoAmarelo = new Sprite("./assets/image/carrinho-amarelo.png", -10, 300);
 
var carrinhoAzul = new Sprite("./assets/image/carrinho-azul.png", 560, 200);
 
var carrinhoPolicia = new Sprite("./assets/image/carrinho-policia.png", 10, 100);

document.onkeydown = function(event) {
switch(event.which) {
case 37: //pra esquerda
    dilminha.move(-10, 0);
	break;
case 38: //pra cima
	dilminha.move(0, -10);
	break;
case 39: //pra direita
	dilminha.move(10, 0);
	break;
case 40: //pra baixo
    dilminha.move(0, 10);
	break;
	 }
}

setInterval(function(){
    desenhaFundo();
    dilminha.desenhaImagem();
    carrinhoAmarelo.desenhaImagem();
    carrinhoAzul.desenhaImagem();
    carrinhoPolicia.desenhaImagem();

    carrinhoAmarelo.move(7, 0);
    carrinhoAzul.move(-5, 0);
    carrinhoPolicia.move(10, 0);
	}, 50);
