// Variables adjusting orbit radius
let base_r = 110;
let r = base_r;
let r_difference = 150;
let r_distance = r_difference;
let a = 0;

// Variables to change speed
let delay = 1;
let speed = 1.0;

// Color
let red;
let green;
let blue;
/* Target color is rgb(120,58,255) */

let meditating = false;

// Positioniing dogs
let x = 0;
let y = 0;

let w = 0;
let h = 0;

function ready(f){/in/.test(document.readyState)?setTimeout('ready('+f+')',9):f()}
ready(function(){
    console.log('DOM Ready!');
	
    // Color
    let element = document.querySelector('#heart');
    let colorString = getComputedStyle(element).backgroundColor
    let color = colorString.substring(colorString.indexOf('(') + 1, colorString.lastIndexOf(')')).split(/,\s*/);
    red = color[0];
    green = color[1];
    blue = color[2];

    console.log(red,green,blue);
    
});

function rotate(a) {

	// console.log(document.querySelector('.container').clientWidth);
	// console.log(document.querySelector('.container').clientHeight);

	w = document.querySelector('.container').clientWidth;
	h = document.querySelector('.container').clientHeight;
	x = (w/2) - (document.querySelector('#bentley').clientWidth/2);
	y = (h/2) - (document.querySelector('#bentley').clientHeight/2);

    let px = x + r * Math.cos(a);
    let py = y + r * Math.sin(a);

    document.querySelector('#bentley').style.left = px + "px";
    document.querySelector('#bentley').style.top = py + "px";

    let px2 = x + r * Math.cos(a-1);
    let py2 = y + r * Math.sin(a-1);

    document.querySelector('#ferrari').style.left = px2 + "px";
    document.querySelector('#ferrari').style.top = py2 + "px";


}

// let styleElem = document.head.appendChild(document.createElement("style"));
// let styleElem2 = document.head.appendChild(document.createElement("style2"));

function meditate() {
    meditating = true;
}

function stopMeditate() {
    meditating = false;
}

setInterval( function() {
    if (meditating) {
        if (r_distance > 0) {
            r_distance -= (speed*r_difference)/1080
        }
        if (delay <= 700) {
            delay++;
        }
        if (speed > 0.5) {
            speed -= 1/1000;
        }
        // Set color change
        if (red > 120) { red--; }
        if (green > 0) { green--; }
        if (blue < 255) { blue++; }
        document.querySelector('.heart').style.backgroundColor = `rgb(${red},${green},${blue})`;
        document.querySelector('.heart-left').style.backgroundColor = `rgb(${red},${green},${blue})`;
        document.querySelector('.heart-right').style.backgroundColor = `rgb(${red},${green},${blue})`;
    } else {
        if (r_distance <= r_difference) {
            r_distance += (speed*r_difference)/1080
        }

        if (delay > 1) {
            delay--;
        }
        if (speed <= 1.0) {
            speed += 1/1000;
        }
        // Reset color change
        if (red < 255) { red++; }
        if (green > 0) { green--; }
        if (blue > 0) { blue--; }
        document.querySelector('.heart').style.backgroundColor = `rgb(${red},${green},${blue})`;
        document.querySelector('.heart-left').style.backgroundColor = `rgb(${red},${green},${blue})`;
        document.querySelector('.heart-right').style.backgroundColor = `rgb(${red},${green},${blue})`;
    }
    r = r_distance + base_r;

    a = (a + ((speed*Math.PI) / 360) % (Math.PI * 2));
    rotate(a);
}, delay)