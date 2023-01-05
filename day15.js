const fs = require('fs');
const readline = require('readline');

var input = [];

async function readInput(){
    
    const rl = readline.createInterface({
        input: fs.createReadStream('./day15.txt'),
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

    Part1();
    Part2()
}

const manhattanDist = (x1, y1, x2, y2) => {
    return (Math.abs(x1 - x2) + Math.abs(y1 - y2));
}

const Part1 = () => {

    let map = new Map(); //Poorly named, but stores all sensor and beacon coords
    for(let i = 0; i < input.length; i++){
        const [sensX, sensY, beacX, beacY] = input[i].split(' ').map(x => Number(x));
        map.set(`${sensX},${sensY}`, `${beacX},${beacY}`);
    }

    const noBeaconHere = new Set(); //Add any space where beacon cannot be to this set

    map.forEach((val, key) => {
        const [sensX, sensY] = key.split(',').map(x => Number(x));
        const [beacX, beacY] = val.split(',').map(x => Number(x));
        const thisManDist = manhattanDist(sensX, sensY, beacX, beacY);

        //y = 2,000,000 not closer than beacon
        if(sensY - thisManDist > 2000000 || sensY + thisManDist < 2000000) return;

        const distToTwoMil = Math.abs(sensY - 2000000);
        const numSpotsNoBeacons = ( (Math.abs(thisManDist - distToTwoMil)) * 2 + 1);

        for(let i = sensX - Math.floor(numSpotsNoBeacons/2); i <= sensX + Math.floor(numSpotsNoBeacons/2); i++){
            if(beacY === 2000000 && i === beacX) continue;
            noBeaconHere.add(i)
        }
    })

    console.log('Part 1: ' + noBeaconHere.size);
}

const Part2 = () => {

    let map = new Map(); //Poorly named, but stores all sensor and beacon coords
    for(let i = 0; i < input.length; i++){
        const [sensX, sensY, beacX, beacY] = input[i].split(' ').map(x => Number(x));
        map.set(`${sensX},${sensY}`, `${beacX},${beacY}`);
    }

    let sigX = -1, sigY = -1;

    let voids = [];
    for(let i = 0; i <= 4000000; i++){
        voids[i] = new Array();
    }

    map.forEach((val, key) => {
        const [sensX, sensY] = key.split(',').map(x => Number(x));
        const [beacX, beacY] = val.split(',').map(x => Number(x));
        const manDist = manhattanDist(sensX, sensY, beacX, beacY);

        //console.log("Sensor: " + sensX, sensY)

        let x = sensX-manDist, y = sensY;
        let yMin = y, yMax = y;

        if(x < 0){
            yMin = Math.max(0, yMin + x);
            yMax = Math.min(4000000, yMax - x);
            x = 0;
        }
        
        while(x <= sensX + manDist && x <= 4000000){
            //console.log(x);
            voids[x].push({yMin: yMin, yMax: yMax});

            if(x >= sensX){
                yMin++;
                yMax--;
            }
            else{
                yMin = Math.max(0, yMin - 1);
                yMax = Math.min(4000000, yMax + 1);
            }
            x++;
        }
    })
    
    voids[0].sort((a, b) =>  a.yMin - b.yMin);
    //console.log(voids[0])

    let foundSignal = false;
    for(let x = 0; x < voids.length; x++){
        //console.log(x);
        voids[x].sort((a, b) => a.yMin - b.yMin);
        let highestY = voids[x][0].yMax;
        for(let i = 1; i < voids[x].length; i++){
            //console.log(x, voids[x][i].yMin, highestY)

            if(highestY < voids[x][i].yMin) {
                //console.log(voids[x][i-1].yMax)
                //console.log(voids[x][i].yMin)
                sigX = x;
                sigY = highestY+1;
                foundSignal = true;
                break;
            }

            highestY = Math.max(highestY, voids[x][i-1].yMax, voids[x][i].yMax)
        }

        if(foundSignal) break;
    }

    //console.log(sigX + ', ' + sigY);
    console.log('Part 2: ' + (sigX * 4000000 + sigY))
}
main();