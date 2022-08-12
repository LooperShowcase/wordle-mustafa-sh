let wordsDiv = document.getElementById("words");
let NUMBER_OF_TRIES = 6;
let NUMBER_OF_CHARS = 5;

for (let i = 0; i < NUMBER_OF_TRIES; i++) {
  let attDiv = document.createElement("div");
  attDiv.className = "word";
  for (let j = 0; j < NUMBER_OF_CHARS; j++) {
    let charDiv = document.createElement("div");
    charDiv.className = "char";
    attDiv.appendChild(charDiv);
  }
  wordsDiv.appendChild(attDiv);
}
//end for

let currentChar = 0;
let currentWord = 0;
document.addEventListener("keydown", async (event) => {
  const currentAtt = wordsDiv.children[currentWord];
  if (event.key == "Enter") {
    if (currentChar == NUMBER_OF_CHARS) {
      let userGuess = getCurrentWord();
      let result = await guess(userGuess);
     for(let i = 0; i < result.length; i++){
      currentAtt.children[i].style.background = result[i]
      await animateCSS(currentAtt.children[i], "flipInX")
     }

      currentChar = 0;
      currentWord++;
    } else {
      alert("No Enough Letters !");
    }
  } else if (event.key == "Backspace") {
    if (currentChar > 0) {
      currentChar--;
      currentAtt.children[currentChar].innerHTML = "";
    }
  } else if (currentChar < NUMBER_OF_CHARS) {
    if (event.key.charCodeAt() >= 97 && event.key.charCodeAt() <= 122) {
      currentAtt.children[currentChar].innerHTML = event.key;
      currentChar++;
    }
  }
});
//end document "addEventListener"

const getCurrentWord = () => {
  let word = "";
  const wordDiv = wordsDiv.children[currentWord];
  for (let i = 0; i < wordDiv.children.length; i++) {
    word = word + wordDiv.children[i].innerHTML;
  }
  return word;
};
//end const "getCurrentWord"

const guess = async (word) => {
  const request = await fetch("/guess26/" + word);
  const result = await request.json();
  return result;
};
//end const "guess"

function animateCSS(element, animation, prefix = "animate__") {
  // We create a Promise and return it
  return new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;

    element.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      element.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }
    element.addEventListener("animationend", handleAnimationEnd, {
      once: true,
    });
  });
}//end animation
