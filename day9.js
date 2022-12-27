const fs = require('fs');
const readline = require('readline');

var input = [];

async function readInput(){
    
    const rl = readline.createInterface({
        input: fs.createReadStream('./day9.txt'),
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

    let headX = 0, headY = 0, tailX = 0, tailY = 0;
    let visited = new Map();

    for(let i = 0; i < input.length; i++){
        const line = input[i].split(' ');
        const dir = line[0];
        const distance = Number(line[1]);

        for(let j = 0; j < distance; j++){
            if(dir === 'U'){
                headY++;
                if(headY > tailY + 1) {
                    tailY++;
                    if(headX > tailX) tailX++;
                    else if(headX < tailX) tailX--;
                }
                
                
            }
            else if(dir === 'R'){
                headX++;
                if(headX > tailX + 1) {
                    tailX++;
                    if(headY > tailY) tailY++;
                    else if(headY < tailY) tailY--;
                }
                
            }
            else if(dir === 'D'){
                headY--;
                if(headY < tailY - 1){
                    tailY--;
                    if(headX > tailX) tailX++;
                    else if(headX < tailX) tailX--;
                } 
                
            }
            else if(dir === 'L'){
                headX--;
                if(headX < tailX - 1){
                    tailX--;
                    if(headY > tailY) tailY++;
                    else if(headY < tailY) tailY--;
                }
            }

            const tailPos = `${tailX},${tailY}`;
            //console.log(tailPos)
            visited.set(tailPos, true);
        }
        
    }

    const totalVisited = visited.size;
    console.log(totalVisited);

    //Part 2
    visited = new Map();
    let head = {x:0, y:0};
    let knots = [];
    knots.push(head);
    for(let i = 0; i < 9; i++){
        const knot = {x:0, y:0};
        knots.push(knot);
    }

    for(let i = 0; i < input.length; i++){
        const line = input[i].split(' ');
        const dir = line[0];
        const distance = Number(line[1]);

        for(let j = 0; j < distance; j++){

            if(dir === 'U')
                knots[0].y++;
            
            else if(dir === 'R')
                knots[0].x++;

            else if(dir === 'D')
                knots[0].y--;

            else if(dir === 'L')
                knots[0].x--;

            for(let k = 1; k < knots.length; k++){
                let x_distance = (knots[k-1].x - knots[k].x);
                let y_distance = (knots[k-1].y - knots[k].y);

                if(x_distance === 0 && y_distance > 1) knots[k].y++;
                else if(x_distance === 0 && y_distance < -1) knots[k].y--;
                else if(y_distance === 0 && x_distance > 1) knots[k].x++;
                else if(y_distance === 0 && x_distance < -1) knots[k].x--;
                   
                else if(x_distance > 1 && y_distance > 0){
                    knots[k].x++;
                    knots[k].y++;
                }
                else if(x_distance > 0 && y_distance > 1){
                    knots[k].x++;
                    knots[k].y++;
                }
                else if(x_distance > 1 && y_distance < 0){
                    knots[k].x++;
                    knots[k].y--;
                }
                else if(x_distance > 0 && y_distance < -1){
                    knots[k].x++;
                    knots[k].y--;
                }
                else if(x_distance < -1 && y_distance > 0){
                    knots[k].x--;
                    knots[k].y++;
                }
                else if(x_distance < -1 && y_distance < 0){
                    knots[k].x--;
                    knots[k].y--;
                }
                else if(x_distance < 0 && y_distance > 1){
                    knots[k].x--;
                    knots[k].y++;
                }
                else if(x_distance < 0 && y_distance < -1){
                    knots[k].x--;
                    knots[k].y--;
                }
            }

            const tailPos = `${knots[knots.length-1].x},${knots[knots.length-1].y}`;
            //console.log(tailPos)
            visited.set(tailPos, true);
        }
        
    }

    console.log(visited.size)
}

main()
