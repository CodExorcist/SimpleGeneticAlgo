function newChar() {
  var c = floor(random(63, 122));
  if (c === 63) c = 32; // Replace ? to space
  if (c === 64) c = 46; // Replace @ to .
  
  return char(c);
}

function DNA(num) {
  
  this.genes = [];
  this.fitness = 0;
 
  for (var i = 0; i < num; i++) {
    this.genes[i] = newChar();
  }
  
  this.getPhrase = function() {
    return this.genes.join("");
  }
  
  this.calcFitness = function(target) {
    var score = 0;
    
    for (var i = 0; i < this.genes.length; i++) {
      if (this.genes[i] == target.charAt(i)) {
        score++;
      }
    }
    
    this.fitness = score / target.length;
  }
  
  this.crossOver = function(partner) {
    // A new child
    var child = new DNA(this.genes.length);
    
    var midpoint = floor(random(this.genes.length));
    
    for (var i = 0; i < midpoint; i++) {
      child.genes[i] = this.genes[i];  
    }
    
    for (var i = midpoint; i < this.genes.length; i++) {
      child.genes[i] = partner.genes[i];
    }
    
    return child;
  }
  
  this.mutate = function(mutationRate) {
    for (var i = 0; i < this.genes.length; i++) {
      if (random(1) < mutationRate) {
        this.genes[i] = newChar();
      }
    }
  }
}