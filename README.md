# Replicon
Replicon (replicate icon) is a CLI tool to resize and export SVG files to other bitmap formats (including PNG, AVIF, GIF, HEIF, JP2, JXL, JPEG, RAW, TIFF, and WEBP).

# Installation

`npm install @667/replicon`
or use npx...
`npx @667/replicon --help`

# Web UI
You can either use it from the CLI as per the usage below or online:
https://replicon.june07.com/

# Usage:
```
$ npx @667/replicon --help
Options:
      --version           Show version number                          [boolean]
  -i, --input             Input SVG logo file                           [string]
  -b, --base-resolutions  Base resolutions for the PNG files (comma-separated)
                                              [string] [default: "16,32,48,128"]
  -o, --output-dir        Output directory for the PNG files
                                           [string] [default: "/tmp/icon/icons"]
  -s, --silent            Silently continue with defaults without prompting the
                          user                                         [boolean]
  -m, --magnifications    Magnifications for the PNG files (comma-separated)
  -f, --output-format     Output image format
                                            [string] [default: "png"]
                                                                        [string]
      --help              Show help                                    [boolean]
```
![image](https://github.com/june07/replicon/assets/11353590/84da004f-4caf-4ae2-aabe-78f1de0e1301)

![image](https://github.com/june07/replicon/assets/11353590/919fd2c5-9d8c-4ec5-b3c0-0b9e8188e281)

Because I got tired of manually replicating (resize, export, repeat) icons using Inkscape and/or Gimp!

