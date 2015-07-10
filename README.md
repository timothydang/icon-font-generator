# Icon Font Generator

A simple grunt powered workflow that allows developer to easily generate icon fonts from SVG and EPS files.


## To get started

FYI, we are using grunt-webfont plugin to generate icon font from SVG and EPS files https://github.com/sapegin/grunt-webfont

1. Install fontforge

    ```sudo apt-get install fontforge```

2. Install ttfautohint

    ```sudo apt-get install ttfautohint```

    Make sure that you installed version 1.3 or later of ttfautohint by running `ttfautohint --version` (especially version `0.9.7` as it was a broken release) 

3. Install Grunt - execute:

    ```npm install --global grunt-cli```

4. Go to the root directory of the project to install all node's dependent package for the project - execute:

    ```npm install```

5. Build the project - execute:

    ```grunt --config=config/default.json```

6. To watch for file changes and automatically recompile - execute:

    ```grunt watch --config=config/default.json```


7. The icon fonts will be generated in `dist/fonts`
    * Also, open `dist/icons.html` to verify that fonts are being displayed correctly.

8. PROFIT!!!

## Configurations

Default paths:

* The SVG files are stored in `src/icons/svgs`
* The EPS files are stored in `src/icons/eps`

You can customise the font relative path:

* Copy `config/default.json` into `config/myConfig.json`
* Customise the settings inside `config/myConfig.json`, e.g. the path where the font will be hosted.
* To use the config, execute:

  ```grunt --config=config/customConfig.json```

* To watch for file changes and automatically recompile with the new config - execute:

  ```grunt doWatch --config=config/customConfig.json```


## How to generate icon from Illustrator

1. Generate Icon Images in Illustrator

* * Ensure each icons have the same canvas dimension (we are using 300px x 300px).
* When drawing each icon in the canvas, ensure the icon are horizontally AND vertically centered.
* IMPORTANT: you must ensure the above 2 steps are being followed exactly - otherwise you will end up with icons with inconsistent sizes and centering.

* Convert the icon into compound path
  * This is done by selecting toolbar menu Object -> Compund Path -> Make
  * The result of this conversion will be the same as how the icon will be displayed as a font
  * If the icon looks wrong, this means there are paths which are not closed properly - ask your designer's help to fix this, or redo the icon.

* Save the icon as EPS into src/icons/eps
  * IMPORTANT: make sure you have "Use Artboard" ticked when you are saving the image
  * This will ensure the dimensions of the EPS will be remembered when you open the icon next time, as well as when you are saving the SVG image.
  * Enter these settings on the prompt:
    * Version: Illustrator CC EPS
    * Preview Format: TIFF (8-bit Color)
    * Select Transparent radio button
    * Tick the following:
      * Embed Fonts (for other applications)
      * Include Document Thumbnails
      * Include CMYK PostScript in RGB Files
    * Adobe Postscript: LanguageLevel2
  * Click OK to save

2. Generate SVG from the EPS file
* Open the EPS file of the icon you'd like to convert.
* Select toolbar menu File -> Save As
* Navigate to src/icons/svg directory
* Change file type to SVG (*.SVG)
* IMPORTANT: make sure you have "Use Artboard" ticked when you are saving the image
  * This will ensure the SVG saved has the correct coordinate and viewbox settings which are required to render the font correctly.
* You will be prompted for SVG settings, click on 'More Options' button
* Enter these settings on the prompt:
  * SVG Profiles: SVG 1.1
  * Type: SVG
  * Subsetting: None (Use System Fonts)
  * Image Location: Embed
  * CSS Properties: Presentation Attributes
  * Decimal Places: 3
  * Encoding: UTF-8
  * Tick the following:
    * Output fewer <tspan> elements
    * Use <textPath> element for Text on Path
    * Responsive


## Troubleshootings

1. My icon are not respecting the CSS baseline!

  This is mostly caused by incorrect viewbox settings on the SVG.
    * How to detect:
      * Open the corresponding SVG file using a text editor.
      * Look at the viewbox attribute - it should start at 0 0, e.g. `viewBox="0 0 ...`

    * How to fix:
      * Unfortunately, you must fix this from the EPS file.
      * Open the corresponding EPS file using Adobe Illustrator.
      * Select all paths - `Ctrl+A` (or Command+A in Apple)
      * Copy them - `Ctrl+C` (or Command+C)
      * Create a new document with the correct dimension (300px x 300px)
      * Paste the path - `Ctrl+V` (or Command+V)
      * Save the document as EPS with the settings described in Step 1, replacing the original EPS file.
      * Regenerate the SVG file, and rebuild the fonts

2. My icon looks all black - what's going on?

  This is mostly caused by unclosed paths in the EPS.

    * How to detect:
      * Open the corresponding EPS file using illustrator.
      * Convert to Compound Path (selecting toolbar menu Object -> Compund Path -> Make)
      * You should see the icons are now all filled with black colour as well.

    * How to fix:
      * You can't fix this yourself unfortunately - get a designer's help
      * Either you find a path which is not closed
      * Or re-create the icon from scratch.

3. Further readings on SVG icon font workflow

- http://www.sitepoint.com/create-an-icon-font-illustrator-icomoon/