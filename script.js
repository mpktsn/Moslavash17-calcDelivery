'use strict';
// debug mode, enable by setting it to true, otherwise false.
var debug = false;

// business logic
    var perch = {
        internalMkadPrice : 250,
        aroundMkadPrice: 350,
        farMkadPrice: 500,
        farMkadKmPrice: 5,
        dorohovPrice: 500
    }

    var maxim = {
        internalMkadPrice: 150,
        aroundMkadPrice: 250,
        farMkadPrice: 300,
        farMkadKmPrice: 0,
        dorohovPrice: 300
    }

    var currentDriver;
    
/* script calculates the delivery costs */

function calculate() {

// extracting dropdown list's selected value
    var e = document.getElementById('driver-selector');
    var driver = e.options[e.selectedIndex].value;
if (debug) console.log('Выбран водитель: ' + driver);

    var internalMkadCount = document.getElementById('internal-mkad').value;
if (debug) console.log('Количество точек внутри МКАД: ' + internalMkadCount);

    var aroundMkadCount = document.getElementById('around-mkad').value;
if (debug) console.log('Количество точек в пределах 20 км от МКАД: ' + aroundMkadCount);

    var farMkadOne = document.getElementById('far-mkad-1').value;
    if (farMkadOne === undefined) farMkadOne = 0;
    var farMkadTwo = document.getElementById('far-mkad-2').value;
    if (farMkadTwo === undefined) farMkadTwo = 0;
    var farMkadThree = document.getElementById('far-mkad-3').value;
    if (farMkadThree === undefined) farMkadThree = 0;

    var jsResults = document.getElementById('js-results');

// calculations
    if (driver === 'perch') {
        currentDriver = perch;
    } else if (driver === 'maxim') {
        currentDriver = maxim;
    }

    var internalMkadCost = Number(currentDriver.internalMkadPrice) * Number(internalMkadCount);
if (debug) console.log('Стоимость внутри МКАД: ' + internalMkadCost);

    var aroundMkadCost = Number(currentDriver.aroundMkadPrice) * Number(aroundMkadCount);
if (debug) console.log('Стоимость в пределах 20 км от МКАД: ' + aroundMkadCost);

    var farMkadOneCost = Number(currentDriver.farMkadPrice) * Number((farMkadOne > 0 ? 1 : 0)) + Number(currentDriver.farMkadKmPrice) * Number(farMkadOne) * 2;
if (debug) console.log('Стоимость первой точки: ' + farMkadOneCost);

   var farMkadTwoCost = Number(currentDriver.farMkadPrice) * Number((farMkadTwo > 0 ? 1 : 0)) + Number(currentDriver.farMkadKmPrice) * Number(farMkadTwo) * 2;
if (debug) console.log('Стоимость второй точки: ' + farMkadTwoCost);

   var farMkadThreeCost = Number(currentDriver.farMkadPrice) * Number((farMkadThree > 0 ? 1 : 0)) + Number(currentDriver.farMkadKmPrice) * Number(farMkadThree) * 2;
if (debug) console.log('Стоимость третьей точки: ' + farMkadThreeCost);

    var dorohovCost = currentDriver.dorohovPrice * Number(document.getElementById('dorohov').checked);
if (debug) console.log('Стоимость доставки на Дорохова: ' + dorohovCost);

    var totalValue = internalMkadCost + aroundMkadCost + farMkadOneCost + farMkadTwoCost + farMkadThreeCost + dorohovCost;
if (debug) console.log('Итого: ' + totalValue);

    // calculations complete, printing results.

    jsResults.innerHTML = 'Стоимость внутри МКАД: ' + internalMkadCount + ' x ' + 
    currentDriver.internalMkadPrice + ' = ' + internalMkadCost + '\n' +
    'Стоимость в пределах 20 км от МКАД: ' + aroundMkadCount + ' x ' +
    currentDriver.aroundMkadPrice + ' = ' + aroundMkadCost + '\n' +
    'Стоимость первой точки: ' + farMkadOneCost + '\n' + 
    'Стоимость второй точки: ' + farMkadTwoCost + '\n' + 
    'Стоимость третьей точки: ' + farMkadThreeCost + '\n' + 
    'Стоимость доставки на Генерала Дорохова 18: ' + dorohovCost + '\n' +
    '=====' + '\n' + 'ИТОГО: ' + totalValue;
}

function reset() {
    document.getElementById('js-results').innerHTML = '';
    document.getElementById('internal-mkad').value = '';
    document.getElementById('around-mkad').value = '';
    document.getElementById('far-mkad-1').value = '';
    document.getElementById('far-mkad-2').value = '';
    document.getElementById('far-mkad-3').value = '';
}