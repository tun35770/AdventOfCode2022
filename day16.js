const { assert } = require('console');
const fs = require('fs');
const readline = require('readline');

var input = [];

async function readInput(){
    
    const rl = readline.createInterface({
        input: fs.createReadStream('./day16.txt'),
        output: process.stdout,
        console: false
    })
    
    for await(const line of rl){
        input.push(line);
    }
}

const Nodes = [];
const visited = new Map();

//Node constructor
const Node = (valve, rate, valves) => {
    return {
        valve: valve,
        rate: rate,
        valves: valves
    };
}

const Part1 = () => {
    const timeRemaining = 30;

    //parse input
    for(let i = 0; i < input.length; i++){
        const line = input[i].split(' ')
        const valve = line[0];
        const rate = Number(line[1])
        const valves = [];
        for(let j = 2; j < line.length; j++){
            valves.push(line[j])
        }

        Nodes.push(Node(valve, rate, valves));
    }

    let cloud = [];
    const startNode = Nodes.filter(n => n.valve === 'AA')[0];
    const cloudObj = {
        node: startNode,
        pressure: 0,
        time: timeRemaining,
        onValves: []
    }
    cloud.push(cloudObj);

    let map = new Map();
    let maxPressure = 0;

    //Using Breadth first search to traverse all valves
    //Two states get added to cloud, either turning valve ON or OFF
    while(cloud.length > 0){
        const cloudNode = cloud.shift();
        //console.log(cloud.length + ', ' + maxPressure)
        if(cloudNode.pressure > maxPressure) maxPressure = cloudNode.pressure;
        if(!map.has(`${cloudNode.node.valve}${cloudNode.time}`) || map.get(`${cloudNode.node.valve}${cloudNode.time}`) < cloudNode.pressure){
            map.set(`${cloudNode.node.valve}${cloudNode.time}`, cloudNode.pressure)
            if(cloudNode.time > 1){
                for(let i = 0; i < cloudNode.node.valves.length; i++){
                    const newNode = Nodes.filter(n => n.valve === cloudNode.node.valves[i])[0]
                    let cloudObj = {
                        node: newNode,
                        pressure: cloudNode.pressure + (cloudNode.time - 2) * newNode.rate,
                        time: cloudNode.time - 2,
                        onValves: [...cloudNode.onValves, newNode.valve]
                    }
                    if(!cloudNode.onValves.includes(newNode.valve) && (!map.has(`${cloudObj.node.valve}${cloudObj.time}`) || map.get(`${cloudObj.node.valve}${cloudObj.time}`) < cloudObj.pressure))
                        cloud.push(cloudObj); 

                    cloudObj = {
                        node: newNode,
                        pressure: cloudNode.pressure,
                        time: cloudNode.time - 1,
                        onValves: [...cloudNode.onValves]
                    }
                    if(!map.has(`${cloudObj.node.valve}${cloudObj.time}`) || map.get(`${cloudObj.node.valve}${cloudObj.time}`) < cloudObj.pressure)
                        cloud.push(cloudObj);
                    
                }
            }
        }
    }

    //console.log(Nodes);
    console.log(maxPressure);
}

const main = async () => {
    await readInput(); 
    //console.log(input)
   
    Part1();
    //Part 2
}

main();