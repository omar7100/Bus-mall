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

new Stuff('Bag', 'images/bag.jpg');
new Stuff('Banana', 'images/banana.jpg');
new Stuff('Bathroom', 'images/bathroom.jpg');
new Stuff('Boots', 'images/boots.jpg');
new Stuff('Breakfast', 'images/breakfast.jpg');
new Stuff('Bubblegum', 'images/bubblegum.jpg');
new Stuff('Chair', 'images/chair.jpg');
new Stuff('Cthulhu', 'images/cthulhu.jpg');
new Stuff('Dog-duck', 'images/dog-duck.jpg');
new Stuff('Dragon', 'images/dragon.jpg');
new Stuff('Pen', 'images/pen.jpg');
new Stuff('Pet-sweep', 'images/pet-sweep.jpg');
new Stuff('Scissors', 'images/scissors.jpg');
new Stuff('Shark', 'images/shark.jpg');
new Stuff('Sweep', 'images/sweep.png');
new Stuff('Tauntaun', 'images/tauntaun.jpg');
new Stuff('Unicorn', 'images/unicorn.jpg');
new Stuff('Usb', 'images/usb.gif');
new Stuff('Water-can', 'images/water-can.jpg');
new Stuff('Wine-glass', 'images/wine-glass.jpg');



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
    var rightStuffImageElement = Stuff.rightImage;

    leftImageElement.setAttribute('src', Stuff.leftObject.src);
    leftImageElement.setAttribute('alt', Stuff.leftObject.title);

    centerimageElement.setAttribute('src', Stuff.centerObject.src);
    centerimageElement.setAttribute('alt', Stuff.centerObject.title);

    rightStuffImageElement.setAttribute('src', Stuff.rightObject.src);
    rightStuffImageElement.setAttribute('alt', Stuff.rightObject.title);

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

function getStuff() {
    var data = localStorage.getItem('productsitem');
    var Stuffdata = JSON.parse(data);
    if (Stuffdata) {

        Stuff.all = Stuffdata;
    }

}


function setStuff() {
    var BusString = JSON.stringify(Stuff.all);
    localStorage.setItem('productsitem', BusString);
}


function clicks(event) {
    setStuff();
    var clickedId = event.target.id;
    var ThingClicked;

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

            alert('No more clicking for you!');
            newChart();
            rendernewul();
            Stuff.container.removeEventListener('click', clicks);

        } else {

            renderBus();

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
                backgroundColor: 'black',
                borderColor: 'black',
                data: showArray,
            },
            {
                label: 'Item Shown',
                backgroundColor: 'lightgreen',
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
getStuff();