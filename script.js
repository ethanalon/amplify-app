// // Variables
// var questions = document.querySelectorAll('.question');
// var currentQuestionIndex = 0;
// var form = document.getElementById('questionForm');
// var nextButton = document.getElementById('nextButton');
// var prevButton = document.getElementById('backButton');
// // var questionIndexDisplay = document.getElementById('questionIndexDisplay');

// // Function to update the question index display
// // function updateQuestionIndexDisplay() {
// //   var questionIndex = currentQuestionIndex + 1;
// //   var totalQuestions = questions.length;
// //   questionIndexDisplay.textContent = 'Question ' + questionIndex + ' of ' + totalQuestions;
// // }

// // Function to show the next question
// function showNextQuestion() {
//   // if (currentQuestionIndex < questions.length - 1) {
//     // questions[currentQuestionIndex].classList.remove('active');
//     currentQuestionIndex++;
//     // questions[currentQuestionIndex].classList.add('active');
//     questions[currentQuestionIndex+1].scrollIntoView({ behavior: 'smooth' });
//     // updateQuestionIndexDisplay();
//   // }
// }

// // Function to show the previous question
// function showPreviousQuestion() {
//   // if (currentQuestionIndex > 0) {
//     // questions[currentQuestionIndex].classList.remove('active');
//     currentQuestionIndex--;
//     // questions[currentQuestionIndex].classList.add('active');
//     questions[currentQuestionIndex-1].scrollIntoView({ behavior: 'smooth' });
//     // updateQuestionIndexDisplay();
//   // }
// }

// Function to handle form submission
function submitForm(event) {
  event.preventDefault();
  var name = document.getElementById('name').value;
  // var phone = document.getElementById('phone').value;
  var email = document.getElementById('email').value;

  // var confirmationMessage = document.getElementById('confirmation-message');
  // confirmationMessage.innerHTML = 'Thank you, ' + name + ', for your submission! We will contact you at ' + phone + ' shortly.';

  // // Form validation
  // if (!name || !email) {
  //   alert('Please fill out all fields.');
  //   return;
  // }

  // alert("Thank you " + name + "! We will get back to you shortly at " + email)

  // Submit data to Google Sheets
  // var SCRIPT_ID = 'YOUR_SCRIPT_ID';
  // var url = `https://script.google.com/macros/s/${SCRIPT_ID}/exec?name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&email=${encodeURIComponent(email)}&sheet=RSVP`;
  // fetch(url)
  //   .then(function (response) {
  //     if (response.ok) {
  //       showConfirmationPage(name, phone, email);
  //     } else {
  //       throw new Error('Error submitting form.');
  //     }
  //   })
  //   .catch(function (error) {
  //     console.error(error);
  //     alert('Error submitting form. Please try again later.');
  //   });

    // window.location.href = `/confirmation.html?name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&email=${encodeURIComponent(email)}`;
    redirectToConfirmationPage(name, phone, email)

}

function redirectToConfirmationPage(name, phone, email) {
  var confirmationUrl = 'confirmation.html'; // Replace with the actual URL of the confirmation page
  // Append query parameters to the URL if needed
  confirmationUrl += `?name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&email=${encodeURIComponent(email)}`;
  window.location.href = confirmationUrl;
}

// Function to show confirmation page
// function showConfirmationPage(name, phone, email) {
//   window.location.href = `/confirmation.html?name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&email=${encodeURIComponent(email)}`;
// }

// Function to add event listeners
function addEventListeners() {
  var nextButtons = document.querySelectorAll('.nextButton');
  var prevButtons = document.querySelectorAll('.backButton');

  nextButtons.forEach(function (button) {
    button.addEventListener('click', showNextQuestion);
  });

  prevButtons.forEach(function (button) {
    button.addEventListener('click', showPreviousQuestion);
  });
  // form.addEventListener('submit', submitForm);
}

// Function to handle Enter key press
// function handleEnterKeyPress(event) {
//   if (event.key === 'Enter') {
//     // event.preventDefault();
//     // // if (event.shiftKey && currentQuestionIndex > 0) {
//     // if (event.shiftKey) {
//     //   showPreviousQuestion();
//     // // } else if (currentQuestionIndex < questions.length - 1) {
//     // } else if (questions[currentQuestionIndex+1]) {
//     //   showNextQuestion();
//     // } else {
//       submitForm(event);
//     // }
//   }
// }

// // Initialize the script
// document.addEventListener('keydown', handleEnterKeyPress);
addEventListeners();
// updateQuestionIndexDisplay();
