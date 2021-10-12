dist:
	mkdir -p lcd
	minify lcd.js > lcd/lcd.js

clean:
	rm -rf lcd
