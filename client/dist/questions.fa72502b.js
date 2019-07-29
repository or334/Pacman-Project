// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../assets/questions.json":[function(require,module,exports) {
module.exports = {
  "response_code": 0,
  "results": [{
    "category": "Entertainment: Video Games",
    "type": "multiple",
    "difficulty": "hard",
    "question": "What was the code name given to Sonic the Hedgehog 4 during its development?",
    "correct_answer": "Project Needlemouse",
    "incorrect_answers": ["Project Bluespike", "Project Roboegg", "Project Darksphere"]
  }, {
    "category": "Entertainment: Television",
    "type": "multiple",
    "difficulty": "easy",
    "question": "What was the name of the police officer in the cartoon \"Top Cat\"?",
    "correct_answer": "Dibble",
    "incorrect_answers": ["Barbrady", "Mahoney", "Murphy"]
  }, {
    "category": "Entertainment: Board Games",
    "type": "multiple",
    "difficulty": "easy",
    "question": "In a standard game of Monopoly, what colour are the two cheapest properties?",
    "correct_answer": "Brown",
    "incorrect_answers": ["Green", "Yellow", "Blue"]
  }, {
    "category": "General Knowledge",
    "type": "multiple",
    "difficulty": "easy",
    "question": "Which company did Valve cooperate with in the creation of the Vive?",
    "correct_answer": "HTC",
    "incorrect_answers": ["Oculus", "Google", "Razer"]
  }, {
    "category": "Science: Computers",
    "type": "multiple",
    "difficulty": "medium",
    "question": "Which internet company began life as an online bookstore called 'Cadabra'?",
    "correct_answer": "Amazon",
    "incorrect_answers": ["eBay", "Overstock", "Shopify"]
  }, {
    "category": "History",
    "type": "multiple",
    "difficulty": "easy",
    "question": "Who discovered Penicillin?",
    "correct_answer": "Alexander Flemming",
    "incorrect_answers": ["Marie Curie", "Alfred Nobel", "Louis Pasteur"]
  }, {
    "category": "History",
    "type": "multiple",
    "difficulty": "medium",
    "question": "Which king was killed at the Battle of Bosworth Field in 1485? ",
    "correct_answer": "Richard III",
    "incorrect_answers": ["Edward V", "Henry VII", "James I"]
  }, {
    "category": "History",
    "type": "multiple",
    "difficulty": "medium",
    "question": "America's Strategic Defense System during the Cold War was nicknamed after this famous movie.",
    "correct_answer": "Star Wars",
    "incorrect_answers": ["Jaws", "Blade Runner", "Alien"]
  }, {
    "category": "History",
    "type": "multiple",
    "difficulty": "easy",
    "question": "The idea of Socialism was articulated and advanced by whom?",
    "correct_answer": "Karl Marx",
    "incorrect_answers": ["Vladimir Lenin", "Joseph Stalin", "Vladimir Putin"]
  }, {
    "category": "History",
    "type": "multiple",
    "difficulty": "easy",
    "question": "In what year did the Wall Street Crash take place?",
    "correct_answer": "1929",
    "incorrect_answers": ["1932", "1930", "1925"]
  }, {
    "category": "General Knowledge",
    "type": "multiple",
    "difficulty": "easy",
    "question": "Area 51 is located in which US state?",
    "correct_answer": "Nevada",
    "incorrect_answers": ["Arizona", "New Mexico", "Utah"]
  }, {
    "category": "Science: Computers",
    "type": "multiple",
    "difficulty": "medium",
    "question": "What does AD stand for in relation to Windows Operating Systems? ",
    "correct_answer": "Active Directory",
    "incorrect_answers": ["Alternative Drive", "Automated Database", "Active Department"]
  }, {
    "category": "Entertainment: Music",
    "type": "multiple",
    "difficulty": "easy",
    "question": "Where does the Mac part of the name Fleetwood Mac come from?",
    "correct_answer": "John McVie",
    "incorrect_answers": ["Christine McVie", "Mac McAnally", "David Tennant"]
  }, {
    "category": "Science & Nature",
    "type": "multiple",
    "difficulty": "hard",
    "question": "What common name is given to the medial condition, tibial stress syndrome (MTSS)?",
    "correct_answer": "Shin Splints",
    "incorrect_answers": ["Tennis Elbow", "Carpal Tunnel", "Housemaid's Knee"]
  }, {
    "category": "Entertainment: Film",
    "type": "multiple",
    "difficulty": "easy",
    "question": "What was Dorothy's surname in 'The Wizard Of Oz'?",
    "correct_answer": "Gale",
    "incorrect_answers": ["Perkins", "Day", "Parker"]
  }, {
    "category": "Entertainment: Video Games",
    "type": "multiple",
    "difficulty": "medium",
    "question": "Which of these features was added in the 1994 game \"Heretic\" that the original \"DOOM\" could not add due to limitations?",
    "correct_answer": "Looking up and down",
    "incorrect_answers": ["Increased room sizes", "Unlimited weapons", "Highly-detailed textures"]
  }, {
    "category": "Geography",
    "type": "multiple",
    "difficulty": "hard",
    "question": "The mountainous Khyber Pass connects which of the two following countries?",
    "correct_answer": "Afghanistan and Pakistan",
    "incorrect_answers": ["India and Nepal", "Pakistan and India", "Tajikistan and Kyrgyzstan"]
  }, {
    "category": "Entertainment: Television",
    "type": "multiple",
    "difficulty": "medium",
    "question": "Which of the following Autobot names in Michael Bay's movies was NOT a name for a Transformer in the original 1980's cartoon?",
    "correct_answer": "Mudflap",
    "incorrect_answers": ["Skids", "Sideswipe", "Ratchet"]
  }, {
    "category": "Entertainment: Video Games",
    "type": "multiple",
    "difficulty": "medium",
    "question": "What was the first \"Team Fortress 2\" update to include a war?",
    "correct_answer": "Sniper vs. Spy Update",
    "incorrect_answers": ["WAR! Update", "Meet Your Match Update", "Spy Vs. Engineer Update"]
  }, {
    "category": "Sports",
    "type": "multiple",
    "difficulty": "easy",
    "question": "Which country will host the 2020 Summer Olympics?",
    "correct_answer": "Japan",
    "incorrect_answers": ["China", "Australia", "Germany"]
  }, {
    "category": "Entertainment: Television",
    "type": "multiple",
    "difficulty": "medium",
    "question": "Which character does voice actress Tara Strong NOT voice?",
    "correct_answer": "Bubbles (2016)",
    "incorrect_answers": ["Twilight Sparkle", "Timmy Turner", "Harley Quinn"]
  }, {
    "category": "Entertainment: Video Games",
    "type": "multiple",
    "difficulty": "medium",
    "question": "In \"Overwatch\", what is the name of Mercy's \"ultimate ability\"?",
    "correct_answer": "Valkyrie",
    "incorrect_answers": ["Earthshatter", "Rocket Barrage", "Molten Core"]
  }, {
    "category": "Entertainment: Music",
    "type": "multiple",
    "difficulty": "medium",
    "question": "What is the relationship between the band members of American rock band King of Leon?",
    "correct_answer": "Brothers &amp; cousins",
    "incorrect_answers": ["Childhood friends", "Former classmates", "Fraternity house members"]
  }, {
    "category": "Entertainment: Musicals & Theatres",
    "type": "multiple",
    "difficulty": "medium",
    "question": "What play is the quote \"Hell is other people\" from?",
    "correct_answer": "No Exit",
    "incorrect_answers": ["The Devil and the Good Lord", "The Condemned of Altona", "The Flies"]
  }, {
    "category": "Animals",
    "type": "multiple",
    "difficulty": "easy",
    "question": "What is Grumpy Cat's real name?",
    "correct_answer": "Tardar Sauce",
    "incorrect_answers": ["Sauce", "Minnie", "Broccoli"]
  }, {
    "category": "Entertainment: Video Games",
    "type": "multiple",
    "difficulty": "hard",
    "question": "In Monster Hunter Generations, which of these hunter arts are exclusive to the Longsword?",
    "correct_answer": "Unhinged Spirit",
    "incorrect_answers": ["Shoryugeki", "Provoke", "Demon Riot"]
  }, {
    "category": "Celebrities",
    "type": "multiple",
    "difficulty": "medium",
    "question": "What is generally considered to be William Shakespeare's birth date?",
    "correct_answer": "April 23rd, 1564",
    "incorrect_answers": ["July 4th, 1409", "September 29th, 1699", "December 1st, 1750"]
  }, {
    "category": "Entertainment: Books",
    "type": "multiple",
    "difficulty": "easy",
    "question": "What is the title of the first Sherlock Holmes book by Arthur Conan Doyle?",
    "correct_answer": "A Study in Scarlet",
    "incorrect_answers": ["The Sign of the Four", "A Case of Identity", "The Doings of Raffles Haw"]
  }, {
    "category": "Entertainment: Video Games",
    "type": "multiple",
    "difficulty": "medium",
    "question": "In the Halo series, what fleet was Thel 'Vadam supreme commander of before being branded an Arbiter?",
    "correct_answer": "Fleet of Particular Justice",
    "incorrect_answers": ["Fleet of Sacred Consecration", "Fleet of Furious Redemption", "Fleet of Righteous Vigilance"]
  }, {
    "category": "Entertainment: Music",
    "type": "multiple",
    "difficulty": "medium",
    "question": "Which country does the electronic music duo \"The Knife\" originate from?",
    "correct_answer": "Sweden",
    "incorrect_answers": ["Finland", "Denmark", "Norway"]
  }, {
    "category": "Sports",
    "type": "multiple",
    "difficulty": "medium",
    "question": "What is the oldest team in Major League Baseball?",
    "correct_answer": "Atlanta Braves",
    "incorrect_answers": ["Chicago Cubs", "Cincinnati Reds", "St. Louis Cardinals"]
  }, {
    "category": "Entertainment: Music",
    "type": "multiple",
    "difficulty": "easy",
    "question": "Who was featured in the song \"Words\" by Feint? ",
    "correct_answer": "Laura Brehm",
    "incorrect_answers": ["Anna Yvette ", "Danyka Nadeau", "Veela"]
  }, {
    "category": "Science: Computers",
    "type": "multiple",
    "difficulty": "hard",
    "question": "Which of the following is the oldest of these computers by release date?",
    "correct_answer": "TRS-80",
    "incorrect_answers": ["Commodore 64", "ZX Spectrum", "Apple 3"]
  }, {
    "category": "Entertainment: Video Games",
    "type": "multiple",
    "difficulty": "medium",
    "question": "Which of the following has Jennifer Taylor NOT voiced?",
    "correct_answer": "Sarah Kerrigan",
    "incorrect_answers": ["Princess Peach", "Zoey", "Cortana"]
  }, {
    "category": "Science & Nature",
    "type": "multiple",
    "difficulty": "medium",
    "question": "What is radiation measured in?",
    "correct_answer": "Gray ",
    "incorrect_answers": ["Watt", "Decibel", "Kelvin"]
  }, {
    "category": "Entertainment: Video Games",
    "type": "multiple",
    "difficulty": "medium",
    "question": "One of the Nintendo Entertainment System voice channels supports playback of sound samples. Which one?",
    "correct_answer": "DMC",
    "incorrect_answers": ["Noise", "Triangle", "Square"]
  }, {
    "category": "Entertainment: Video Games",
    "type": "multiple",
    "difficulty": "medium",
    "question": "How many regular Sunken Sea Scrolls are there in \"Splatoon\"?",
    "correct_answer": "27",
    "incorrect_answers": ["32", "30", "5"]
  }, {
    "category": "Entertainment: Video Games",
    "type": "multiple",
    "difficulty": "medium",
    "question": "Which German city does the map \"Clubhouse\" in \"Tom Clancy's Rainbow Six Siege\" take place in?",
    "correct_answer": "Hannover",
    "incorrect_answers": ["Berlin", "Hamburg", "Munich"]
  }, {
    "category": "General Knowledge",
    "type": "multiple",
    "difficulty": "hard",
    "question": "According to Fair Works Australia, how long do you have to work to get Long Service Leave?",
    "correct_answer": "7 years",
    "incorrect_answers": ["2 years", "8 years", "6 months"]
  }, {
    "category": "Entertainment: Music",
    "type": "multiple",
    "difficulty": "medium",
    "question": "Who was the lead singer and frontman of rock band R.E.M?",
    "correct_answer": "Michael Stipe",
    "incorrect_answers": ["Chris Martin", "Thom Yorke", "George Michael"]
  }, {
    "category": "Science: Computers",
    "type": "multiple",
    "difficulty": "hard",
    "question": "Released in 2001, the first edition of Apple's Mac OS X operating system (version 10.0) was given what animal code name?",
    "correct_answer": "Cheetah",
    "incorrect_answers": ["Puma", "Tiger", "Leopard"]
  }, {
    "category": "Entertainment: Film",
    "type": "multiple",
    "difficulty": "easy",
    "question": "What is the name of the island that \"Jurassic Park\" is built on?",
    "correct_answer": "Isla Nublar",
    "incorrect_answers": ["Isla Sorna", "Isla Muerta", "Isla Pena"]
  }, {
    "category": "History",
    "type": "multiple",
    "difficulty": "medium",
    "question": "The minigun was designed in 1960 by which manufacturer.",
    "correct_answer": "General Electric",
    "incorrect_answers": ["Colt Firearms", "Heckler &amp; Koch", "Sig Sauer"]
  }, {
    "category": "Entertainment: Video Games",
    "type": "multiple",
    "difficulty": "hard",
    "question": "When was the Valve Corporation founded?",
    "correct_answer": "August 24, 1996",
    "incorrect_answers": ["December 26, 1994", "March 22, 1997", "March 13, 1997"]
  }, {
    "category": "Mythology",
    "type": "multiple",
    "difficulty": "easy",
    "question": "What mythology did the god \"Apollo\" come from?",
    "correct_answer": "Greek and Roman",
    "incorrect_answers": ["Roman and Spanish", "Greek and Chinese", "Greek, Roman and Norse"]
  }, {
    "category": "Entertainment: Film",
    "type": "multiple",
    "difficulty": "easy",
    "question": "What was the first feature-length computer-animated movie?",
    "correct_answer": "Toy Story",
    "incorrect_answers": ["Tron", "Lion king", "101 Dalmatians"]
  }, {
    "category": "Geography",
    "type": "multiple",
    "difficulty": "easy",
    "question": "What is the capital of Scotland?",
    "correct_answer": "Edinburgh",
    "incorrect_answers": ["Glasgow", "Dundee", "London"]
  }, {
    "category": "General Knowledge",
    "type": "multiple",
    "difficulty": "easy",
    "question": "In which fast food chain can you order a Jamocha Shake?",
    "correct_answer": "Arby's",
    "incorrect_answers": ["McDonald's", "Burger King", "Wendy's"]
  }, {
    "category": "History",
    "type": "multiple",
    "difficulty": "hard",
    "question": "In addition to his career as an astrologer and \"prophet\", Nostradamus published a 1555 treatise that included a section on what?",
    "correct_answer": "Making jams and jellies",
    "incorrect_answers": ["Teaching parrots to talk", "Cheating at card games", "Digging graves"]
  }, {
    "category": "General Knowledge",
    "type": "multiple",
    "difficulty": "hard",
    "question": "Where is Apple Inc. headquartered?",
    "correct_answer": "Cupertino, California",
    "incorrect_answers": ["Redwood City, California", "Redmond, Washington", "Santa Monica, CA"]
  }]
};
},{}]},{},["../assets/questions.json"], null)