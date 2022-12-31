const fs = require('fs');
const readline = require('readline');

var input = [];

async function readInput(){
    
    const rl = readline.createInterface({
        input: fs.createReadStream('./day13.txt'),
        output: process.stdout,
        console: false
    })
    
    for await(const line of rl){
        input.push(line);
    }
}

const main = async () => {
    await readInput(); 
    //console.log(input)

    const compare = (left, right) => {
        //console.log(`${left}, ${right}`)
        if(typeof(left) === 'number' && typeof(right) === 'number') {
            return (left < right ? -1 : left > right ? 1 : 0);
        }

        if(typeof(left) === 'number' && typeof(right) === 'object'){
            const leftArr = [];
            leftArr.push(left);
            return compare(leftArr, right)
        }

        if(typeof(right) === 'number' && typeof(left) === 'object'){
            const rightArr = [];
            rightArr.push(right);
            return compare(left, rightArr)
        }

        else{
            let i = 0;
            for(; i < left.length && i < right.length; i++){
                const inOrder = compare(left[i], right[i]);
                if(inOrder === -1) return -1;
                if(inOrder === 1) return 1;
            }

            if(i >= left.length && i < right.length) return -1;
            if(i < left.length && i >= right.length) return 1;
            return 0;
        }
    }

    const pairs = [];   //Part 1
    let list = [];  //Part 2

    //Part 1
    for(let i = 0; i < input.length;){
        let first = JSON.parse(input[i]), second = JSON.parse(input[i+1]);
        //console.log(first)
        //console.log(second);
        
        const newPair = {'first': first, 'second': second};
      
        pairs.push(newPair);    //Part 1
        list.push(first);   //Part 2
        list.push(second);
        i += 3;
    }

    let sum = 0;

    for(let i = 0; i < pairs.length; i++){
        const left = pairs[i]['first'], right = pairs[i]['second'];
        const compared = compare(left, right);
        //console.log(`${i}: ${compared}`)
        if(compared === -1) sum += i+ 1;
    }

    //console.log(sum)
 
    //Part 2
    const firstDivPack = [];
    const firstDivPackVal = [];
    firstDivPackVal.push(2);
    firstDivPack.push(firstDivPackVal);

    const secondDivPack = [];
    const secondDivPackVal = [];
    secondDivPackVal.push(6);
    secondDivPack.push(secondDivPackVal);

    list.push(firstDivPack);
    list.push(secondDivPack);

    const sortedList = list.sort((a, b) => compare(a, b));
    const indexOne = sortedList.indexOf(firstDivPack)
    const indexTwo = sortedList.indexOf(secondDivPack)

    console.log((indexOne + 1) * (indexTwo + 1))
}

main();