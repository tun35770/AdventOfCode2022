const fs = require('fs');
const readline = require('readline');

var input = [];

async function readInput(){
    
    const rl = readline.createInterface({
        input: fs.createReadStream('./day14.txt'),
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

    let grid = [];
    let lowestY = 0, lowestX = 0;

    const resetGrid = () => {
        grid = [];

        for(let i = 0; i < 5000; i++){
            let row = [];
            for(let j = 0; j < 5000; j++){
                row.push(false);
            }
    
            grid.push(row);
        }

        for(let i = 0; i < input.length; i++){
            const line = input[i].split(' -> ')
            for(let j = 0; j < line.length - 1; j++){
                const [x, y] = line[j].split(',').map(n => Number(n));
                const [toX, toY] = line[j+1].split(',').map(n => Number(n));
                
                let xMin = Math.min(x, toX);
                let xMax = Math.max(x, toX);
                let yMin = Math.min(y, toY);
                let yMax = Math.max(y, toY);
    
                if(yMax > lowestY) lowestY = yMax;
                if(xMax > lowestX) lowestX = xMax;
    
                for(let col = xMin; col <= xMax; col++){
                    for(let row = yMin; row <= yMax; row++){
                        grid[row][col] = true;
                    }
                }
            }
        }
    }
    
    resetGrid();

    const dropSand = () => {
        let pos = [0, 500];
        while(true){
            if( !(grid[pos[0] + 1][pos[1]]) ) pos[0] += 1;
            else if(!(grid[pos[0] + 1][pos[1] - 1])) {pos[0] += 1; pos[1] -= 1;}
            else if( !(grid[pos[0] + 1][pos[1] + 1])) {pos[0] += 1; pos[1] += 1;}
            else {
                grid[pos[0]][pos[1]] = true;
                return false;
            }
            
            if(pos[0] >= 4000 || pos[1] >= 4000) return true;
        }
    }

    let voided = false;
    let sandDropped = 0;
    while(true){
        voided = dropSand();
        
        if(voided){
            console.log(sandDropped);
            break;
        }
        
        sandDropped++;

    }
    
    //Part 2
    resetGrid();

    const dropSand2 = () => {
        let pos = [0, 500];
        if(grid[0][500]) return true;

        while(true){
            if( !(grid[pos[0] + 1][pos[1]]) ) pos[0] += 1;
            else if(!(grid[pos[0] + 1][pos[1] - 1])) {pos[0] += 1; pos[1] -= 1;}
            else if( !(grid[pos[0] + 1][pos[1] + 1])) {pos[0] += 1; pos[1] += 1;}
            else {
                grid[pos[0]][pos[1]] = true;
                return false;
            }
            
        }
    }

    const floor = lowestY + 2;
    for(let i = 0; i < 5000; i++){
        grid[floor][i] = true;
    }

    voided = false;
    sandDropped = 0;
    while(true){
        voided = dropSand2();
       
        if(voided){
            console.log(sandDropped);
            break;
        }
        
        sandDropped++;
        
    }
}

main();