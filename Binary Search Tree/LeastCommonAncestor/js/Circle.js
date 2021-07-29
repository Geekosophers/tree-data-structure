class Circle {
  constructor(x, y, text, length) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.length = length;
    this.brightness = 0;
    this.color = "#4b5399";
  }

  color(colorHex) {
    this.color = colorHex;
  }

  show() {
    stroke(255);
    strokeWeight(1);
    fill(this.color);
    circle(this.x, this.y, this.length, this.length);
    textAlign(CENTER, CENTER);
    strokeWeight(1);
    fill(255);
    text(this.text, this.x, this.y);
  }
}
