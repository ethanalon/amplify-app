

var name = document.getElementById('name').value;
  var phone = document.getElementById('phone').value;
  var email = document.getElementById('email').value;


var confirmationMessage = document.getElementById('confirmation-message');
  confirmationMessage.innerHTML = 'Thank you, ' + name + ', for your submission! We will contact you at ' + phone + ' shortly.';
