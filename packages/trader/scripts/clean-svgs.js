const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Function to clean SVG content
function cleanSvgContent(content) {
    // Remove XML declaration
    content = content.replace(/<\?xml[^>]*\?>/g, '');

    // Remove comments
    content = content.replace(/<!--[\s\S]*?-->/g, '');

    // Trim whitespace
    content = content.trim();

    return content;
}

// Function to process a single SVG file
function processSvgFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const cleanedContent = cleanSvgContent(content);
        fs.writeFileSync(filePath, cleanedContent, 'utf8');
        console.log(`Cleaned: ${filePath}`);
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error);
    }
}

// Main function to process all SVG files
function processAllSvgs() {
    const svgFiles = glob.sync('src/**/*.svg', {
        cwd: path.resolve(__dirname, '..'),
        absolute: true,
    });

    console.log(`Found ${svgFiles.length} SVG files to process`);

    svgFiles.forEach(processSvgFile);

    console.log('SVG cleanup completed');
}

// Run the script
processAllSvgs();
