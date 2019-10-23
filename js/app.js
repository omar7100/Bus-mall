'use strict';

function Stuff(title, src) {
    this.title = title;
    this.src = src;
    this.clickCtr = 0;
    this.shownCtr = 0;
    Stuff.all.push(this);
}

Stuff.roundCtr = 0;
Stuff.roundLimit = 25;

Stuff.all = [];

Stuff.container = document.getElementById('item-container');
Stuff.leftImage = document.getElementById('leftimage');
Stuff.centerimage = document.getElementById('centerimage');
Stuff.rightImage = document.getElementById('rightimage');

Stuff.leftTitle = document.getElementById('lefttitle');
Stuff.centerTitle = document.getElementById('centertitle');
Stuff.rightTitle = document.getElementById('righttitle');

Stuff.leftObject = null;
Stuff.centerObject = null;
Stuff.rightObject = null;

new Stuff('bag', 'images/bag.jpg');
new Stuff('banana', 'images/banana.jpg');
new Stuff('bathroom', 'images/bathroom.jpg');
new Stuff('boots', 'images/boots.jpg');
new Stuff('breakfast', 'images/breakfast.jpg');
new Stuff('bubblegum', 'images/bubblegum.jpg');
new Stuff('chair', 'images/chair.jpg');
new Stuff('cthulhu', 'images/cthulhu.jpg');
new Stuff('dog-duck', 'images/dog-duck.jpg');
new Stuff('dragon', 'images/dragon.jpg');
new Stuff('pen', 'images/pen.jpg');
new Stuff('pet-sweep', 'images/pet-sweep.jpg');
new Stuff('scissors', 'images/scissors.jpg');
new Stuff('shark', 'images/shark.jpg');
new Stuff('sweep', 'images/sweep.jpg');
new Stuff('tauntaun', 'images/tauntaun.jpg');
new Stuff('unicorn', 'images/unicorn.jpg');
new Stuff('usb', 'images/usb.jpg');
new Stuff('water-can', 'images/water-can.jpg');
new Stuff('wine-glass', 'images/wine-glass.jpg');





function renderBus() {

    var forbidden = [Stuff.leftObject, Stuff.centerObject, Stuff.rightObject];

    do {

        Stuff.leftObject = randomStuff();

    } while (forbidden.includes(Stuff.leftObject))

    forbidden.push(Stuff.leftObject);

    do {

        Stuff.centerObject = randomStuff();

    } while (forbidden.includes(Stuff.centerObject))

    forbidden.push(Stuff.centerObject);
    do {

        Stuff.rightObject = randomStuff();

    } while (forbidden.includes(Stuff.rightObject));



    Stuff.leftObject.shownCtr++;
    Stuff.centerObject.shownCtr++;
    Stuff.rightObject.shownCtr++;

    var leftImageElement = Stuff.leftImage;
    var centerimageElement = Stuff.centerimage;
    var rightBusMallImageElement = Stuff.rightImage;

    leftImageElement.setAttribute('src', Stuff.leftObject.src);
    leftImageElement.setAttribute('alt', Stuff.leftObject.title);

    centerimageElement.setAttribute('src', Stuff.centerObject.src);
    centerimageElement.setAttribute('alt', Stuff.centerObject.title);
    
    rightBusMallImageElement.setAttribute('src', Stuff.rightObject.src);
    rightBusMallImageElement.setAttribute('alt', Stuff.rightObject.title);

    Stuff.leftTitle.textContent = Stuff.leftObject.title;
    Stuff.centerTitle.textContent = Stuff.centerObject.title;
    Stuff.rightTitle.textContent = Stuff.rightObject.title;
}


////////
function randomStuff() {
    var index = Math.floor(Math.random() * Stuff.all.length);
    return Stuff.all[index];
}


function randomInRange(min, max) {
    var range = max - min + 1;
    var rand = Math.floor(Math.random() * range) + min
    return rand;
}


function rendernewul() {
    var contentul = document.getElementById('content-ul')
    for (var i = 0; i < Stuff.all.length; i++) {
        var currentul = Stuff.all[i];
        var state = currentul.title + ' had ' + currentul.clickCtr + ' votes ' + ' and was shown ' + currentul.shownCtr;
        addStuff('li', contentul, state);

    }
}


function addStuff(tag, container, text) {
    var element = document.createElement(tag);
    container.appendChild(element);
    if (text) {
        element.textContent = text;
    }
    return element;
}

function getbusmall() {
    var data = localStorage.getItem('productsitem');
    var busmalldata = JSON.parse(data);
    if (busmalldata) {

        Stuff.all = busmalldata;
    }

}


function setbusmall() {
    var BusString = JSON.stringify(Stuff.all)
    localStorage.setItem('productsitem', BusString)
}


function clicks(event) {

    var clickedId = event.target.id;
    var ThingClicked;
    setbusmall();
    if (clickedId === 'leftimage') {
        ThingClicked = Stuff.leftObject;
    } else if (clickedId === 'centerimage') {
        ThingClicked = Stuff.centerObject;
    } else if (clickedId === 'rightimage') {
        ThingClicked = Stuff.rightObject;
    } else {
        console.log('Um, what was clicked on???', clickedId);
    }

    if (ThingClicked) {
        ThingClicked.clickCtr++;
        Stuff.roundCtr++;

        if (Stuff.roundCtr === Stuff.roundLimit) {
            rendernewul();
            newChart();
            alert('No more clicking for you!');

            Stuff.container.removeEventListener('click', clicks);

        } else {

            renderBus();
            // setbusmall();
        }
    }
}




function newChart() {
    var nameArray = [];
    var showArray = [];
    var proArray = [];
    for (let i = 0; i < Stuff.all.length; i++) {
        var MallInstenc = Stuff.all[i];
        nameArray.push(MallInstenc.title + ' Vote');
        nameArray.push(MallInstenc.title + ' Shown');
        showArray.push(MallInstenc.clickCtr);
        proArray.push(MallInstenc.shownCtr);
    }


    var ctx = document.getElementById('Chart').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck ',
                'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'
            ],
            datasets: [{
                    label: 'Item Vote',
                    backgroundColor: 'Blue',
                    borderColor: 'black',
                    data: showArray,
                },
                {
                    label: 'Item Shown',
                    backgroundColor: 'red',
                    borderColor: 'black',
                    data: proArray,
                }
            ],
            options: {}
        }
    });
}

Stuff.container.addEventListener('click', clicks);

renderBus();
getbusmall();