class Line {
    constructor(parentCoord, coord) {
        this.x1 = parentCoord[0];
        this.y1 = parentCoord[1];
        this.x2 = coord[0];
        this.y2 = coord[1];
    }

    show() {
        stroke(255);
        strokeWeight(1);
        line(this.x1,this.y1,this.x2,this.y2);
    }
}