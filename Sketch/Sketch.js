var target;
var maxPopulation;
var mutationRate;
var population;

var bestPhrase;
var allPhrases;
var stats;

function setup() {
  
  bestPhrase = createP('Best phrase:');
  bestPhrase.class("best");
  
  allPhrases = createP("All phrases:");
  allPhrases.position(600, 10);
  allPhrases.class("all");
  
  stats = createP("Stats");
  stats.class("stats");
  
  target = "Monkey see monkey dont";
  maxPopulation = 200;
  mutationRate = 0.01;
  
  population = new Population(target, mutationRate, maxPopulation);
}

function draw() {
  console.log("Checkpoint 1.");
  population.naturalSelection();
  population.generate();
  population.calcFitness();
  
  population.evaluate();
  
  if (population.isFinished()) {
    noLoop();
  }
  
  displayInfo();
}

function displayInfo() {
  var answer = population.getBest();
  
  bestPhrase.html("Best phrase:<br>" + answer);
  
  var statstext = "total generations:     " + population.getGenerations() + "<br>";
  statstext +=    "average fitness:       " + nf(population.getAverageFitness()) + "<br>";
  statstext +=    "total population:      " + maxPopulation + "<br>";
  statstext +=    "mutation rate:         " + floor(mutationRate * 100) + "%";
  
  stats.html(statstext);

  allPhrases.html("All phrases:<br>" + population.allPhrases())
}