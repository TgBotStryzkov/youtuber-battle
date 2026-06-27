const SUPABASE_URL = "https://qvmclzjvnmkmtxhrazwr.supabase.co";
const SUPABASE_KEY = "sb_publishable_6PDzwQ-x9cL3e8ft5k5kFg_0UjCQNFT";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
const bloggers = [
  {
    name: "MrBeast",
    image: "images/mrbeast.jpg"
  },
  {
    name: "Влад А4",
    image: "images/a4.jpg"
  },
  {
    name: "Kuplinov",
    image: "images/kuplinov.jpg"
  },
  {
    name: "Marmok",
    image: "images/marmok.jpg"
  },
  {
    name: "Edison",
    image: "images/edison.jpg"
  },
  {
    name: "EeOneGuy",
    image: "images/eeoneguy.jpg"
  },
  {
    name: "Дима Масленников",
    image: "images/maslennikov.jpg"
  },
  {
    name: "Мелстрой",
    image: "images/mellstroy.jpg"
  },
  {
    name: "Бустер",
    image: "images/booster.jpg"
  },
  {
    name: "Литвин",
    image: "images/litvin.jpg"
  },
  {
    name: "Компот",
    image: "images/kompot.jpg"
  },
  {
    name: "Поззи",
    image: "images/pozzi.jpg"
  },
  {
    name: "FixEye",
    image: "images/fixeye.jpg"
  },
  {
    name: "Ярик Кент",
    image: "images/yarik.jpg"
  },
  {
    name: "Даня Милохин",
    image: "images/milohin.jpg"
  },
  {
    name: "Аид",
    image: "images/aid.jpg"
  }
];

let shuffledBloggers = [];
let currentWinner = null;
let currentOpponent = null;
let round = 1;
let index = 0;

const battleBlock = document.getElementById("battleBlock");
const resultBlock = document.getElementById("resultBlock");

const roundText = document.getElementById("roundText");

const leftCard = document.getElementById("leftCard");
const rightCard = document.getElementById("rightCard");

const leftImage = document.getElementById("leftImage");
const rightImage = document.getElementById("rightImage");

const leftName = document.getElementById("leftName");
const rightName = document.getElementById("rightName");

const winnerImage = document.getElementById("winnerImage");
const winnerName = document.getElementById("winnerName");

const restartBtn = document.getElementById("restartBtn");
const shareBtn = document.getElementById("shareBtn");

const ratingList = document.getElementById("ratingList");

function startGame() {
  shuffledBloggers = shuffleArray([...bloggers]);

  currentWinner = shuffledBloggers[0];
  currentOpponent = shuffledBloggers[1];

  index = 2;
  round = 1;

  battleBlock.classList.remove("hidden");
  resultBlock.classList.add("hidden");

  showBattle();
  showRating();
}

function showBattle() {
  roundText.textContent = `Раунд ${round}`;

  leftName.textContent = currentWinner.name;
  leftImage.src = currentWinner.image;

  rightName.textContent = currentOpponent.name;
  rightImage.src = currentOpponent.image;
}

function chooseWinner(winner) {
  currentWinner = winner;

  addVote(winner.name);

  if (index >= shuffledBloggers.length) {
    showResult();
    return;
  }

  currentOpponent = shuffledBloggers[index];
  index++;
  round++;

  showBattle();
  showRating();
}

function showResult() {
  battleBlock.classList.add("hidden");
  resultBlock.classList.remove("hidden");

  winnerName.textContent = currentWinner.name;
  winnerImage.src = currentWinner.image;

  showRating();
}

function addVote(name) {
  let rating = JSON.parse(localStorage.getItem("bloggerRating")) || {};

  if (!rating[name]) {
    rating[name] = 0;
  }

  rating[name]++;

  localStorage.setItem("bloggerRating", JSON.stringify(rating));
}

function showRating() {
  let rating = JSON.parse(localStorage.getItem("bloggerRating")) || {};

  ratingList.innerHTML = "";

  const sortedRating = Object.entries(rating).sort((a, b) => b[1] - a[1]);

  if (sortedRating.length === 0) {
    ratingList.innerHTML = "<p>Пока голосов нет</p>";
    return;
  }

  sortedRating.forEach((item, position) => {
    const name = item[0];
    const votes = item[1];

    const div = document.createElement("div");
    div.className = "rating-item";
    div.innerHTML = `
      <span>${position + 1}. ${name}</span>
      <span>${votes} голосов</span>
    `;

    ratingList.appendChild(div);
  });
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

leftCard.addEventListener("click", function () {
  chooseWinner(currentWinner);
});

rightCard.addEventListener("click", function () {
  chooseWinner(currentOpponent);
});

restartBtn.addEventListener("click", function () {
  startGame();
});

shareBtn.addEventListener("click", function () {
  navigator.clipboard.writeText(window.location.href);
  shareBtn.textContent = "Ссылка скопирована!";

  setTimeout(function () {
    shareBtn.textContent = "Скопировать ссылку";
  }, 2000);
});

startGame();
