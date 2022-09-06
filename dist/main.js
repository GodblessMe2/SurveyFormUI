// Question Array
const questions = [
    {question: 'Enter Your First Name'},
    {question: 'Enter Your Last Name'},
    {question: 'Enter Your Email', pattern: /\S+@\S+\.\S+/},
    {question: 'Create A Password', type: 'password'}
];

// Transition Times 
const shakeTime = 100; // Shake Transition Time
const switchTime = 200; // Transition Between Question

// Init Position At First Question
let position = 0; 

// Init the DOM Elements
let formBody = document.querySelector('#body-card');
let nextBtn = document.querySelector('#next-btn');
let prevBtn = document.querySelector('#prev-btn');
let inputField = document.querySelector('#input-field');
let inputGroup = document.querySelector('#input-group');
let inputLabel = document.querySelector('#input-label');
let inputProgress = document.querySelector('#input-progress');
let progressBar = document.querySelector('#progress-bar');

// Event Listener
document.addEventListener('DOMContentLoaded', getQuestion);

// Validate Input If There Is Something Or Nothing
nextBtn.addEventListener('click', getValidate);

// Input Field Enter Click
inputField.addEventListener("keyup", function(e) {
  if (e.keyCode == 13) {
      getValidate();
  }
});

// FUNCTION AREA

// Get Question From Each Array & Add To MarkUp
function getQuestion() {
    // Get Current Questions
    inputLabel.innerHTML = questions[position].question;

    // Get Current Type
    inputField.type = questions[position].type || 'text';

    // Get Current Answer
    inputField.value = questions[position].answer || '';

    // Focus On The Current Element
    inputField.focus();

    // Set Progress Bar Width - Variable To The Question Length
    progressBar.style.width = (position * 100) / questions.length + '%';

    // Add User Icon Or Back Arrow Icon If The User Add Something
    prevBtn.className = position ? 'fa fa-arrow-left': 'fa fa-user';

    // Show Question
    showQuestion();
}

// Display Question Input
function showQuestion() {
    inputGroup.style.opacity = 1; 
    inputProgress.style.transition = '';
    inputProgress.style.width = '100%';
}

function hideQuestion() {
    inputGroup.style.opacity = 0;
    inputProgress.style.width = 0;
    inputProgress.style.transition = 'none';
    inputLabel.style.marginLeft = 0;
    inputGroup.style.border = null;
}

// Transform To Create Shake Motion
function transform(x, y) {
    formBody.style.transform = `translate(${x}px, ${y}px)`;
}

function getValidate() {
    // Check If There Is Input And Pattern Matches if There Is One
    if (!inputField.value.match(questions[position].pattern || /.+/)) {
        inputFail();
    } else {
        inputPass();
    }
}

function inputFail() {
  formBody.classList = 'error';
  // Repeat Shake Motion - Set I To Number Of Shakes
  for (let i = 0; i< 6; i++) {
        setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);  
        setTimeout(transform, shakeTime * 6, 0, 0);
        inputField.focus();
    }
}

function inputPass() {
  formBody.className = '';
  setTimeout(transform, shakeTime * 0, 0, 10);
  setTimeout(transform, shakeTime * 1, 0, 0);

  // Store Answer In An Array
  questions[position].answer = inputField.value;

  // Increment Position
  position++;

  // If New Question, Hide The Current And Get Next
   if (questions[position]) {
       hideQuestion();
       getQuestion();    
   } else {
     // Remove If There Is No More Questions
     hideQuestion();
     formBody.className = 'close';
     progressBar.style.width = '100%';
     
     formComplete();
   }
} 

// All Fields Complete Then Display H1
function formComplete() {
  const h1 = document.createElement('h1');
  h1.classList.add('end');
  h1.appendChild(document.createTextNode(`Thanks ${questions[0].answer} You are registered and will get an email shortly`));

  setTimeout(() => {
    formBody.parentElement.appendChild(h1);
    setTimeout(() => {
        h1.style.opacity = 1;
    }, 50);
  }, 1000);

  getData(questions);
}

function getData(questions) {
    questions.forEach(function(question){
      console.log(question.answer);
    })
}