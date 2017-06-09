wkhtmltoimage --javascript-delay 10000 https://rhoinc.github.io/viz-library/bin/gists/80890e1ff7bdc7f43079/ example_page_1.jpg
wkhtmltoimage --javascript-delay 10000 https://rhoinc.github.io/viz-library/bin/gists/80890e1ff7bdc7f43079/ example_page_2.jpg

move example_page_1.jpg ImageMagick-7.0.5-Q16\example1.jpg
move example_page_2.jpg ImageMagick-7.0.5-Q16\example2.jpg

cd ImageMagick-7.0.5-Q16

magick convert example1.jpg example1.png
magick convert example2.jpg example2.png

move example1.png ..
move example2.png ..

cd ..

pixelmatch example1.png example2.png output.png