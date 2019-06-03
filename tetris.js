'use strict'
// --------------playground 시작-------------- //
// class가 아닌 ES5식? OOP
let Playground = function(){
    // speed, 시간에 따라서 speed를 다르게 해주고
    // speed를 기준으로 moveDown의 interval을 조정해주면 된다.
    this.speed = 1;
    this.checkerCount = 0;

    // map
    // 회전 및 블럭의 실시간 위치를 위해 필요하다.
    // 한줄이 완성되면 없애주는 것도 이런 참조가 필요할 듯하다.
    //
    /* array 참조 없이 하려면?
        deactive인 block element들을 전부 찾아서
        그들의 위치를 비교해도 될 것 같다.
    */
    //
    this.playArray = new Array(10);
    for(let i = 0; i < this.playArray.length; i++){
        this.playArray[i] = new Array(40);
    }

    // 혹시 필요할줄 알았는데 필요 없는 중
    this.startCoordiate = [];

    // DOM? 으로써 playground를 갖고 있게 해서 참조 쉽게
    // 드디어 HTML을 참조한다.는 의미에서 중요한 변수이다.
    this.PGDOM;

    // 만들어준 interval을 삭제하려면 ID가 필요하다.
    // interval은 window 혹은 global scope 에 속해있는 함수라고 하는 것 같다.
    // global 객체(혹 window)를 참조. 
    this.moveDownIntervalID;
    this.checkerIntervalID;
}

Playground.prototype.init = function(){
    this.PGDOM = document.querySelector('div#PlayGround');
    this.startCoordiate.push(this.PGDOM.offsetLeft);
    this.startCoordiate.push(this.PGDOM.offsetTop);
    this.makeBlock();
    this.start();
}

Playground.prototype.checker = function(_this){
    // 중요한 Method
    // 짧은 시간마다 모든 요소를 계속 체크해서 active블럭은 moveDown해주고
    // 바닥에 닿은 블럭은 deactive해주고.
    // 기존 moveDown 등을 얘가 해주게 하자.
    let activeBlocks = document.querySelectorAll('div.block#active');
    if((1000 / _this.speed) === (_this.checkerCount)){
        activeBlocks.forEach((eachBlock) => {
            _this.moveDown(eachBlock);
        })
        _this.checkerCount = 0;
    }else{
        _this.checkerCount += 100;
    }
    
}

Playground.prototype.makeBlock = function(){
    let typeList = ['I', 'O', 'T', 'S', 'Z', 'J', 'L']

    // 잘 모르는 분야,
    // javascript로 html element를 만들어주기 위한 전단계인 것 같은데
    // 어떤 식으로 내부가 돌아가는지는 아직 잘 모른다.
    ////////// htmlElement만드는 법은
    // A 내가 아는 방법? 
    // 1. createElement
    // 2. createDocumentFragement();
    //   a. https://stackoverflow.com/questions/52693614/can-i-create-a-self-closing-element-with-createelement --> 안됨
    //   b. https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment
    //   c. createDocumentFragment 는 minimal한 document object를 만들어내는 것이다. 그래서 이걸 만들고 이 DOM에 무언가를 추가하고
    //      이걸 기존 문서에 appendChild나 insertBefore등으로 합치면 되는 것이다.
    // 
    // B. 4가지라고 한다.
    // https://www.digitalocean.com/community/tutorials/how-to-make-changes-to-the-dom
    // C. Class 이용
    // https://stackoverflow.com/questions/50078527/create-html-element-with-es6
    // D. DOMParser()를 이용
    // https://stackoverflow.com/questions/3103962/converting-html-string-into-dom-elements/3104237
    // var xmlString = "<div id='foo'><a href='#'>Link</a><span></span></div>";
    // doc = new DOMParser().parseFromString(xmlString, "text/xml");
    /////////// 정답은 3가지 이고 poiemaWeb에 잘 나와있다.
    // https://poiemaweb.com/js-dom
    let divElem = document.createElement('div');

    // appendChild라는 Method.
    // 이 Method를 이용함으로서 startCoordinate 배열을 이용하지 않아도 돼서 편하다.
    // node.appendChild라고 mdn에 나오는데
    // html의 node, element들이 구성되는 방식에 대한 공부가 필요하다. --> DOM
    // https://www.youtube.com/watch?v=ImTA5-r9TNc&list=PL7pUrjEGbG8ZTnuk0g77aXOWetabeo7x6
    // 위는 생활코딩 Javascript for Web Browser 재생목록
    this.PGDOM.appendChild(divElem);
    divElem.className = 'block'
    divElem.className += ' ' + typeList[Math.floor(Math.random() * 2)];
    divElem.style.position = 'absolute';
    divElem.style.top = '-20px';
    divElem.style.left = '100px';
    divElem.id = 'active';
}


// moveDown Method. 
// moveDown에서 블럭에 대한 명령이 멈추지 않는 문제가 발생했다.
// 해결책? x : https://coderwall.com/p/65073w/using-this-in-scope-based-settimeout-setinterval

// setInterval을 해준 method는 global에서 돌아가므로
// moveDown내에서 this는 window를 가르켜 버린다. 

// this가 원래의 tetris(즉 playground instance)를 가르키는 방법은? 혹 tetris를 가르키는 방법은?
// this가 가르키는 방법은 없고, instance인 tetris를 가르키게 하는 방법은 2가지 있다.
//
//////// 1. closure 를 이용해주면 된다.
//
//       즉 moveDown을 prototype에 넣어주는 것이 아니라. 
//       constructor 함수에 넣어주고, let _this = this;를 해서
//       _this.makeBlock()을 해주면 _this는 closure? 로 기존의 instance를 가르킨다.
//       각 생성된 instance들 내에 넣어주고, closure를 이용해서
//       moveDown이 참고할 instance를 보관해준다. 
//       아마 setInterval로 들어간 함수는 그 함수 자체를 global이 계속 실행시켜주는 것 같으므로
//       
//////// 2. parameters를 넘겨주는 방법이 있었다. < -- 근본적인 문제였고, 이 해결책이 더 낫다.
//       setInterval(this.moveDown, 1000, this);

// 아니면 Playground.prototype.makeBlock()을 해준다면? 
// makeBlock()내에서 기존의 PGDOM을 참고해야 하므로 안된다.


Playground.prototype.moveDown = function(eachBlock){
    // interval해주는 함수라 global에서 돌아간다. _this argument를 받아서
    // 기존 playground instance를 가르키게 하자.
    //--> checker가 생겨서 얘는 playground를 가리킬 필요는 없고, 
    // Element 배열을 받아서 그 Element들을 moveDown 해주면 된다.
    let currentTop = Number(eachBlock.style.top.match(/[-0-9]+/g)[0]);
    eachBlock.style.top = (currentTop + 20) + 'px';
    console.log('top : ' + eachBlock.style.top);
}

Playground.prototype.moveLeft = function(){
    let activeBlock = document.querySelector('div.block#active');
    let currentLeft = Number(activeBlock.style.left.match(/[-0-9]+/g)[0]);
    if(currentLeft !== 0){
        activeBlock.style.left = (currentLeft - 20) + 'px'
        console.log('left : ' + activeBlock.style.left);
    }
}

Playground.prototype.moveRight = function(){
    let activeBlock = document.querySelector('div.block#active');
    let currentLeft = Number(activeBlock.style.left.match(/[-0-9]+/g)[0]);
    if(currentLeft !== 180){
        activeBlock.style.left = (currentLeft + 20) + 'px'
        console.log('righted, left : ' + activeBlock.style.left);
    }
}

Playground.prototype.immediateDown = function(){
    let activeBlock = document.querySelector('div.block#active');
    let bottomInteger = 420;
    activeBlock.style.top = bottomInteger + 'px'
    activeBlock.id = 'deactive';
    this.makeBlock();
    //this.stop();
}

Playground.prototype.start = function(){
    //this.moveDownIntervalID = setInterval(this.moveDown, 300, this);
    this.checkerIntervalID = setInterval(this.checker, 100, this);
}

Playground.prototype.stop = function(){
    clearInterval(this.moveDownIntervalID);
}



// --------------playground 끝-------------- //


let tetris = new Playground();
tetris.init();
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