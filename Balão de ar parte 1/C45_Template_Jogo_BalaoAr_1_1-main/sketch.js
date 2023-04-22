var bg, bgImg
var ballon, ballonImg
var obs1, obs2
var obstaclesGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver, gameOverImg;
var restart, restartImg;

function preload(){
    bgImg = loadImage("assets/cityImage.png");
    ballonImg = loadAnimation("assets/balloon1.png", "assets/balloon2.png", "assets/balloon3.png");
    obs1 = loadImage("assets/obsTop1.png");
    obs2 = loadImage("assets/obsTop2.png");
    gameOverImg = loadImage("assets/fimdejogo.png");
    restartImg = loadImage("assets/restart.png");

}

function setup(){
    createCanvas(700, 560);

    //Imagem de fundo.
    bg = createSprite(350, 280);
    bg.addImage(bgImg);
    bg.scale = 0.4;
    bg.velocityX = -2;

    //criando balão
    ballon = createSprite(100, 200, 20, 50);
    ballon.addAnimation("ballon", ballonImg);
    ballon.scale = 0.25;
    
    obstaclesGroup = new Group();

    //criando os sprites de fim de jogo
    gameOver = createSprite(350, 280);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.5;

    restart = createSprite(350, 320);
    restart.addImage(restartImg);
    restart.scale = 0.5;

}

function draw() {
    background("black");

    if(gameState==PLAY){

        //elementos de fim de jogo ocultados
        gameOver.visible = false;
        restart.visible = false;
        
        //rolagem do fundo infinita
        if(bg.x < 200){
            bg.x = bg.width /2 - 750
        }

        //fazendo o balão de ar quente pular
        if(keyDown("space")){
            ballon.velocityY = -6;
        }

        //adicioando gravidade
        ballon.velocityY = ballon.velocityY +2;

        //gerando obstáculos
        spawnObstacles();

        //condição para o estado end
        if(obstaclesGroup.isTouching(ballon)){
            gameState = END;
        }

    }

    if(gameState==END){

        gameOver.visible = true;
        restart.visible = true;

        //todos os sprites devem parar de se mover no estado end.
        ballon.velocityX = 0;
        ballon.velocityY = 0;
        ballon.y = 200;
        bg.velocityX = 0;
        obstaclesGroup.setVelocityXEach(0);

        obstaclesGroup.setLifetimeEach(-1);

        if(mousePressedOver(restart)){
            reset();
        }

    }


    
  
    drawSprites();
}  

function spawnObstacles(){
    if(frameCount %60 == 0){
        var obstacle = createSprite(650, 50, 40, 50)
        obstacle.velocityX = -4;
        obstacle.scale = 0.1;
        //garantindo posições y aleatórias
        obstacle.y = Math.round(random(50, 400));

        //gerando obstáculos aleatórios
        var rand = Math.round(random(1,2));
        switch(rand){
            case 1: obstacle.addImage(obs1);
            break;
            case 2: obstacle.addImage(obs2);
            break;
            default: break
        }
        //definindo tempo de vida
        obstacle.lifetime = 250;
        obstaclesGroup.add(obstacle)
    }
}

function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;  
    obstaclesGroup.destroyEach();
    bg.velocityX = -2;
}