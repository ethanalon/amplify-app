// Function to extract URL parameters
function getURLParameters() {
    var searchParams = new URLSearchParams(window.location.search);
    var params = {};
  
    for (var param of searchParams) {
      params[param[0]] = param[1];
    }
  
    return params;
  }
  
  // Function to populate the confirmation message
  function populateConfirmationMessage() {
    var parameters = getURLParameters();
    var name = parameters['name'];
    var phone = parameters['phone'];
  
    var confirmationMessage = document.getElementById('confirmation-message');
    confirmationMessage.innerHTML = 'Thank you, ' + name + ', for your submission! We will contact you at ' + phone + ' shortly.';
  }
  
  // Call the function to populate the confirmation message
  populateConfirmationMessage();
  