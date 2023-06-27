

// var name = document.getElementById('name').value;
//   var phone = document.getElementById('phone').value;
//   var email = document.getElementById('email').value;


// var confirmationMessage = document.getElementById('confirmation-message');
//   confirmationMessage.innerHTML = 'Thank you, ' + name + ', for your submission! We will contact you at ' + phone + ' shortly.';

// Function to extract URL parameters by name
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Function to display the personalized message
function displayMessage() {
  var name = getParameterByName('name');
  var phone = getParameterByName('phone');
  var email = getParameterByName('email');

  var messageElement = document.getElementById('message');
  var message = 'Thank you, ' + name + ', for your RSVP!' + '\n'
                + 'Phone: ' + phone + '<br>'
                + 'Email: ' + email + '<br>' ;
  messageElement.textContent = message;

  



}
