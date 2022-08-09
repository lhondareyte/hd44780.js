/*
  Copyright (c) 2021-2022 Luc Hondareyte
  Javascript module to mimic an alphanumeric LCD display

*/

/* Default 7x5 font */

const default_font = [
    /* Offset = 0x20 */
    [ 0x00, 0x00, 0x00, 0x00, 0x00 ],  /* space */
    [ 0x00, 0x00, 0x5F, 0x00, 0x00 ],  /*   !   */
    [ 0x00, 0x07, 0x00, 0x07, 0x00 ],  /*   "   */
    [ 0x14, 0x7F, 0x14, 0x7F, 0x14 ],  /*   #   */
    [ 0x24, 0x2A, 0x7F, 0x2A, 0x12 ],  /*   $   */
    [ 0x23, 0x13, 0x08, 0x64, 0x62 ],  /*   %   */
    [ 0x36, 0x49, 0x55, 0x22, 0x50 ],  /*   &   */
    [ 0x00, 0x00, 0x05, 0x03, 0x00 ],  /*   '   */
    [ 0x00, 0x1C, 0x22, 0x41, 0x00 ],  /*   (   */
    [ 0x00, 0x41, 0x22, 0x1C, 0x00 ],  /*   )   */
    [ 0x14, 0x08, 0x3E, 0x08, 0x14 ],  /*   *   */
    [ 0x08, 0x08, 0x3E, 0x08, 0x08 ],  /*   +   */
    [ 0x00, 0x00, 0x50, 0x30, 0x00 ],  /*   ,   */
    [ 0x08, 0x08, 0x08, 0x08, 0x08 ],  /*   -   */
    [ 0x00, 0x60, 0x60, 0x00, 0x00 ],  /*   .   */
    [ 0x20, 0x10, 0x08, 0x04, 0x02 ],  /*   /   */
    [ 0x3E, 0x51, 0x49, 0x45, 0x3E ],  /*   0   */
    [ 0x00, 0x42, 0x7F, 0x40, 0x00 ],  /*   1   */
    [ 0x42, 0x61, 0x51, 0x49, 0x46 ],  /*   2   */
    [ 0x41, 0x41, 0x45, 0x4B, 0x31 ],  /*   3   */
    [ 0x18, 0x14, 0x12, 0x7F, 0x10 ],  /*   4   */
    [ 0x47, 0x45, 0x45, 0x45, 0x39 ],  /*   5   */
    [ 0x3C, 0x4A, 0x49, 0x49, 0x30 ],  /*   6   */
    [ 0x01, 0x01, 0x79, 0x05, 0x03 ],  /*   7   */
    [ 0x36, 0x49, 0x49, 0x49, 0x36 ],  /*   8   */
    [ 0x06, 0x49, 0x49, 0x29, 0x1E ],  /*   9   */
    [ 0x00, 0x36, 0x36, 0x00, 0x00 ],  /*   :   */
    [ 0x00, 0x56, 0x36, 0x00, 0x00 ],  /*   ;   */
    [ 0x08, 0x14, 0x22, 0x41, 0x00 ],  /*   <   */
    [ 0x14, 0x14, 0x14, 0x14, 0x14 ],  /*   =   */
    [ 0x00, 0x41, 0x22, 0x14, 0x08 ],  /*   >   */
    [ 0x02, 0x01, 0x51, 0x09, 0x06 ],  /*   ?   */
    [ 0x32, 0x49, 0x79, 0x41, 0x3E ],  /*   @   */
    [ 0x7E, 0x11, 0x11, 0x11, 0x7E ],  /*   A   */
    [ 0x7F, 0x49, 0x49, 0x49, 0x36 ],  /*   B   */
    [ 0x3E, 0x41, 0x41, 0x41, 0x22 ],  /*   C   */
    [ 0x7F, 0x41, 0x41, 0x41, 0x3E ],  /*   D   */
    [ 0x7F, 0x49, 0x49, 0x49, 0x41 ],  /*   E   */
    [ 0x7F, 0x09, 0x09, 0x09, 0x01 ],  /*   F   */
    [ 0x3E, 0x41, 0x49, 0x49, 0x39 ],  /*   G   */
    [ 0x7F, 0x08, 0x08, 0x08, 0x7F ],  /*   H   */
    [ 0x00, 0x41, 0x7F, 0x41, 0x00 ],  /*   I   */
    [ 0x30, 0x40, 0x41, 0x3F, 0x01 ],  /*   J   */
    [ 0x7F, 0x08, 0x14, 0x22, 0x41 ],  /*   K   */
    [ 0x7F, 0x40, 0x40, 0x40, 0x40 ],  /*   L   */
    [ 0x7F, 0x02, 0x0C, 0x02, 0x7F ],  /*   M   */
    [ 0x7F, 0x02, 0x04, 0x08, 0x7F ],  /*   N   */
    [ 0x3E, 0x41, 0x41, 0x41, 0x3E ],  /*   O   */
    [ 0x7F, 0x09, 0x09, 0x09, 0x06 ],  /*   P   */
    [ 0x3E, 0x41, 0x51, 0x21, 0x5E ],  /*   Q   */
    [ 0x7F, 0x09, 0x19, 0x29, 0x46 ],  /*   R   */
    [ 0x46, 0x49, 0x49, 0x49, 0x31 ],  /*   S   */
    [ 0x01, 0x01, 0x7F, 0x01, 0x01 ],  /*   T   */
    [ 0x3F, 0x40, 0x40, 0x40, 0x3F ],  /*   U   */
    [ 0x1F, 0x20, 0x40, 0x20, 0x1F ],  /*   V   */
    [ 0x3F, 0x40, 0x30, 0x40, 0x3F ],  /*   W   */
    [ 0x63, 0x14, 0x08, 0x14, 0x63 ],  /*   X   */
    [ 0x03, 0x04, 0x78, 0x04, 0x03 ],  /*   Y   */
    [ 0x61, 0x51, 0x49, 0x45, 0x43 ],  /*   Z   */
    [ 0x00, 0x7F, 0x41, 0x41, 0x00 ],  /*   [   */
    [ 0x02, 0x04, 0x08, 0x10, 0x20 ],  /*   \   */
    [ 0x00, 0x41, 0x41, 0x7F, 0x00 ],  /*   ]   */
    [ 0x04, 0x02, 0x01, 0x02, 0x04 ],  /*   ^   */
    [ 0x40, 0x40, 0x40, 0x40, 0x40 ],  /*   _   */
    [ 0x00, 0x01, 0x02, 0x04, 0x00 ],  /*   `   */
    [ 0x20, 0x54, 0x54, 0x54, 0x78 ],  /*   a   */
    [ 0x7F, 0x48, 0x44, 0x44, 0x38 ],  /*   b   */
    [ 0x38, 0x44, 0x44, 0x44, 0x20 ],  /*   c   */
    [ 0x38, 0x44, 0x44, 0x48, 0x7F ],  /*   d   */
    [ 0x38, 0x54, 0x54, 0x54, 0x18 ],  /*   e   */
    [ 0x08, 0x7E, 0x09, 0x01, 0x02 ],  /*   f   */
    [ 0x18, 0xA4, 0xA4, 0xA4, 0x7C ],  /*   g   */
    [ 0x7F, 0x08, 0x04, 0x04, 0x78 ],  /*   h   */
    [ 0x00, 0x44, 0x7D, 0x40, 0x00 ],  /*   i   */
    [ 0x20, 0x40, 0x40, 0x3D, 0x00 ],  /*   j   */
    [ 0x7F, 0x10, 0x28, 0x44, 0x00 ],  /*   k   */
    [ 0x00, 0x41, 0x7F, 0x40, 0x00 ],  /*   l   */
    [ 0x7C, 0x04, 0x18, 0x04, 0x78 ],  /*   m   */
    [ 0x7C, 0x08, 0x04, 0x04, 0x78 ],  /*   n   */
    [ 0x38, 0x44, 0x44, 0x44, 0x38 ],  /*   o   */
    [ 0xFC, 0x24, 0x24, 0x24, 0x18 ],  /*   p   */
    [ 0x18, 0x24, 0x24, 0x24, 0xFC ],  /*   q   */
    [ 0x7C, 0x08, 0x04, 0x04, 0x08 ],  /*   r   */
    [ 0x48, 0x54, 0x54, 0x54, 0x20 ],  /*   s   */
    [ 0x04, 0x3F, 0x44, 0x40, 0x20 ],  /*   t   */
    [ 0x3C, 0x40, 0x40, 0x20, 0x7C ],  /*   u   */
    [ 0x1C, 0x20, 0x40, 0x20, 0x1C ],  /*   v   */
    [ 0x3C, 0x40, 0x30, 0x40, 0x3C ],  /*   w   */
    [ 0x44, 0x28, 0x10, 0x28, 0x44 ],  /*   x   */
    [ 0x1C, 0xA0, 0xA0, 0xA0, 0x7C ],  /*   y   */
    [ 0x44, 0x64, 0x54, 0x4C, 0x44 ],  /*   z   */
    [ 0x00, 0x08, 0x66, 0x41, 0x01 ],  /*   {   */
    [ 0x00, 0x00, 0x7F, 0x00, 0x00 ],  /*   |   */
    [ 0x00, 0x41, 0x66, 0x08, 0x00 ],  /*   }   */
    [ 0x10, 0x08, 0x18, 0x10, 0x08 ],  /*   ~   */
    [ 0xff, 0xff, 0xff, 0xff, 0xff ]   /* block */
];

class newLCD {
    constructor (id) {
        this.documentId = id;
        this.rows = 2;
        this.columns = 16;
        this.width = 400;
        this.height = 50;
        this.scale = 1;
        this.font = default_font;
        this.backlight = 'yellow';
        this.pixelColor = 'black';
        this.backColor = '#ccff99';      // Pixel color when off
        this.displayBuffer = new Array (this.rows * this.columns) ; 
        this.pixelShape = 'square';

        /* character dimensions in pixels */
        const char_width = 6 ; 
        const char_height = 8 ; 

        /* Current cursor location (index in displayBuffer[] ) */
        this.current_location = 0;

        function  bitIsSet(c,b) {
            if ((c == undefined) || (b == undefined) || (b > 32)) {
                return -1; 
            }
            return (c >> b) & 1;
        }

        function getFontChar (f, ch) {
            /* return space character if 'c' is not a printable */
            let ac = ch.charCodeAt();
            if (( ac < 0x20) || ( ac > 0xff)) {
                return f[0];
            }
            return f[ac - 0x20]; /* align to ascii table */
        }

        /* LCD_drawchar(line, column, character */
        this.drawchar = function (l, c, ch) {

            l = l ? l : 0;
            c = c ? c : 0;
            ch = ch ? ch : " ";

            let p_size = 3 * this.scale;        /* pixel size */
            let p_space = 1.2 * this.scale;     /* space between two pixels */
            let c_space = 0.7 * this.scale;     /* space between two characters */ 

            let w = ( p_size + p_space ) * char_width + c_space ;
            let h = ( p_size + p_space ) * char_height + c_space ;

            let svgns = "http://www.w3.org/2000/svg";
            let svg = document.getElementById(this.documentId);

            let origin_x = c_space + ( w * c );
            let origin_y = c_space + ( h * l );

            /* Draw background */
            let shape = document.createElementNS(svgns, "rect");
            shape.setAttributeNS(null, "x", origin_x); 
            shape.setAttributeNS(null, "y", origin_y);
            shape.setAttributeNS(null, "width", w);
            shape.setAttributeNS(null, "height", h);
            shape.setAttributeNS(null, "fill", this.backColor); 
            svg.appendChild(shape);

            /* Draw character */
            let x,y,color;
            let matrix = [];
            matrix = getFontChar(this.font,ch); 
            x = origin_x + c_space;
            for (let j = 0 ; j < char_width ; j++) {  
                y = origin_y + c_space ;
                for (let i = 0 ; i < char_height ; i++) {
                    color = this.backlight;
                    if (bitIsSet(matrix[j], i)) {
                        color = this.pixelColor;
                    }
                    if ( j == char_width - 1 ) {
                        color = this.backlight;
                    }
                    if ( this.pixelShape === 'square' ) {
                        shape = document.createElementNS(svgns, "rect");
                        shape.setAttributeNS(null, "x", x);
                        shape.setAttributeNS(null, "y", y);
                        shape.setAttributeNS(null, "width", p_size);
                        shape.setAttributeNS(null, "height", p_size);
                    }
                    if ( this.pixelShape === 'round' ) {
                        shape = document.createElementNS(svgns, "circle");
                        shape.setAttributeNS(null, "r", p_size / 2);
                        shape.setAttributeNS(null, "cx", x + (p_size / 2));
                        shape.setAttributeNS(null, "cy", y + (p_size / 2));
                    }
                    shape.setAttributeNS(null, "fill", color);
                    svg.appendChild(shape);
                    y = y + p_size + p_space;
                }
                x = x + p_size + p_space;
            }
        }

        /* Update display */
        this.refresh = function() {
            let c = 0;    // Character counter
            for (let i = 0 ; i< this.rows ; i++) {
                for (let j = 0 ; j < this.columns ; j++) {
                    this.drawchar(i, j, this.displayBuffer[c]);
                    c++;
                }
            }
        }

        /* Clear all display */
        this.clear = function() {
            for (let i = 0 ; i < this.rows * this.columns ; i++) {
                this.displayBuffer[i] = " ";
            }
            this.current_location = 0;
            this.refresh();
        }

        /*
         *  Move cursor to (x,y)
         *             x
         *     +---+---+---+---+
         *     |1,1|   |   |   |
         *  y  +---+---+---+---+
         *     |   |   |   |4,2|
         *     +---+---+---+---+
         */
        this.gotoxy = function(x,y) {
            if ( typeof x == 'number' && typeof y == 'number' ) {
                this.current_location = (this.columns * (y - 1) ) + x - 1;
            }
        }

        /* Return current line numbner */
        this.currentLine = function () {
            var l = Math.floor (this.current_location / this.columns);
            var r = this.current_location % this.columns ; 
            if ( r != 0 ) { l = l + 1; }
            return (l);
        }

        /* Print string at current location */
        this.puts = function(s) {
            const a = s.split('');
            if ( typeof s == 'string' ) {
                for (let i = 0 ; i < a.length; i++) {
                    if ( this.current_location > (this.columns * this.rows ) ) { break; }
                    /* new line character */
                    if ( a[i] == '\n' ) {
                        this.current_location = ( this.currentLine() * this.columns ) ;
                    }
                    else {
                        this.displayBuffer[this.current_location] = a[i];
                        this.current_location++;
                    }
                }
                this.refresh();
            }
        }

        /* Select alternate font */
        this.setFont = function(a) {
            if ( typeof n == 'array' ) {
                this.font = a;
                this.refresh();
            }
        }

        this.setRows = function(n) {
            if ( typeof n == 'number' ) {
                this.rows = n;
                this.displayBuffer.length = this.rows * this.columns ; 
                this.refresh();
            }
        }

        this.setColumns = function(n) {
            if ( typeof n == 'number' ) {
                this.columns = n;
                this.displayBuffer.length = this.rows * this.columns ; 
                this.refresh();
            }
        }

        /* Set backlight color */
        this.setBacklight = function(n) {
            if ( typeof n == 'string' ) {
                this.backlight = n;
                this.refresh();
            }
        }

        this.setPixelShape = function(n) {
            if ( n === 'square' || n === 'round' ) {
                this.pixelShape = n;
                this.refresh();
            }
        }

        this.setBackColor = function(n) {
            if ( typeof n == 'string' ) {
                this.backColor = n;
                this.refresh();
            }
        }

        this.setPixelColor = function(n) {
            if ( typeof n == 'string' ) {
                this.pixelColor = n;
                this.refresh();
            }
        }

        /* Set scale, default 1 */
        this.setScale = function(n) {
            if ( typeof n == 'number' && n > 0) {
                this.scale = n;
            }
        }
    }
}

export { newLCD, default_font };
