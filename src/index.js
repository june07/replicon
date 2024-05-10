#!/usr/bin/env node
import fs from 'fs/promises'
import path from 'path'
import sharp from 'sharp'
import { hideBin } from 'yargs/helpers'
import yargs from 'yargs'
import readline from 'readline'

// Parse command-line arguments
const argv = yargs(hideBin(process.argv))
    .option('input', {
        alias: 'i',
        describe: 'Input SVG logo file',
        type: 'string'
    })
    .option('base-resolutions', {
        alias: 'b',
        describe: 'Base resolutions for the PNG files (comma-separated)',
        default: '16,32,48,128',
        type: 'string'
    })
    .option('output-dir', {
        alias: 'o',
        describe: 'Output directory for the PNG files',
        default: path.join(process.cwd(), 'icons'),
        type: 'string'
    })
    .option('silent', {
        alias: 's',
        describe: 'Silently continue with defaults without prompting the user',
        type: 'boolean'
    })
    .option('magnifications', {
        alias: 'm',
        describe: 'Magnifications for the PNG files (comma-separated)',
        type: 'string'
    })
    .help()
    .argv

async function detectLogoInCurrentDirectory() {
    const files = await fs.readdir(process.cwd())
    const svgFiles = files.filter(file => path.extname(file) === '.svg')
    return svgFiles.length > 0 ? svgFiles[0] : null
}

async function promptUserForConfirmation(logoFile) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    return new Promise((resolve, reject) => {
        rl.question(`No logo file specified. Would you like to use '${logoFile}' as the logo? (yes/no): `, answer => {
            rl.close()
            resolve(answer.toLowerCase() === 'yes')
        })
    })
}

async function resizeAndExportSVG(inputFile, outputDir, baseResolutions, magnifications) {
    const svgBuffer = await fs.readFile(inputFile)

    await fs.mkdir(outputDir, { recursive: true })
    for (const resolution of baseResolutions) {
        for (const magnification of magnifications) {
            const outputFilename = `icon${resolution}${magnification === 1 ? '' : `@${magnification}x`}.png`
            const outputPath = path.join(outputDir, outputFilename)

            await sharp(svgBuffer)
                .resize(resolution * magnification, resolution * magnification)
                .toFile(outputPath)

            console.log(`Exported ${outputFilename}`)
        }
    }
}

async function main(params) {
    const baseResolutions = params?.baseResolutions || argv['base-resolutions'].split(',').map(Number)
    const logoFile = params?.logoFile || argv.input || await detectLogoInCurrentDirectory()
    const outputDirectory = params?.outputDirectory || argv['output-dir']
    const magnifications = params?.magnifications || argv['magnifications'] || [1]

    if (!logoFile) {
        console.error('Error: No logo file found in the current directory or specified as an argument.')
        if (import.meta.url === `file://${process.argv[1]}`) { // Check if being executed as a CLI
            process.exit(1)
        } else {
            throw new Error('No logo file found.')
        }
    }

    if (import.meta.url === `file://${process.argv[1]}` && !argv.input && await detectLogoInCurrentDirectory() && !argv.silent) {
        const confirmed = await promptUserForConfirmation(logoFile)
        if (!confirmed) {
            console.log('Operation canceled by the user.')
        }
    }

    resizeAndExportSVG(logoFile, outputDirectory, baseResolutions, magnifications)
        .then(() => console.log('All PNG files exported successfully'))
        .catch(error => console.error('Error exporting PNG files:', error))
}

main()

export default main