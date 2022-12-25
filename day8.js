const fs = require('fs');
const readline = require('readline');

var input = [];

async function readInput(){
    
    const rl = readline.createInterface({
        input: fs.createReadStream('./day8.txt'),
        output: process.stdout,
        console: false
    })
    
    for await(const line of rl){
        input.push(line);
    }
}

let sys = {};

const main = async () => {
    await readInput(); 
    //console.log(input)

    const isVisible = (row, col) => {
        let val = grid[row][col];
        let flag = true;

        //check top col
        for(let i = 0; i < row; i++){
            if(grid[i][col] >= val) {
                flag = false;
                break;
            }
        }

        if(flag) return true;
        flag=true;

        //check down col
        for(let i = row+1; i < grid.length; i++){
            if(grid[i][col] >= val) {
                flag = false;
                break;
            }
        }
        
        if(flag) return true;
        flag=true;

        //check left row
        for(let j = 0; j < col; j++){
            if(grid[row][j] >= val) {
                flag = false;
                break;
            }
        }

        if(flag) return true;
        flag=true;

        //check right row
        for(let j = col+1; j < grid[row].length; j++){
            if(grid[row][j] >= val) {
                flag = false;
                break;
            }
        }

        return flag;
    }

    const viewDistance = (row, col) => {
        let val = grid[row][col];
        let distance = 1;
        let count = 0;

        //check top col
        for(let i = row-1; i >= 0; i--){
            count++;
            if(grid[i][col] >= val) {
                break;
            }
        }

        distance *= count;
        count = 0;

        //check down col
        for(let i = row+1; i < grid.length; i++){
            count++;
            if(grid[i][col] >= val) {
                break;
            }  
        }
        
        distance *= count;
        count = 0;

        //check left row
        for(let j = col-1; j >= 0; j--){
            count++;
            if(grid[row][j] >= val) {
                break;
            }
        }

        distance *= count;
        count = 0;

        //check right row
        for(let j = col+1; j < grid[row].length; j++){
            count++;
            if(grid[row][j] >= val) {
                break;
            }
        }

        distance *= count;
        return distance;
    }

    let grid = [];

    
    for(let i = 0; i < input.length; i++){
        const line = input[i].split('').map(num => Number(num));
        grid.push(line);
    }
 
    //Part 1
    let sum = 0;
  
    for(let i = 0; i < grid.length; i++){

        for(let j = 0; j < grid[i].length; j++){
            if(isVisible(i, j)) sum++;
        }
    }

    //Part 2
    let maxDistance = 0;
    for(let i = 1; i < grid.length-1; i++){

        for(let j = 1; j < grid[i].length-1; j++){
            const view = viewDistance(i, j);
            if(view > maxDistance) maxDistance = view;
        }
    }
   
    console.log(sum);
    console.log(maxDistance);
}

main()