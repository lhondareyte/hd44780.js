/*
 *  Drawing SVG in javascript
 */

const char_width = 6 ; 
const char_height = 8 ; 
/* const backlight_color = "yellow"; */
const backlight_color = "#e2dff7";
/* const back_color = "green"; */
const back_color = "#ccff99"; 
const pixel_color = "black";
const font = font_7x5;

function bitIsSet(c,b) {
    if ((c == undefined) || (b == undefined) || (b > 32)) {
        return -1; 
    }
/*
    c = c >> b;
    return c & 0x00000001;
*/
    return (c >> b ) & 1;
}

function getFontChar (f, c) {
    /* return space if 'c' is not a printable character */
    let ac = c.charCodeAt();
    if (( ac < 0x20) || ( ac > 0xff)) {
        return f[0];
    }
    console.log(ac);
    return f[ac - 0x20]; /* align to ascii table */
}

function LCD_drawchar ( scale, line, column, c) {

    if ( scale == undefined ) { scale = 1; }
    if ( line == undefined ) { line = O; } else { line = line - 1; }
    if ( column == undefined ) { column = 0; } else { column = column ; }
    if ( c == undefined ) { c = " "; }

    let p_size = 3 * scale;        /* pixel size */
    let p_space = 1.2 * scale;     /* space between two pixels */
    let c_space = 0.7 * scale;     /* space between two characters */ 

    let width = ( p_size + p_space) * char_width + c_space ;
    let height = ( p_size + p_space) * char_height + c_space ;

    let svgns = "http://www.w3.org/2000/svg";
    let svg = document.getElementById('svg');
    let shape = document.createElementNS(svgns, "rect");

    let origin_x = c_space + (width * column );
    let origin_y = c_space + (height * line );

    /*  Draw background */

    shape.setAttributeNS(null, "x", origin_x); 
    shape.setAttributeNS(null, "y", origin_y);
    shape.setAttributeNS(null, "width", width);
    shape.setAttributeNS(null, "height", height);
    shape.setAttributeNS(null, "fill", back_color); 
    svg.appendChild(shape);

    /* Draw character */
    let x,y,color;
    let matrix = [];
    matrix = getFontChar(font,c); 
    x = origin_x + c_space;
    for (let j = 0; j < char_width; j++) {  
        y = origin_y + c_space ;
        for (let i = 0; i < char_height ; i++) {
            color = backlight_color;
            if (bitIsSet(matrix[j],i)) {
                color = pixel_color;
            }
            if ( j == char_width - 1 ) {
                color = backlight_color;
            }
            shape = document.createElementNS(svgns, "rect");
            shape.setAttributeNS(null, "x", x);
            shape.setAttributeNS(null, "y", y);
            shape.setAttributeNS(null, "width", p_size);
            shape.setAttributeNS(null, "height", p_size);
            shape.setAttributeNS(null, "fill", color);
            /*
            shape.animate(null, "fill", 1000);
            shape.animate(null, "blink", backlight_color);
            shape.animate(null, "duration", 100000);
            */
            svg.appendChild(shape);
            y = y + p_size + p_space;
        }
        x = x + p_size + p_space;
    }
}

function LCD_clrscr () {
}

function LCD_puts () {
}

function LCD_refresh () {
}
