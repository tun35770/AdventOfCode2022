const fs = require('fs');
const readline = require('readline');

var input = [];

async function readInput(){
    
    const rl = readline.createInterface({
        input: fs.createReadStream('./day6.txt'),
        output: process.stdout,
        console: false
    })
    
    for await(const line of rl){
        input.push(line);
    }
}

const main = async () => {
    await readInput(); 
    const inputStr = input[0];

    let four = [inputStr.charAt(0), inputStr.charAt(1), inputStr.charAt(2), inputStr.charAt(3)];
    let fourteen = [];
    for(let i = 0; i < 14; i++){
        fourteen.push(inputStr.charAt(i))
    }

    //part one
    for(let i = 4; i < inputStr.length; ){
        if(areDistinct(four)) {
            console.log(i); 
            break;
        }
        else{
            four.shift();
            four.push(inputStr.charAt(i));
            i++;
        }
    }

    //part two
    for(let i = 14; i < inputStr.length; ){
        if(areDistinct(fourteen)) {
            console.log(i); 
            break;
        }
        else{
            fourteen.shift();
            fourteen.push(inputStr.charAt(i));
            i++;
        }
    }
}

main()

const areDistinct = (list) => {
    const uniques = [...new Set(list)]
    return (list.length === uniques.length)
}