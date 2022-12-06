const fs = require('fs');
const readline = require('readline');

var input = [];

async function readInput(){
    
    const rl = readline.createInterface({
        input: fs.createReadStream('./day5.txt'),
        output: process.stdout,
        console: false
    })
    
    for await(const line of rl){
        input.push(line);
    }
}

const main = async () => {
    await readInput();
    //console.log(input); 

    let crates = [];
    for(let i = 0; i < 8; i++){
        let line = input[i];
        let rowArr = [];

        for(let j = 0; j < line.length; ){
            if(line.charAt(j) === ' ') 
                rowArr.push(' ');

            else 
                rowArr.push(line.charAt(j + 1));
                
            j += 4;
        }

        crates.push(rowArr)
    }


    let stacksOne = [];
    let stacksTwo = [];
    for(let i = 0; i < 9; i++){
        let col = [];
        for(let j = 7; j >= 0; j--){
            if(crates[j][i] !== ' ') col.push(crates[j][i]);
        }

        stacksOne.push([...col]);
        stacksTwo.push([...col]);
    }

    const partOne = () => {
        for(let i = 10; i < input.length; i++){
            let line = input[i];
            let steps = line.split(' ');
            steps = steps.filter(s => Number(s))
            steps = steps.map(s => Number(s))
    
            for(let i = 0; i < steps[0]; i++){
                stacksOne[steps[2] - 1].push(stacksOne[steps[1] - 1].pop());
            }
            
        }
    
        console.log(stacksOne)
    }

    const partTwo = () => {
        for(let i = 10; i < input.length; i++){
            let line = input[i];
            let steps = line.split(' ');
            steps = steps.filter(s => Number(s))
            steps = steps.map(s => Number(s))
    
            let tempStack = [];
            for(let i = 0; i < steps[0]; i++){
                tempStack.push(stacksTwo[steps[1] - 1].pop());
            }

            //console.log(tempStack)
            for(let i = 0; i < steps[0]; i++){
                stacksTwo[steps[2] - 1].push(tempStack.pop())
            }
            
        }
    
        console.log(stacksTwo)
    }

    console.log("--PART ONE---")
    partOne();
    console.log("---PART TWO---")
    partTwo();
}

main()
