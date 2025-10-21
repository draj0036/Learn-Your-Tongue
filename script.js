console.log("Hello, world!");
// alert("Welcome to your language learning site!");

// Lesson data for Tamil letters
const TamilLessons = [
  { lessonName: "Lesson 1 - Vowels Part 1", letters: [
      { letter: "அ", correct: "a" },
      { letter: "ஆ", correct: "aa" },
      { letter: "இ", correct: "e" },
      { letter: "ஈ", correct: "ee" },
      { letter: "உ", correct: "u" },
      { letter: "ஊ", correct: "uu" },
    ], infoText: "Tamil has short and long vowels, usually, the long vowels written as a modified form of the short vowels (some exceptions). For example in english, sounds from 'mitten' vs 'meet' are represented by different letters. (இ/ஈ)"
  },
  { lessonName: "Lesson 2 - Vowels Part 2", letters: [
      { letter: "எ", correct: "ae" },
      { letter: "ஏ", correct: "aee" },
      { letter: "ஐ", correct: "ai" },
      { letter: "ஒ", correct: "oh" },
      { letter: "ஓ", correct: "ohh" },
      { letter: "ஔ", correct: "au" },
      { letter: "ஃ", correct: "ah" },
    ]
  },
  { lessonName: "Lesson 3 - Consonants Part 1", letters: [
      { letter: "க", correct: "ka" },
      { letter: "ச", correct: "sa/cha" },
      { letter: "த", correct: "tha" },
      { letter: "ம", correct: "ma" },
      { letter: "ட", correct: "ta" },
      { letter: "ண", correct: "na" },
    ]
  },
  { lessonName: "Lesson 4 - Consonants Part 2", letters: [
      { letter: "ஞ", correct: "nya" },
      { letter: "ந", correct: "na" },
      { letter: "ப", correct: "pa" },
      { letter: "ங", correct: "nga" },
      { letter: "ய", correct: "ya" },
      { letter: "ர", correct: "ra" },
    ]
  },
  { lessonName: "Lesson 5 - Consonants Part 3", letters: [
      { letter: "ல", correct: "la" },
      { letter: "வ", correct: "va" },
      { letter: "ழ", correct: "zha" },
      { letter: "ள", correct: "la" },
      { letter: "ற", correct: "ra" },
      { letter: "ன", correct: "na" },
    ]
  },
  { lessonName: "Lesson 6 - Ka Family", letters: [
      { letter: "க", correct: "ka" },

      { letter: "கா", correct: "kaa" },
      { letter: "கி", correct: "ki" },
      { letter: "கீ", correct: "kee" },
      { letter: "கு", correct: "ku" },
      { letter: "கூ", correct: "kuu" },
      { letter: "கெ", correct: "ke" },
      { letter: "கே", correct: "kee" },
      { letter: "கை", correct: "kai" },
      { letter: "கொ", correct: "koh" },
      { letter: "கோ", correct: "kohh" },
      { letter: "கௌ", correct: "kau" },
      { letter: "க்", correct: "k" },
      { letter: "கை", correct: "kai" },
      
    ],
    infoText: "In Tamil, consonants are modifed by vowels to change how they sound. This lesson covers the 'Ka' family of letters in Tamil. Notice the different vowel sounds associated with each consonant."
  },
  { lessonName: "Lesson 7 - Sa/Cha Family", letters: [
      { letter: "ச", correct: "sa/cha" },
      { letter: "சா", correct: "saa/chaa" },
      { letter: "சி", correct: "si/chi" },
      { letter: "சீ", correct: "see/chee" },
      { letter: "சு", correct: "su/chu" },
      { letter: "சூ", correct: "suu/chuu" },
      { letter: "செ", correct: "se/che" },
      { letter: "சே", correct: "see/chee" },
      { letter: "சை", correct: "sai/chai" },
      { letter: "சொ", correct: "soh/choh" },
      { letter: "சோ", correct: "sohh/chohh" },
      { letter: "சௌ", correct: "sau/chau" },
      { letter: "ச்", correct: "s/ch" },
    ],
    infoText: "In Tamil, consonants are modifed by vowels to change how they sound. This lesson covers the 'Sa/Cha' family of letters in Tamil. Notice the different vowel sounds associated with each consonant."
  }
];


//Vowels never have their own letter unless it's the first letter in their word


// Track which lesson and letter we are on
let currentLessonIndex = 0;
let currentLetterIndex = 0;



function showLetter() {
  const lesson = TamilLessons[currentLessonIndex];
  const letter = lesson.letters[currentLetterIndex].letter;

  // Update HTML
  document.getElementById("lessonName").textContent = lesson.lessonName;
  document.getElementById("letter").textContent = letter;
}

function showOptions(currentIndex) {
  const quizDiv = document.getElementById("quiz");

  // Clear previous buttons
  quizDiv.innerHTML = "";

  // Get options (1 correct + 3 random wrong answers)
  const correct = TamilLessons[currentLessonIndex].letters[currentIndex].correct;

  // pick wrong answers from other letters
  const otherAnswers = TamilLessons[currentLessonIndex].letters // later change to take from this and previous lessons
    .map(l => l.correct)
    .filter(a => a !== correct);

  // shuffle & pick 3 wrong answers
  const shuffled = otherAnswers.sort(() => Math.random() - 0.5);
  const wrongs = shuffled.slice(0, 3);

  // combine correct + wrongs and shuffle
  const allOptions = [correct, ...wrongs].sort(() => Math.random() - 0.5);

  // create buttons
  allOptions.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;

    // check answer when clicked
    btn.onclick = () => checkAnswer(option, currentIndex);

    quizDiv.appendChild(btn);
  });
}
function checkAnswer(selected, currentIndex) {
  const correct = TamilLessons[currentLessonIndex].letters[currentIndex].correct;
  const resultDiv = document.getElementById("result");

  if (selected === correct) {
    resultDiv.textContent = "Correct!";
    resultDiv.style.color = "green";
  } else {
    resultDiv.textContent = `Wrong! The correct answer is "${correct}".`;
    resultDiv.style.color = "red";
  }


}

function nextLetter() {
  const resultDiv = document.getElementById("result");
  resultDiv.textContent = ""; // Clear previous result
  const quizDiv = document.getElementById("quiz");
  quizDiv.innerHTML = ""; // Clear previous quiz options
  currentLetterIndex++;
  if (currentLetterIndex >= TamilLessons[currentLessonIndex].letters.length) {
    nextLesson();
  } else {
    
    showLetter();
    showOptions(currentLetterIndex);
}
}

function nextLesson(LessonChoice) {
  // Check if the current lesson is the last one
  
if (!LessonChoice) {
  if (currentLessonIndex + 1 >= TamilLessons.length) {
    alert("Congratulations! You have completed all lessons.");
    currentLessonIndex = 0; // Restart from first lesson
  } else {
    currentLessonIndex++; // Move to the next lesson
  }
} else {
  // this code does:
  const lessonNum = // define constant lessonnum
  typeof LessonChoice === 'string' // chck if its a string
  ? parseInt(LessonChoice.replace("lesson", ""), 10) - 1 //ParseInt if string
  : LessonChoice // Just take LessonChoice if nto string

  currentLessonIndex = lessonNum;// Parse through string to find int, in base 10
}

  // Clear any feedback or options
  const resultDiv = document.getElementById("result");
  resultDiv.textContent = "";
  const quizDiv = document.getElementById("quiz");
  quizDiv.innerHTML = ""; // Clear previous quiz options
  document.getElementById("quiz").innerHTML = "";

  // Show the next lesson
  currentLetterIndex = 0;
  showLetter();
  showOptions(currentLetterIndex);

}
function storeProgress(currentLessonIndex) {
  // ensure u adjust lesson num in this for indexing starting at 0
  localStorage.setItem("currentLesson", currentLessonIndex);
  let LessonProgTracker = {}
  for (let i = 0; i <= currentLessonIndex; i++) {
  LessonProgTracker[i] = 'completed';
  }
}

const lessonTree = document.getElementById("lessonTree")
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");
for (let i = 0 ; i < TamilLessons.length; i++) { // generate lesson buttons and hide lesson tree when clicked
  const lesson = TamilLessons[i].lessonName
  let btn = document.createElement('button')
  btn.textContent = TamilLessons[i].lessonName;
  btn.dataset.lessonIdx= i
  lessonTree.appendChild(btn);
  btn.onclick = () => {
    nextLesson(i)
    //document.getElementById("lessonTree").style.display = "none"; // hide lesson tree
    lessonTree.style.display = "none"; // hide lesson tree
    lessonContent.style.display = "block"; // show lesson content

  }

}

backBtn.onclick = () => {
    lessonTree.style.display = "block"; // show lesson tree
    lessonContent.style.display = "none"; // hide lesson content
}


// prior code that had my next lesson logic

document.getElementById("nextBtn").onclick = () => {
  const resultDiv = document.getElementById("result");
  if (resultDiv.textContent !== "") {
    nextLetter();
  } else {
    alert("Please select an answer before proceeding to the next letter.");
  }
  resultDiv.textContent = ""
};

// prior dropdown menu for lesson selection
// const lessonPick = document.getElementById("ChLsn")
// lessonPick.onchange = () => {
//   console.log(lessonPick.value)
//   nextLesson(lessonChoice = lessonPick.value) // give the 'name' into func


// };

