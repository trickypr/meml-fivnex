// Variables
var fs = require("fs")
var cliArgs = process.argv.slice(2)
var version = "0"
var output = "!default"

// Functions
function createFile(){
    // Create final HTML file
}

function codeStitcher(){
    // Stitch HTML/CSS together
}

function lexer(ast){
    // Make sense of parsed syntax
    console.log(ast)
}

function replaceAll(string, search, replace) {
    return string.split(search).join(replace)
}

function parser(file){
    var c = 0

    // Split file and remove whitespace
    file = file.split("\n")
    for (i in file){
        file[i] = file[i].trim()
    }

    // Remove comments
    while(c < file.length){
        if(file[c].startsWith("//")){
            /**
             * I hate doing this but NodeJS
             * is a mess and forced my hand 
             * to do this idiotic mess in a
             * stupid while loop inside an
             * if statement
             */
            while(file[c].startsWith("//")){
                file.splice(c, 1)
            }
        }
        c++
    }

    c = 0 // Resets C (count) variable for later use 

    // String together the new file in one line
    file = file.join(",")
    file = replaceAll(file, ",", " ")  // Find fix!!!

    // Split out all keywords
    var splitFile = replaceAll(file, ")","\n)\n")
    splitFile = replaceAll(splitFile, "(","\n(\n")
    splitFile = replaceAll(splitFile, "\"","\n\"\n")
    splitFile = replaceAll(splitFile, " ","\n \n")
    splitFile = splitFile.split("\n")

    for (i in splitFile){
        if(splitFile[i] === ""){
            splitFile.splice(i, 1)
        }
    }

    lexer(splitFile) // Move onto lexer stage
}

// CLI Argument Reading
if (cliArgs[0].endsWith(".meml")){
    // CLI output
    if(cliArgs[1] === "--output " || cliArgs[1] === "-o"){
        output = cliArgs[2]
        console.log("New Output Filename:", output)
    }

    // Read file and call parser
    var text = fs.readFileSync(cliArgs[0]).toString('utf-8')
    parser(text)

} else if (cliArgs[0] === "--help" || cliArgs[0] === "-h"){
    console.log(`    MEML ${version}
    meml [options] [options...] [options...]
    is question's answers are a community effort. Edit existing answers to improve this post. It is not currently accepting new answers or interactions. 
    options:
    -h | --help      - Displays help information
    -v | --version   - Displays version number
    -o | --output    - Sets output file name/location
    
    Default Command Usage:
    meml index.meml
    meml somefile.meml -o outputname.html
    meml --version`)
} else if (cliArgs[0] === "--version" || cliArgs[0] === "-v"){
    console.log("MEML Version:", version)
}