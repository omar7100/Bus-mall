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
Stuff.container = document.getElementById('thing-container');
Stuff.leftImage = document.getElementById('left-thing-image');
Stuff.centerImage = document.getElementById('center-thing-image');
Stuff.rightImage = document.getElementById('right-thing-image');
Stuff.leftTitle = document.getElementById('left-thing-title');
Stuff.centerTitle = document.getElementById('center-thing-title');
Stuff.rightTitle = document.getElementById('right-thing-title');

// set when rendering things -->

Stuff.leftObject = null;
Stuff.rightObject = null;
Stuff.centerObject = null;


new Stuff('Bag', 'img/bag.jpg');
new Stuff('Banana', 'img/banana.jpg');
new Stuff('Bathroom', 'img/bathroom.jpg');
new Stuff('Boots', 'img/boots.jpg');
new Stuff('breakfast', 'img/breakfast.jpg');
new Stuff('bubblegum', 'img/bubblegum.jpg');
new Stuff('chair', 'img/chair.jpg');
new Stuff('cthulhu', 'img/cthulhu.jpg');
new Stuff('dog-duck', 'img/dog-duck.jpg');
new Stuff('dragon', 'img/dragon.jpg');
new Stuff('pen', 'img/pen.jpg');
new Stuff('pet-sweep', 'img/pet-sweep.jpg');
new Stuff('scissors', 'img/scissors.jpg');
new Stuff('shark', 'img/shark.jpg');
new Stuff('sweep', 'img/sweep.png');
new Stuff('tauntaun', 'img/tauntaun.jpg');
new Stuff('unicorn', 'img/unicorn.jpg');
new Stuff('usb', 'img/usb.gif');
new Stuff('water-can', 'img/water-can.jpg');
new Stuff('wine-glass', 'img/wine-glass.jpg');
function renderbus() {

    // ensure that previous Things not shown on next round

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
    var leftThingImageElement = Stuff.leftImage;
    var centerThingImageElement = Stuff.centerImage;
    var rightThingImageElement = Stuff.rightImage;

    leftThingImageElement.setAttribute('src', Stuff.leftObject.src);
    leftThingImageElement.setAttribute('alt', Stuff.leftObject.title);
    centerThingImageElement.setAttribute('src', Stuff.centerObject.src);

    centerThingImageElement.setAttribute('alt', Stuff.centerObject.title);
    rightThingImageElement.setAttribute('src', Stuff.rightObject.src);

    rightThingImageElement.setAttribute('alt', Stuff.rightObject.title);
    Stuff.leftTitle.textContent = Stuff.leftObject.title;
    Stuff.centerTitle.textContent = Stuff.centerObject.title;
    Stuff.rightTitle.textContent = Stuff.rightObject.title;
}
/////
function randomStuff() {
    var index = Math.floor(Math.random() * Stuff.all.length);
    return Stuff.all[index];
}
function randomInRange(min, max) {
    var range = max - min + 1;
    var rand = Math.floor(Math.random() * range) + min
    return rand;
}
function tableUpdate() {
    var tableBody = document.getElementById('news');
    tableBody.innerHTML = '';
    for (var i = 0; i < Stuff.all.length; i++) {
        var thing = Stuff.all[i];
        var row = addStuff('tr', tableBody);
        addStuff('td', row, thing.title);
        addStuff('td', row, '' + thing.clickCtr);
        addStuff('td', row, '' + thing.shownCtr);
        addStuff('td',row, '' + ' had ' + thing.clickCtr + 'votes' + 'and was' + thing.shownCtr);
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
function clicks(event) {
    var clickedId = event.target.id;
    var ThingClicked;
    if (clickedId === 'left-thing-image') {
        ThingClicked = Stuff.leftObject;
    } else if (clickedId === 'center-thing-image') {
        ThingClicked = Stuff.centerObject;
    } else if (clickedId === 'right-thing-image') {
        ThingClicked = Stuff.rightObject;
    } else {
        alert('chose one of the things that show at the screen!')
    }
    if (ThingClicked) {
        ThingClicked.clickCtr++;
        Stuff.roundCtr++;
        tableUpdate();
        if (Stuff.roundCtr === Stuff.roundLimit) {
            alert('No more clicking for you!');
            newChart();
            Stuff.container.removeEventListener('click', clicks);
        } else {
            renderbus();
        }
    }
}
/////////
Stuff.container.addEventListener('click', clicks);
renderbus();
tableUpdate();



///////////
function newChart() {

    var namesArray = [];
    var showArray = [];
    var proArray = [];


    for (var i = 0; i < Stuff.all.length; i++) {
        var singleName = Stuff.all[i].name;
        namesArray.push(singleName);
        var click = Stuff.all[i].clickCtr;
        proArray.push(click);
        var shown = Stuff.all[i].shownCtr;
        showArray.push(shown);
    }

    var ctx = document.getElementById('myChart').getContext('2d');
    var NewChart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair' ,'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'],
            datasets: [
                    {
                    label: 'Bus-mall Names',
                    backgroundColor: 'red',
                    borderColor: 'white',
                    data: namesArray
                },
                {
                    label: 'Bus-mall Shown',
                    backgroundColor: 'blue',
                    borderColor: 'white',
                    data: showArray
                }
            ]
        },

        // Configuration options go here
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}