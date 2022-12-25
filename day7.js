const fs = require('fs');
const readline = require('readline');

var input = [];

async function readInput(){
    
    const rl = readline.createInterface({
        input: fs.createReadStream('./day7.txt'),
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
   // console.log(input)

    let indexObj = {i: 1};
    let sumSizes = 0;

    const f = (obj) => {

        while(indexObj.i < input.length){
            const line = input[indexObj.i].split(' '); 

            if(line[0] === "$"){ //command
                indexObj.i++;
                if(line[1] === 'cd'){ 
                    
                    if(line[2] === '..'){ 
                        obj.dirs.forEach(element => {
                            obj.size += element.size;
                        });

                        if(obj.size <= 100000) sumSizes += obj.size;
                        return obj;
                    }
                    else{
                        obj.dirs.push( f({name: line[2], dirs: [], size: 0}) )
                    }
                }
            }
            else {  //file or dir
                indexObj.i++;
                if(line[0] !== 'dir'){
                 //obj.dirs.push( {name: line[1], size: Number(line[0])} )
                 obj.size += Number(line[0]);
                 //console.log(size)
                 
                }
                
            }

            
        }

        obj.dirs.forEach(element => {
            obj.size += element.size;
        });

        if(obj.size <= 100000) sumSizes += obj.size;
        return obj;
    }

    const result = f({name: '/', dirs: [], size: 0});

    console.log(sumSizes);    

    //Part 2
    let target = 30000000 - (70000000 - result.size);
    let smallest = 70000000;

    const findClosest = (obj) => {
        let newObj;
        let flag = false;
        obj.dirs.forEach(element => {
            if (element.size < smallest && element.size >= target){
                smallest = element.size;
                newObj = element;
                flag = true;
            }
            findClosest(element);
        })

        if(!flag)
            return;
        else
            findClosest(newObj);

    }

    findClosest(result);
    console.log(smallest);
}

main()

