// Variables
var questions = document.querySelectorAll('.question');
var currentQuestionIndex = 0;
var form = document.getElementById('questionForm');
var nextButton = document.getElementById('nextButton');
var prevButton = document.getElementById('prevButton');

// Function to show the next question
function showNextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    questions[currentQuestionIndex].classList.remove('active');
    currentQuestionIndex++;
    questions[currentQuestionIndex].classList.add('active');
    questions[currentQuestionIndex].scrollIntoView({ behavior: 'smooth' });
  }
}

// Function to show the previous question
function showPreviousQuestion() {
  if (currentQuestionIndex > 0) {
    questions[currentQuestionIndex].classList.remove('active');
    currentQuestionIndex--;
    questions[currentQuestionIndex].classList.add('active');
    questions[currentQuestionIndex].scrollIntoView({ behavior: 'smooth' });
  }
}

// Function to handle form submission
function submitForm(event) {
  event.preventDefault();
  var name = document.getElementById('name').value;
  var phone = document.getElementById('phone').value;
  var email = document.getElementById('email').value;

  // Form validation
  if (!name || !phone || !email) {
    alert('Please fill out all fields.');
    return;
  }

  // Submit data to Google Sheets
  var SCRIPT_ID = '1rKb3ZhvMwfdZZy_Y5TYl6DZNDTaWdJZkArQYmhYzy-gJingDXRKZFkAj';
  var url = `https://script.google.com/macros/s/${SCRIPT_ID}/exec?name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&email=${encodeURIComponent(email)}&sheet=RSVP`;
  fetch(url)
    .then(function(response) {
      if (response.ok) {
        showConfirmationPage(name, phone, email);
      } else {
        throw new Error('Error submitting form.');
      }
    })
    .catch(function(error) {
      console.error(error);
      alert('Error submitting form. Please try again later.');
    });
}

// Function to show confirmation page
function showConfirmationPage(name, phone, email) {
  window.location.href = `confirmation.html?name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&email=${encodeURIComponent(email)}`;
}

// Function to copy color to clipboard
function copyColor(color) {
  navigator.clipboard.writeText(color);
  alert("Copied the color: " + color);
}

// Function to add event listeners
function addEventListeners() {
  nextButton.addEventListener('click', showNextQuestion);
  prevButton.addEventListener('click', showPreviousQuestion);
  form.addEventListener('submit', submitForm);
}

// Function to handle Enter key press
function handleEnterKeyPress(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    if (event.shiftKey && currentQuestionIndex > 0) {
      showPreviousQuestion();
    } else if (currentQuestionIndex < questions.length - 1) {
      showNextQuestion();
    } else {
      submitForm(event);
    }
  }
}

// Initialize the script
document.addEventListener('keydown', handleEnterKeyPress);
addEventListeners();
