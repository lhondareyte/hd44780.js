import {default_font, newLCD} from '../lcd.mjs';
var LCD = new Lcd('svg');

function updateText(e) {
   LCD.clear();
   LCD.puts(e.target.value);
}

LCD.clear();
LCD.puts("    Hello\n    World!");
const input = document.querySelector('input');
const log = document.getElementById('values');
input.addEventListener('input', updateText);
