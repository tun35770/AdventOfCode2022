const fs = require('fs');
const readline = require('readline');

var input = [];

async function readInput(){
    
    const rl = readline.createInterface({
        input: fs.createReadStream('./day1.txt'),
        output: process.stdout,
        console: false
    })
    
    for await(const line of rl){
        input.push(line);
    }
}
 const main = async () => {
    let a = await readInput();
    // console.log(input)
    let c = 0;
    let counts = [];
    for(let i = 0; i < input.length; i++){
        if(Number(input[i]) )
            c += Number(input[i])
        else{
            counts.push(c);
            c = 0;
        }
    }

    counts = counts.sort((a, b) =>  a - b)
    console.log(counts[counts.length-1]) //part 1
    console.log(counts[counts.length-1] + counts[counts.length-2] + counts[counts.length-3]) //part 2
}

 main();

