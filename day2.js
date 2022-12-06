const fs = require('fs');
const readline = require('readline');

var input = [];

async function readInput(){
    
    const rl = readline.createInterface({
        input: fs.createReadStream('./day2.txt'),
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
    const signs = {rock: {opp:'A', me:'X'}, paper: {opp:'B', me:'Y'}, scissors:{opp:'C', me:'Z'}}
    let score1 = 0, score2=0;

    for(let i = 0; i < input.length; i++){
        const letters=input[i].split(' ');
        score1 += getPoints(letters[0], letters[1]);
        score2 += getPoints2(letters[0], letters[1]);
    }

    console.log(score1)
    console.log(score2)
}

const getPoints = (opp, me) => {
    let r = 0;
    if(me === 'X'){
        r += 1;
        if(opp === 'A') r += 3;
        else if(opp === 'B') r += 0;
        else r+= 6;
    }
    else if(me ==='Y'){
        r += 2;
        if(opp === 'A') r += 6;
        else if(opp === 'B') r += 3;
        else r += 0;
    }
    else{
        r += 3;
        if(opp === 'A') r += 0;
        else if(opp === 'B') r += 6;
        else r += 3;
    }
    //console.log(`${opp} ${me}`)
    return r;
}

const getPoints2 = (opp, me) => {
    let r = 0;
    if(me === 'X'){
        r += 0;
        if(opp === 'A') r += 3;
        else if(opp === 'B') r += 1;
        else r+= 2;
    }
    else if(me ==='Y'){
        r += 3;
        if(opp === 'A') r += 1;
        else if(opp === 'B') r += 2;
        else r += 3;
    }
    else{
        r += 6;
        if(opp === 'A') r += 2;
        else if(opp === 'B') r += 3;
        else r += 1;
    }
    //console.log(`${opp} ${me}`)
    return r;
}

main();