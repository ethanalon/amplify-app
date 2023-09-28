// invite.js
document.getElementById('rsvpForm').addEventListener('submit', function(event) {
  event.preventDefault();

  var family_name = document.getElementById('family_name').value;
  var invite_code = document.getElementById('invite_code').value;

  console.log(family_name, invite_code);

  var redirectUrl = `/rsvp/${encodeURIComponent(family_name)}/${invite_code}`;
  window.location.href = redirectUrl;
});
