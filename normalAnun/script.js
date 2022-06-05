let matrix = []
function matrixGen(matY, matX, grass, grassEat, gazan, monster,
    omnivirus) {
    for (let i = 0; i < matY; i++) {
        matrix[i] = [];
        for (let j = 0; j < matX; j++) {
            matrix[i][j] = 0; // սկզբում բոլոր վանդակները լցնում ենք 0-ներում
        }
    }

    for (let i = 0; i < grass; i++) { // հետո ըստ արգումենտի թվի, լուփ ա պտտվելու

        var y = Math.floor(Math.random() * matY) //ամեն անգամ ռենդմ y ընտրի
        var x = Math.floor(Math.random() * matX) //ամեն անգամ ռենդմ x ընտրի
        if (matrix[y][x] == 0) { // ասում ա եթե 0 -ա ուրեմն վերագրի մեկ
            matrix[y][x] = 1
        } //այսինքն եթե գռասսին տանք 40 թիվը, 40 հատ տարբեր տեղերում կստեղծվի խոտ
    }
    for (let i = 0; i < grassEat; i++) { //նույնը մնացածը
        var y = Math.floor(Math.random() * matY)
        var x = Math.floor(Math.random() * matX)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2;
        }
    }
    for (let i = 0; i < gazan; i++) {
        var y = Math.floor(Math.random() * matY)
        var x = Math.floor(Math.random() * matX)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3;
        }
    }
    for (let i = 0; i < monster; i++) {
        var y = Math.floor(Math.random() * matY)
        var x = Math.floor(Math.random() * matX)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4;
        }
    }

    for (let i = 0; i < omnivirus; i++) {
        var y = Math.floor(Math.random() * matY)
        var x = Math.floor(Math.random() * matX)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5;
        }
    }


}
matrixGen(40, 40, 1000, 50, 50, 40, 30); // էստեղ էլ կանրում ենք ֆունկցիան 

var grassArr = []; //
var grassEaterArr = [];
var gazanikArr = [];
var monsterArr = [];
var omnivirusArr = [];
var side = 12; // վանդակի չափսը փոքրացրեցի



function setup() {
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('pink');
    frameRate(10);
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y);
                grassArr.push(gr);
            } else if (matrix[y][x] == 2) {
                var grEater = new GrassEater(x, y);
                grassEaterArr.push(grEater);
            } else if (matrix[y][x] == 3) {
                var gazan = new Gazanik(x, y);
                gazanikArr.push(gazan);
            } else if (matrix[y][x] == 4) {
                var monster = new Monster(x, y);
                monsterArr.push(monster);
            }
            else if (matrix[y][x] == 5) {
                var omnivirus = new Omnivirus(x, y);
                omnivirusArr.push(omnivirus);
            }
        }
    }
}


function draw() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix.length; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 2) {
                fill("#F9F22B");
            }
            else if (matrix[y][x] == 3) {
                fill("#C20808");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 4) {
                fill("purple");
            }
            else if (matrix[y][x] == 5) {
                fill("black");
            }
            rect(x * side, y * side, side, side);
        }
    }

    for (let i = 0; i < grassArr.length; i++) {
        grassArr[i].mul();
    }

    for (let i = 0; i < gazanikArr.length; i++) {
        gazanikArr[i].mul();
        gazanikArr[i].eat();
    }

    for (let i = 0; i < grassEaterArr.length; i++) {
        grassEaterArr[i].mul();
        grassEaterArr[i].eat();
    }

    for (let i = 0; i < monsterArr.length; i++) {
        monsterArr[i].move();
        monsterArr[i].eat();
    }

    for (let i = 0; i < omnivirusArr.length; i++) {
        omnivirusArr[i].move();
        omnivirusArr[i].eat();
    }


}

