const fs = require('fs');
const readline = require('readline');

var input = [];

async function readInput(){
    
    const rl = readline.createInterface({
        input: fs.createReadStream('./day11.txt'),
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

    let monkeys = [{
        items: [92,73,86, 83, 65, 51, 55, 93],
        op: ((old) =>  Math.floor((old*5))),
        test: ((item) => {
            item % 11 === 0 ? monkeys[3].items.push(item) : monkeys[4].items.push(item);
            }),
        thrown: 0
    }, {
        items: [99, 67, 62, 61, 59, 98],
        op: ((old) =>  Math.floor((old*old))),
        test: ((item) => {
            item % 2 === 0 ? monkeys[6].items.push(item) : monkeys[7].items.push(item);
            }),
        thrown: 0
    }, {
        items: [81, 89, 56, 61, 99],
        op: ((old) =>  Math.floor((old*7))),
        test: ((item) => {
            item % 5 === 0 ? monkeys[1].items.push(item) : monkeys[5].items.push(item);
            }),
        thrown: 0
    }, {
        items: [97, 74, 68],
        op: ((old) =>  Math.floor((old+1))),
        test: ((item) => {
            item % 17 === 0 ? monkeys[2].items.push(item) : monkeys[5].items.push(item);
            }),
        thrown: 0
    }, {
        items: [78, 73],
        op: ((old) =>  Math.floor((old+3))),
        test: ((item) => {
            item % 19 === 0 ? monkeys[2].items.push(item) : monkeys[3].items.push(item);
            }),
        thrown: 0
    }, {
        items: [50],
        op: ((old) =>  Math.floor((old+5))),
        test: ((item) => {
            item % 7 === 0 ? monkeys[1].items.push(item) : monkeys[6].items.push(item);
            }),
        thrown: 0
    }, {
        items: [95, 88, 53, 75],
        op: ((old) =>  Math.floor((old+8))),
        test: ((item) => {
            item % 3 === 0 ? monkeys[0].items.push(item) : monkeys[7].items.push(item);
            }),
        thrown: 0
    }, {
        items: [50, 77, 98, 85, 94, 56, 89],
        op: ((old) => Math.floor((old+2))),
        test: ((item) => {
            item % 13 === 0 ? monkeys[4].items.push(item) : monkeys[0].items.push(item);
            }),
        thrown: 0
    }];

    //Part 1
    /* for(let i = 0; i < 20; i++){
        for(let j = 0; j < 8; j++){
            let monkey = monkeys[j];
            const itemsLength = monkey.items.length;
            for(let k = 0; k < monkey.items.length; k++){
                let worry = monkey.items[k];
                worry = monkey.op(worry);
                monkey.test(worry);
                monkey.thrown++;
            }
            monkey.items.splice(0, itemsLength);
        }
    }


    for(let i = 0; i < monkeys.length; i++){
        console.log(`Monkey ${i} thrown: ${monkeys[i].thrown}`);
    }

    monkeys.sort((a, b) => {
        return b.thrown - a.thrown;
    });

    console.log(`Product: ${monkeys[0].thrown * monkeys[1].thrown}`) */

    //Part 2
    const divisible_by = 11 * 2 * 5 * 17 * 19 * 7 * 3 * 13;
    for(let i = 0; i < 10000; i++){
        for(let j = 0; j < 8; j++){
            let monkey = monkeys[j];
            const itemsLength = monkey.items.length;
            for(let k = 0; k < monkey.items.length; k++){
                let worry = monkey.items[k];
                worry = monkey.op(worry);
                worry %= divisible_by;
                monkey.test(worry);
                monkey.thrown++;
            }
            monkey.items.splice(0, itemsLength);
        }
    }


    for(let i = 0; i < monkeys.length; i++){
        console.log(`Monkey ${i} thrown: ${monkeys[i].thrown}`);
    }

    monkeys.sort((a, b) => {
        return b.thrown - a.thrown;
    });

    console.log(`Product: ${monkeys[0].thrown * monkeys[1].thrown}`)
    
}

main();