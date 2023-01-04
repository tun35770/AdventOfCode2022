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
    
}

const Part1 = () => {

    const manhattanDist = (x1, y1, x2, y2) => {
        return (Math.abs(x1 - x2) + Math.abs(y1 - y2));
    }

    let map = new Map(); //Poorly named, but stores all sensor and beacon coords
    for(let i = 0; i < input.length; i++){
        const [sensX, sensY, beacX, beacY] = input[i].split(' ').map(x => Number(x));
        map.set(`${sensX},${sensY}`, `${beacX},${beacY}`);
    }

    const noBeaconHere = new Set(); //Add any space where beacon cannot be to this set
    let count = 0;

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

    console.log(noBeaconHere.size);
}

main();