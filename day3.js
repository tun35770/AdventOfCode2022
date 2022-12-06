const fs = require('fs');
const readline = require('readline');

var input = [];

async function readInput(){
    
    const rl = readline.createInterface({
        input: fs.createReadStream('./day3.txt'),
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
    let sum1 = 0;
    let sum2 = 0;

    for(let i = 0 ; i < input.length; i++){
        let  n = [input[i].substring(0, (input[i].length / 2)), input[i].substring(input[i].length/2, input[i].length)]
        let l = n[0].split('')
        let r = n[1].split('')
        let a = l.filter(c => r.includes(c))
        sum1 += priorityOf(a[0])
    }

    for(let i = 0 ; i < input.length-2; i+=3){
        let one = input[i].split('')
        let two = input[i+1].split('')
        let three = input[i+2].split('')
        let a = one.filter(c => two.includes(c))
        let b = a.filter(c => three.includes(c))
        sum2 += priorityOf(b[0])
    }
    
    console.log(sum1)
    console.log(sum2)
}

main()

const priorityOf = (c) => {
    const ascii = c.charCodeAt(0);
    if(ascii < 91) return ascii - 38;
    else return ascii - 96
}