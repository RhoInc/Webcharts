This README describes the process for the automated visual testing of WebCharts...

PROCESS:
The script is for comparing two websites visual renderings against each other.
For comparing a website to a previously passed version of itself, simply change one of the png files in the pixelmatch call
1. Open the compare_images.bat script for editing
      1a. Update the <10000> to however many msec delay is desired
            to allow for sufficient rendering time
      1b. Update the URL to whatever website you want to test
2. Execute the script
3. The difference between the two images can be found in the output.png file

TOOLS:
Converting html to jpg image:
https://wkhtmltopdf.org/
https://github.com/wkhtmltopdf/wkhtmltopdf

Converting jpg to png:
https://www.imagemagick.org/script/convert.php

Pixel comparison between the png files:
https://github.com/mapbox/pixelmatch