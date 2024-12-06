const quoteText = document.querySelector(".quote"),
  animeName = document.querySelector(".anime .anime-title"),
  characterName = document.querySelector(".character .character-name"),
  textToSpeech = document.querySelector(".sound"),
  copyQuote = document.querySelector(".copy"),
  newQuote = document.querySelector("button");

function randomQuote() {
  newQuote.classList.add("loading");
  newQuote.innerText = "Loading Quote...";

  fetch("https://animechan.io/api/v1/quotes/random")
    .then((res) => res.json())
    .then((result) => {
      const quoteData = result.data;
      quoteText.innerText = quoteData.content;
      animeName.innerText = quoteData.anime.name; 
      characterName.innerText = quoteData.character.name; 
      newQuote.innerText = "New Quote";
      newQuote.classList.remove("loading");
    })
    .catch((err) => {
      console.error("Error fetching quote:", err);
      newQuote.innerText = "Try Again!";
      newQuote.classList.remove("loading");
    });
}

textToSpeech.addEventListener("click", () => {
  let utterance = new SpeechSynthesisUtterance(quoteText.innerText);
  speechSynthesis.speak(utterance);
});

copyQuote.addEventListener("click", () => {
  navigator.clipboard.writeText(quoteText.innerText);
});

newQuote.addEventListener("click", randomQuote);
