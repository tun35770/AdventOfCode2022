const fs = require('fs');
const readline = require('readline');

var input = [];

async function readInput(){
    
    const rl = readline.createInterface({
        input: fs.createReadStream('./day10.txt'),
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

    let cycle = 1;
    let cycleIntervals = [20, 60, 100, 140, 180, 220];
    let reg = 1;
    let queue = [];
    let sum = 0;

    for(let i = 0; i < input.length; i++){
        const [instruction, count] = input[i].split(' ');
        queue.push(0);
        if(count){
            queue.push(Number(count));
        }
        
        if(cycle === cycleIntervals[0]){
            sum += (reg * cycle);
            cycleIntervals.shift();
        }
        
        reg += queue.shift();
        cycle++;
    }

    while(queue.length !== 0){
        if(cycle === cycleIntervals[0]){
            sum += (reg * cycle);
            cycleIntervals.shift();
        }
        
        reg += queue.shift();
        cycle++;
    }

    console.log(sum);

    //Part 2
    let grid = [];
    for(let i = 0; i < 6; i++){
        grid.push([]);
    }

    cycle = 1;
    reg = 1;
    queue = [];
    let crtPos = 0;

    for(let i = 0; i < input.length; i++){
        const [instruction, count] = input[i].split(' ');
        queue.push(0);
        if(count){
            queue.push(Number(count));
        }

        const row = Math.floor(crtPos / 40);
        const col = crtPos % 40;

        if(crtPos%40 === reg-1 || crtPos%40 === reg || crtPos%40 === reg+1){
            grid[row].push('#')
        }
        else{
            grid[row].push('.')
        }
        
        reg += queue.shift();
        cycle++;
        crtPos++;
    }

    while(queue.length !== 0){
        
        const row = Math.floor(crtPos / 40);
        const col = crtPos % 40;

        if(crtPos%40 === reg-1 || crtPos%40 === reg || crtPos%40 === reg+1){
            grid[row].push('#')
        }
        else{
            grid[row].push('.')
        }

        reg += queue.shift();
        cycle++;
        crtPos++;
    }

    for(let i = 0; i < grid.length; i++){
        const line = grid[i].join('');
        console.log(line);
    }
}

main()