// p - Target Phrase
// m - Mutation Rate
// num - number of Population
function Population(p, m, num) {
  this.population;
  this.matingPool;
  this.generations = 0;
  this.finished = false;
  this.target = p;
  this.mutationRate = m;
  this.perfectScore = 1;
  
  this.best = "";
  
  this.population = [];
  
  for (var i = 0; i < num; i++) {
    this.population[i] = new DNA(this.target.length);
  }
  
  this.matingPool = [];
  
  this.calcFitness = function() {
    for (var i = 0; i < this.population.length; i++) {
      this.population[i].calcFitness(target);
    }
  }
  
  this.calcFitness();
  
  // Generate a mating pool
  this.naturalSelection = function() {
    // Clear the ArrayList
    this.matingPool = [];
    
    var maxFitness = 0;
    
    for (var i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > maxFitness) {
        maxFitness = this.population[i].fitness;
      }
    }
    
    for (var i = 0; i < this.population.length; i++) {
      
      var fitness = map(this.population[i].fitness, 0, maxFitness, 0, 1);
      var n = floor(fitness * 100);
      for (var j = 0; j < n; j++) {
        this.matingPool.push(this.population[i]);
      }
    }
    
    this.generate = function() {
      // Refill the population with children from the mating pool
      
      for (var i = 0; i < this.population.length; i++) {
        var a = floor(random(this.matingPool.length));
        var b = floor(random(this.matingPool.length));
        var partnerA = this.matingPool[a];
        var partnerB = this.matingPool[b];
        var child = partnerA.crossOver(partnerB)
        child.mutate(this.mutationRate);
        this.population[i] = child;
      }
      
      this.generations++;
    }
    
    this.getBest = function() {
      return this.best;
    }
    
    this.evaluate = function() {
      var worldrecord = 0.0;
      var index = 0;
      
      for (var i = 0; i < this.population.length; i++) {
        if (this.population[i].fitness > worldrecord) {
          index = i;
          worldrecord = this.population[i].fitness;
        }
        
        this.best = this.population[index].getPhrase();
        
        if (worldrecord === this.perfectScore) {
          this.finished = true;
        }
      }
    }
    
    this.isFinished = function() {
      return this.finished;
    }
    
    this.getGenerations = function() {
      return this.generations;
    }
    
    this.getAverageFitness = function() {
      var total = 0;
      
      for (var i = 0; i < this.population.length; i++) {
        total += this.population[i].fitness;
      }
      
      return total / this.population.length;
    }
    
    this. allPhrases = function() {
      var everything = "";
      var displayLimit = min(this.population.length, 50);
      
      for (var i = 0; i < displayLimit; i++) {
        everything += this.population[i].getPhrase() + "<br>";
      }
      
      return everything;
    }
  }
}