'use strict'

class Playground{
    constructor(){
        this.speed = 1;

        this.playArray = new Array(10);
        for(let i = 0; i < this.playArray.length; i++){
            this.playArray[i] = new Array(40);
        }

        this.startCoordiate = [];
        this.PGDOM;
        
        this.moveDownIntervalID = [];
    }

    // method에서 this. 해서 속성을 만들어줘도 영구적이지 않다.
    // method가 실행 된 후 날아가버린다.
    // 참조해야하는 속성의 경우 무조건 constructor에 넣어주자. 

    init(){
        this.PGDOM = document.querySelector('div#PlayGround');
        this.startCoordiate.push(this.PGDOM.offsetLeft);
        this.startCoordiate.push(this.PGDOM.offsetTop);
    }

    makeBlock(){
        let block1 = new Block();
        let typeList = ['I', 'O', 'T', 'S', 'Z', 'J', 'L']
        let divElem = document.createElement('div');
        this.PGDOM.appendChild(divElem);
        divElem.className = 'block'
        divElem.className += ' ' + typeList[Math.floor(Math.random() * 2)];
        divElem.style.position = 'absolute';
        divElem.style.top = '0px';
        divElem.style.left = '0px';
        divElem.id = 'active';
    }

    moveDown(){
        let activeBlock = document.querySelector('div.block#active');
        let currentTop = Number(activeBlock.style.top.match(/[0-9]+/g)[0]);
        if(currentTop === 420){
            activeBlock.id = 'deactive';
        }else{
            activeBlock.style.top = (currentTop + 20) + 'px'
        }
        console.log('top : ' + activeBlock.style.top);
    }

    moveLeft(){
        let activeBlock = document.querySelector('div.block#active');
        let currentLeft = Number(activeBlock.style.left.match(/[0-9]+/g)[0]);
        if(currentLeft !== 0){
            activeBlock.style.left = (currentLeft - 20) + 'px'
            console.log('left : ' + activeBlock.style.left);
        }
    }

    moveRight(){
        let activeBlock = document.querySelector('div.block#active');
        let currentLeft = Number(activeBlock.style.left.match(/[0-9]+/g)[0]);
        if(currentLeft !== 180){
            activeBlock.style.left = (currentLeft + 20) + 'px'
            console.log('left : ' + activeBlock.style.left);
        }
    }

    immediateDown(){
        console.log(this);
        let activeBlock = document.querySelector('div.block#active');
        let bottomInteger = 420;
        activeBlock.style.top = bottomInteger + 'px'
        activeBlock.id = 'deactive';
        this.stop();
    }

    start(){
        this.moveDownIntervalID.push(setInterval(this.moveDown, 1000));
        console.log(this.moveDownIntervalID);
    }

    stop(){
        clearInterval(this.moveDownIntervalID);
    }
}

class Block{
    constructor(playground){
        this.plaground = playground;
        this.type = Math.floor(Math.random() * 2);
        this.coordinate = [0, 0];
    }
}

let tetris = new Playground();
console.log(tetris);
tetris.init(tetris);
tetris.makeBlock(tetris);
tetris.start(tetris);
document.addEventListener('keydown', (event) => {
    // keycode = https://www.google.com/search?q=arrow+key+number&oq=arrow+key+number&aqs=chrome..69i57j0l5.5192j0j7&sourceid=chrome&ie=UTF-8
    if(event.keyCode === 39){
        tetris.moveRight();
    }
    if(event.keyCode === 37){
        tetris.moveLeft();
    }
    if(event.keyCode === 40){
        tetris.moveDown();
    }
    if(event.keyCode === 32){
        tetris.immediateDown();
    }
{}})