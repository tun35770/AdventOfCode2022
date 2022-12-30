const fs = require('fs');
const { toASCII } = require('punycode');
const readline = require('readline');

var input = [];

async function readInput(){
    
    const rl = readline.createInterface({
        input: fs.createReadStream('./day12.txt'),
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
    let pos = {x:0, y:0};
    let end = {x:0, y:0};
    let visited = new Map();
    
    for(let i = 0; i < input.length; i++){
        let line = input[i].split('')
        if(line.indexOf('S') !== -1) {
            pos.x = i;
            pos.y = line.indexOf('S')
        }
        if(line.indexOf('E') !== -1) {
            end.x = i;
            end.y = line.indexOf('E')
        }
        grid.push(input[i].split(''));
    }

    let minSteps = 9999999999;

    const getHeight = (letter) => {
        if(letter === 'E') return 'z'.charCodeAt(0);
        if(letter === 'S') return 'a'.charCodeAt(0);
        return letter.charCodeAt(0)
    }

    const canStep = (myX, myY, toX, toY) => {
        if(toX < 0 || toY < 0 || toX >= grid.length || toY >= grid[toX].length) return false;
        let toHeight = grid[toX][toY];
        let myHeight = grid[myX][myY];
        //console.log(`${myHeight},${toHeight}`)
        return (getHeight(myHeight) + 1 >= getHeight(toHeight)) 
    }

    const step = (x, y, steps) => {
        
        //console.log(`${x}, ${y}`)
        let mySteps = steps;
        if(mySteps >= minSteps) return;
        if(x === end.x && y === end.y) {
            if(mySteps < minSteps) minSteps = mySteps;
            return;
        }  

        if(visited.get(`${x},${y}`) <= mySteps) return;
        visited.set(`${x},${y}`, mySteps)
        //console.log(`${y},${x}`)
        if(canStep(x,y,x-1,y)) step(x-1,y,mySteps+1);
        if(canStep(x,y,x+1,y)) step(x+1,y,mySteps+1);
        if(canStep(x,y,x,y-1)) step(x,y-1,mySteps+1);
        if(canStep(x,y,x,y+1)) step(x,y+1,mySteps+1);
    }

    let lowElevationPoints = new Map();
    for(let i = 0; i < grid.length; i++){
        for(let j = 0; j < grid[i].length; j++){
            if(getHeight(grid[i][j]) === 97) lowElevationPoints.set(`${i} ${j}`, 10000);
        }
    }

    const step2 = (x, y, steps) => {
        
        if(steps > 440) return;
        //console.log(`${x}, ${y}`)
        let mySteps = steps;
        if(mySteps >= minSteps) return;
        if(x === end.x && y === end.y) {
            if(mySteps < minSteps) minSteps = mySteps;
            return;
        }  

        if(visited.get(`${x},${y}`) <= mySteps) return;

        if(lowElevationPoints.get(`${x} ${y}`) > mySteps){
            lowElevationPoints.set(`${x} ${y}`, mySteps);
        }
        
        visited.set(`${x},${y}`, mySteps)
        //console.log(`${y},${x}`)
        if(canStep(x,y,x-1,y)) step2(x-1,y,mySteps+1);
        if(canStep(x,y,x+1,y)) step2(x+1,y,mySteps+1);
        if(canStep(x,y,x,y-1)) step2(x,y-1,mySteps+1);
        if(canStep(x,y,x,y+1)) step2(x,y+1,mySteps+1);
    }

    //Part 1
    //step(pos.x, pos.y, 0);
    //console.log(minSteps)

    //Part 2
    let newMinSteps = 999999;
    lowElevationPoints.forEach((val, key) => {
        
        let [x, y] = key.split(' ');
        x = Number(x); y = Number(y);
        console.log(x + ',' + y);
        step2(x, y, 0);
        if(minSteps < newMinSteps) newMinSteps = minSteps;
        console.log(newMinSteps);
        visited = new Map();
        minSteps = 9999999;
    })
}

main();