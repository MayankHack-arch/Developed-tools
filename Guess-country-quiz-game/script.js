let countries = {
  'France': [
      "The country where the French Revolution started",
      "Napoleon Bonaparte became an emperor in this country",
      "The Louvre Museum is a popular tourist destination in this country",
      "This country is known for being the first to abolish monarchy and establish democracy",
      "Oggy and Cockroaches, an animated series, was first broadcast in this country",
    ],
    'India': [
      "This country is where the oldest religion, Hinduism, originated",
      "In the pre-medieval period, it was known as the 'Golden Sparrow' and was the richest of all",
      "It has the largest population in the world",
      "The mathematician and astronomer Aryabhata from this country invented zero (0)",
      "It is the largest democracy in the world",
    ],
    'China': [
    "Inventions like paper and gunpowder originated in this country",
    "It is the only home to wild giant pandas",
    "This country in East Asia is the largest consumer of tea",
    "It has the largest high-speed rail network in Asia and the world",
    "The world's largest hydroelectric dam, the Three Gorges Dam, is located in this Asian country",
  ],
  'Japan': [
    "Sumo wrestling is a professional sport in this country",
    "Tea ceremonies are an important part of their culture",
    "The first high-speed bullet train was invented in this country",
    "This country was ruled by samurais, who are well-known for their martial arts skills",
    "Its capital city is one of the most populous cities in the world",
  ],
  'Brazil': [
    "It is the largest country in South America",
    "It is one of the top 10 largest countries in the world and a major producer of coffee globally",
    "This country has won the FIFA World Cup five times",
    "Portuguese is an official language of this country, making it unique among South American countries",
    "It has a unique martial art style called Capoeira, which combines dance, acrobatics, and music",
  ],
  };
  
  let randomCountry, randomSentence;
  let answeredSentences = new Set();
  let winScore=0;
  let lostScore=0;
  
  function generateNewQuestion() {
    if (answeredSentences.size === Object.values(countries).flat().length) {
      document.getElementById('questionDisplay').innerText = 'All questions answered correctly';
      document.getElementById('choosen').innerText = "";
      answeredSentences.clear();
      document.getElementById('submitButton').disabled = true;
      document.getElementById('resetButton').innerText = 'Play Again';
      return;
    }
  
    let countriesWithUnansweredSentences = Object.keys(countries).filter(country => countries[country].some(sentence => !answeredSentences.has(sentence)));
    if (countriesWithUnansweredSentences.length === 0) {
      document.getElementById('questionDisplay').innerText = "All questions answered correctly";
      document.getElementById('choosen').innerText = "";
      answeredSentences.clear();
      document.getElementById('resetButton').innerText = 'Play Again';
      return;
    }
  
    randomCountry = countriesWithUnansweredSentences[Math.floor(Math.random() * countriesWithUnansweredSentences.length)];
    let sentences = countries[randomCountry].filter(sentence => !answeredSentences.has(sentence));
    randomSentence = sentences[Math.floor(Math.random() * sentences.length)];
    document.getElementById('questionDisplay').innerText = randomSentence;
  }
  
  document.getElementById('submitButton').addEventListener('click', function() {
    let userAnswer = document.getElementById('userInput').value;
    document.getElementById('userInput').value = "";
    document.getElementById('uChoice').innerText = `Your input is:  ${userAnswer}`;
  
    if (userAnswer.toLowerCase() === randomCountry.toLowerCase()) {
      document.getElementById('choosen').innerText = 'Correct';
      answeredSentences.add(randomSentence);
      winScore+=1;
    } else if (!/^[a-zA-Z]+$/.test(userAnswer)) {
      document.getElementById('choosen').innerText = '"Invalid input entered"';
    } else {
      document.getElementById('choosen').innerText = 'Incorrect';
      lostScore+=1;
    }
    document.getElementById('winScore').innerText=`Win: ${winScore}`;
    document.getElementById('lostScore').innerText=`Lost: ${lostScore}`;
  
    generateNewQuestion();
  });
  
  document.getElementById('resetButton').addEventListener('click', function() {
    winScore=0;
    lostScore=0;
    document.getElementById('winScore').innerText=`Win: ${winScore}`;
    document.getElementById('lostScore').innerText=`Lost: ${lostScore}`;
    answeredSentences.clear();
    document.getElementById('submitButton').disabled = false;
    document.getElementById('resetButton').innerText = 'Reset';
    userAnswer="";
    document.getElementById('uChoice').innerText = `Your input is: ${userAnswer}`;
    generateNewQuestion();
  });
  
  generateNewQuestion();
  