function updateMealOptions() {
  const guests = Array.from(document.querySelectorAll('input[name="guests[]"]:checked')).map(input => input.getAttribute('value'));
  const mealOptionsContainer = document.getElementById('mealOptions');
  mealOptionsContainer.innerHTML = '';

  guests.forEach(guest => {
    const mealOptionDiv = document.createElement('div');
    mealOptionDiv.classList.add('diet-option');
    mealOptionDiv.innerHTML = `
      <label>Select a meal for ${guest}</label>
      <div class="input-holder">
        <label for="steak-${guest}">Grilled NY Strip Steak w/ Whiskey Demi-Glaze</label>
        <input type="radio" name="meal_${guest}" id="steak-${guest}" value="steak" checked>
      </div>
      <div class="input-holder">
        <label for="salmon-${guest}">Oven Roasted Atlantic Salmon w/ Tomato Vinaigrette</label>
        <input type="radio" name="meal_${guest}" id="salmon-${guest}" value="salmon">
      </div>
    `;
    mealOptionsContainer.appendChild(mealOptionDiv);
  });
}


// Add event listener to guest checkboxes
const guestCheckboxes = document.querySelectorAll('input[name="guests[]"]');
guestCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', updateMealOptions);
});

// Call the function initially to populate the meal options based on the initial state of checkboxes
updateMealOptions();


// Function to handle form submission
function submitForm(event) {
  event.preventDefault();
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;

//  var guests = Array.from(document.querySelectorAll('input[name="guests[]"]:checked')).map(input => input.value);
  var guests = Array.from(document.querySelectorAll('input[name="guests[]"]:checked')).map(input => input.getAttribute('value'));

  // Prepare data for submission
  var formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);

  guests.forEach((guest, index) => {
    formData.append(`guest${index + 1}`, guest);
    formData.append(`meal${index + 1}`, document.querySelector(`input[name="meal_${guest}"]:checked`).value);

  });

  // Submit data to Google Sheets
var url = "https://script.google.com/macros/s/AKfycbz3inM8CDHUJJq4qr5HLbbM_c6DpHEgpcEZYa9NvPSPV3vFjYUKcAGhmrG0UAd1F-mG/exec";
fetch(url, { method: "POST", body: formData })
  .then(function (response) {
    if (response.ok) {
      // Redirect to confirmation page
      redirectToConfirmationPage(name, email, guests); // Pass the guests array as a parameter
    } else {
      throw new Error("Error submitting form.");
    }
  })
  .catch(function (error) {
    console.error(error);
    alert("Error submitting form. Please try again later.");
  });
}




// Function to redirect to confirmation page
function redirectToConfirmationPage(name, email, guests) {
  var confirmationUrl = 'confirmation.html'; // Replace with the actual URL of the confirmation page
  // Append query parameters to the URL if needed
  confirmationUrl += `?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`;
  guests.forEach((guest, index) => {
    confirmationUrl += `&guest${index + 1}=${encodeURIComponent(guest)}`;
  });
  window.location.href = confirmationUrl;
}


// Add event listener to form submission
var form = document.getElementById('questionForm');
form.addEventListener('submit', submitForm);



function validatePhone() {
  const phoneInput = document.getElementById('phone');
  // const phoneNumber = phoneInput.value.replace(/\D/g, ''); // Remove non-digit characters
  const phoneNumber = phoneInput.value.replace(/\s/g, ''); // Remove white spaces


  const phonePattern = /^(\d{10}|\(\d{3}\)\s?\d{3}\s?-?\d{4}|\d{3}-\d{3}-\d{4})$/;

    if (!phonePattern.test(phoneNumber)) {
      alert('Please enter a valid phone number in the formats 1234567890, (123) 456-7890, or 123-456-7890.');
      phoneInput.value = ''; // Clear the input
      phoneInput.focus(); // Set focus back to the phone input
      return false;
    }

  document.querySelector('.anchor-email').scrollIntoView();
}
