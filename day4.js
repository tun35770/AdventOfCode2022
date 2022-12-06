const fs = require('fs');
const readline = require('readline');

var input = [];

async function readInput(){
    
    const rl = readline.createInterface({
        input: fs.createReadStream('./day4.txt'),
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
    let count1 = 0;
    let count2 
    = 0;
    for(let i = 0; i < input.length; i++){
        const pairs = input[i].split(',')
        const one = pairs[0].split('-')
        const two = pairs[1].split('-')
        let oneStart = Number(one[0])
        let oneEnd = Number(one[1])
        let twoStart = Number(two[0])
        let twoEnd = Number(two[1])

        if(twoStart >= oneStart && twoEnd <= oneEnd || oneStart >= twoStart && oneEnd <= twoEnd) 
            count1++;
        if(twoStart >= oneStart && twoStart <= oneEnd || oneStart >= twoStart && oneStart <= twoEnd) 
            count2++;
    }

    console.log(count1)
    console.log(count2)
}

main()