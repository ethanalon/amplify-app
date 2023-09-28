function updateMealOptions() {
  console.log("updateMealOptions called");
  const guests = Array.from(document.querySelectorAll('input[name="guests[]"]:checked')).map(input => input.getAttribute('value'));
  // console.log(guests)
  // guests.forEach(guest =>{
  //   console.log(guest, document.querySelector(`input[name="meal_${guest}"]:checked`))
  // });

  const mealOptionsContainer = document.getElementById('mealOptions');
  mealOptionsContainer.innerHTML = '';

  guests.forEach(guest => {
    const mealOptionDiv = document.createElement('div');
    mealOptionDiv.classList.add('diet-option');
    mealOptionDiv.innerHTML = `
      <label>Select a meal for ${guest}</label>
      <div class="input-holder">
        <label for="steak-${guest}">6oz Grilled Filet Mignon with Roasted Cippolini Demiglace</label>
        <input type="radio" name="meal_${guest}" id="steak-${guest}" value="steak" checked>
      </div>
      <div class="input-holder">
        <label for="salmon-${guest}">Roasted Halibut with Tomato Brandy Cream Sauce</label>
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


function printData(){
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var policy = document.getElementById('policy').value;

  //  var guests = Array.from(document.querySelectorAll('input[name="guests[]"]:checked')).map(input => input.value);
  var guests = Array.from(document.querySelectorAll('input[name="guests[]"]:checked')).map(input => input.getAttribute('value'));
  
  // Create an object to store all form data, including guests and meals
  var formData = {
    name: name,
    email: email,
    policy: policy,
    guests: guests.map(guest => {
      return {
        guestName: guest,
        mealChoice: document.querySelector(`input[name="meal_${guest}"]:checked`).value
      };
    })
  };
  
  console.log(formData);
  var formDataJSON = JSON.stringify(formData);
  console.log(formDataJSON);
  document.querySelector('.anchor-thanks').scrollIntoView();
}

function submitForm(event) {
  event.preventDefault();
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var policy = document.getElementById('policy').value;

  //  var guests = Array.from(document.querySelectorAll('input[name="guests[]"]:checked')).map(input => input.value);
  var guests = Array.from(document.querySelectorAll('input[name="guests[]"]:checked')).map(input => input.getAttribute('value'));
  
  // Create an object to store all form data, including guests and meals
  var formData = {
    name: name,
    email: email,
    policy: policy,
    guests: guests.map(guest => {
      return {
        guestName: guest,
        mealChoice: document.querySelector(`input[name="meal_${guest}"]:checked`).value
      };
    })
  };

  // Serialize the formData object to JSON
  var formDataJSON = JSON.stringify(formData);

  // Submit data to Google Sheets
  var url = "https://script.google.com/macros/s/AKfycbznZeWoFbtrTZ4-xmYfvD50HIHhq9DrfwSLZnHydFtlXIo3o4c3guHpwPzyBlzcA4u0/exec";
  console.log("I'm submitting!")
  fetch(url, {  method: "POST", 
                headers: {
                  'Content-Type': 'application/json'
                  },
                body: formDataJSON })
    .then(function (response) {
      if (response.ok) {
        // redirectToConfirmationPage(formData); 
        console.log("Yay it worked!");
      } else {
        throw new Error("Error submitting form.");
      }
    })
    .catch(function (error) {
      console.error(error);
      alert("Error submitting form. Please try again later.");
    });
}

// // Function to redirect to confirmation page
// function redirectToConfirmationPage(name, email, guests) {
//   var confirmationUrl = 'confirmation.html'; // Replace with the actual URL of the confirmation page
//   // Append query parameters to the URL if needed
//   confirmationUrl += `?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`;
//   guests.forEach((guest, index) => {
//     confirmationUrl += `&guest${index + 1}=${encodeURIComponent(guest)}`;
//   });
//   window.location.href = confirmationUrl;
// }


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
