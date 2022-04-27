const canvas=document.getElementById("platformer-canvas");
const context= canvas.getContext("2d")
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
const gravity= 0.5;
class Player{
    constructor(){
        this.position={ //Définis la postion du Perso x pour l'axe horizontale, y pour l'axe verticale
            x:25, //Gauche du personage, Position de départ sur l'axe x.
            y:30, //Haut du personage, Position de départ sur l'axe y.
        };
        this.velocity={ //La vitesse du joueur permet de le faire avancer
            x:0,
            y:0,
        };
        this.width= 100; //Largeur du joueur (Droite du joueur)
        this.height= 100; //Hauteur du joueur (Bas du joueur)
    }
    draw(){
        //La fonction fillRect prend 4 argument les 2 premier sont la position du rectangle et les 2 dernières ces dimensions
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
        context.fillStyle="blue";
    }
    update(){
        this.position.x+=this.velocity.x; //Permet de bouger le personage sur l'axe x
        this.position.y+=this.velocity.y; //Permet de bouger le personage sur l'axe y
        this.position.y+this.height+this.velocity.y<=canvas.height?this.velocity.y+=gravity:this.velocity.y=0; /*Ajout de la graviter lorsque l'on saute tant que le bord bas du joueur n'a pas toucher le bas du canvas, lorsque le bas est atteint la velocity.y est passer a 0 pour arréter le joueur*/
        this.draw();
    }
}

class Platform{
    constructor({x,y}){
        this.position={ //Position de la platform
            x,
            y
        }
        this.width=200;
        this.height=20;
    }
    drawPlatform(){
        context.filleStyle="yellow";
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

const player= new Player();
//const platform= new Platform();
const platforms=[
    new Platform({
        x:200,
        y:150
    }),
    new Platform({
        x:500,
        y:200
    }),
]

let scrollOffset=0;
const keys={ //Objet contenant les différente touche présser.
    right:{
        pressed: false,
    },
    left:{
        pressed: false,
    },
}
function animate(){
    requestAnimationFrame(animate); //Fonction native du canvas prend une fonction callBalck en argument
    context.clearRect(0, 0, canvas.width,canvas.height) //Sans l'ajout de cette fonction le rectangle ne s'éfface pas et créer une ligne continue
    player.update();
    platforms.forEach((platform)=>{
        platform.drawPlatform();
    })
    if(keys.right.pressed && player.position.x<400){
        player.velocity.x=5; //Mouvement du joueur
    }else if(keys.left.pressed && player.position.x>100){
        player.velocity.x=-5;
    } else{
        player.velocity.x=0;
        if(keys.right.pressed){ //Mouvement de la plateforme
            scrollOffset+=5
            platforms.forEach(platform=>platform.position.x -=5)
        } else if(keys.left.pressed){
            scrollOffset-=5
            platforms.forEach(platform=>platform.position.x +=5)
        }
    }
    console.log(scrollOffset);
    platforms.forEach(platform=>{
        if(player.position.y+player.height<=platform.position.y && player.position.y+player.height+player.velocity.y>=platform.position.y && player.position.x+player.width>=platform.position.x && player.position.x<= platform.position.x+platform.width){ //Détecteur de colision entre 2 rectangle
            player.velocity.y=0;
        }
    })
    if (scrollOffset===500){
        alert("win")
    }
}
animate()
window.addEventListener("keydown",({keyCode})=>{ //event.keyCode en notation désctructurer.
    console.log(keyCode);
    switch(keyCode){
        case 81:
            console.log("left");
            keys.left.pressed= true; //Passe la propriéter left.pressed le l'objet keys à true
        break;
        case 83:
            console.log("down");
        break;
        case 68:
            console.log("right");
            keys.right.pressed= true; //Passe la propriéter left.pressed le l'objet keys à true
        break;
        case 90:
            console.log("up");
            player.velocity.y-=15;
        break;
    }
})

window.addEventListener("keyup",({keyCode})=>{ //event.keyCode en notation désctructurer.
    console.log(keyCode);
    switch(keyCode){
        case 81:
            console.log("left");
            keys.left.pressed= false;
        break;
        case 83:
            console.log("down");
        break;
        case 68:
            console.log("right");
            keys.right.pressed= false ;
        break;
        case 90:
            console.log("up");
            //player.velocity.y=;
        break;
    }
})
