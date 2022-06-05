class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(ch) {
        var found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0] // this.x - 1 // 0
            let y = this.directions[i][1]; // this.y - 1 // 1
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]); // [ [this.x - 1, this.y - 1],]
                }
            }
        }
        return found;
    }

    mul() {
        this.multiply++ // 1
        let emptyCell = this.chooseCell(0) //
        var newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)]; // [1, 2]
        if (newCell && this.multiply >= 8) {
            let newX = newCell[0]; // 1
            let newY = newCell[1]; // 2
            matrix[newY][newX] = 1; // 1
            let newGrass = new Grass(newX, newY)
            grassArr.push(newGrass); // էս մասը պարտադիր ա, որովհետև սեթափի մեջ մենակ սկզբւմ ա նայում
            //որ վանդակում ինչ թիվ ա , ու սարքում օբյեկտ,,,իսկ մեզ պետքա ամեն նորի հետ սարքի
            this.multiply = 0;
        }
    }
}






class GrassEater extends Grass {
    constructor(x, y, directions) {
        super(x, y, directions);
        this.energy = 8;
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(ch) {
        this.getNewCoordinates()
        return super.chooseCell(ch);
    }

    move() {
        this.energy--; // 
        let emptyCell = this.chooseCell(0) // գտնի դատարկ վանդակները
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)]; // [1, 1]
        if (newCell && this.energy >= 0) { // գրենք էս երկու պայմանները
            let newX = newCell[0]; // 1
            let newY = newCell[1]; // 1
            matrix[newY][newX] = 2; // 2 // paint yellow cell
            this.x = newX // 2 = 1
            this.y = newY // 1 = 1
            matrix[this.y][this.x] = 0;
        }
        else if (this.energy < 0) {
            this.die();
        }
    }
    mul() {
        let emptyCell = this.chooseCell(0)
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
        if (newCell && this.energy >= 12) {
            let newX = newCell[0]; // 1
            let newY = newCell[1]; // 0
            matrix[newY][newX] = 2; // ներկում ենք
            let newGrassEater = new GrassEater(newX, newY)
            grassEaterArr.push(newGrassEater);
            this.energy -= 4;
        }
    }
    eat() {
        let emptyCell = this.chooseCell(1) // 
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
        if (newCell) {
            this.energy++
            let newX = newCell[0]; // 0
            let newY = newCell[1]; // 1
            matrix[newY][newX] = 2
            matrix[this.y][this.x] = 0;


            for (let i = 0; i < grassArr.length; i++) {
                if (grassArr[i].x == this.x && grassArr[i].y == this.y) {
                    grassArr.splice(i, 1);
                }
            }
            this.x = newX;
            this.y = newY;
        }
        else {
            this.move();
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (let i = 0; i < grassEaterArr.length; i++) {
            if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
                grassEaterArr.splice(i, 1);
            }
        }
    }
}






class Gazanik extends Grass {

    constructor(x, y, directions) {
        super(x, y, directions);
        this.energy = 12;
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(ch) {
        this.getNewCoordinates()
        return super.chooseCell(ch);
    }

    move() {
        this.energy--;
        let emptyCell1 = this.chooseCell(1) // [green cells]
        let emptyCell0 = this.chooseCell(0) // [empty Cells]

        let arr = emptyCell0.concat(emptyCell1) // [ 0, 1,0 1, 0, 1]

        let newCell = arr[Math.floor(Math.random() * arr.length)]; // [1]
        if (newCell && this.energy >= 0) {
            if (newCell == 0) {
                let newX = newCell[0];
                let newY = newCell[1];
                matrix[newY][newX] = 3
                matrix[this.y][this.x] = 0;
                this.x = newX
                this.y = newY
            } else if (newCell == 1) {
                let newX = newCell[0];
                let newY = newCell[1];
                matrix[newY][newX] = 3
                matrix[this.y][this.x] = 1;
                this.x = newX
                this.y = newY
            }
        }
        else if (this.energy < 0) {
            this.die();
        }
    }
    mul() {
        let emptyCell0 = this.chooseCell(0)
        let emptyCell1 = this.chooseCell(1)
        let emptyCell = emptyCell0.concat(emptyCell1)
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
        if (newCell && this.energy >= 15) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 3;
            let newGazanik = new Gazanik(newX, newY)
            gazanikArr.push(newGazanik);
            this.energy -= 4;
        }
        else {
            this.eat();
        }
    }
    eat() {
        let emptyCell = this.chooseCell(2)
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
        if (newCell) {
            this.energy += 2
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 3;
            matrix[this.y][this.x] = 0;
            for (let i = 0; i < grassEaterArr.length; i++) {
                if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
                    grassEaterArr.splice(i, 1);
                }
            }
            this.x = newX
            this.y = newY
        }
        else {
            this.move();
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (let i = 0; i < gazanikArr.length; i++) {
            if (gazanikArr[i].x == this.x && gazanikArr[i].y == this.y) {
                gazanikArr.splice(i, 1);
            }
        }
    }
}






class Monster extends Grass {

    constructor(x, y, directions) {
        super(x, y, directions);
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(ch) {
        this.getNewCoordinates()
        return super.chooseCell(ch);
    }


    move() {
        var emptyCells = this.chooseCell(1).concat(this.chooseCell(2)).concat(this.chooseCell(3)).concat(this.chooseCell(0));
        var newCell = random(emptyCells);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
        }
        else {
            this.eat();
        }
    }

    eat() {
        let emptyCell = this.chooseCell(3);
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
        if (newCell) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 4;
            matrix[this.y][this.x] = 0;
            for (let i = 0; i < gazanikArr.length; i++) {
                if (gazanikArr[i].x == this.x && gazanikArr[i].y == this.y) {
                    gazanikArr.splice(i, 1);
                }
            }
            this.x = newX
            this.y = newY
        }
    }

}






class Omnivirus extends Grass {

    constructor(x, y, directions) {
        super(x, y, directions);
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(ch) {
        this.getNewCoordinates()
        return super.chooseCell(ch);
    }


    move() {
        var emptyCells = this.chooseCell(1).concat(this.chooseCell(2)).concat(this.chooseCell(3)).concat(this.chooseCell(0));
        var newCell = random(emptyCells);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
        }
        else {
            this.eat();
        }
    }

    eat() {
        var emptyCells = this.chooseCell(1).concat(this.chooseCell(2)).concat(this.chooseCell(3)).concat(this.chooseCell(4));
        let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        if (newCell) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 5;
            matrix[this.y][this.x] = 0;
            for (let i = 0; i < grassEaterArr.length; i++) {
                if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
                    grassEaterArr.splice(i, 1);
                }
            }

            for (let i = 0; i < monsterArr.length; i++) {
                if (monsterArr[i].x == this.x && monsterArr[i].y == this.y) {
                    monsterArr.splice(i, 1);
                }
            }

            for (let i = 0; i < gazanikArr.length; i++) {
                if (gazanikArr[i].x == this.x && gazanikArr[i].y == this.y) {
                    gazanikArr.splice(i, 1);
                }
            }
            this.x = newX
            this.y = newY
        }
    }

}
