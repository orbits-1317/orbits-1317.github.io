// Submit
function validateAndShowDialog() {
  const nickname = document.getElementById('name');
  const identity = document.getElementById('number');
  const whatsapp = document.getElementById('phone');
  const comment = document.getElementById('message');

  let isValid = true;

  // Reset
  [nickname, identity, whatsapp, comment].forEach((field) => {
    field.classList.remove('error_input');
    document.getElementById(`${field.id}_error`).style.display = 'none';
  });
  // Nickname
  if (!nickname.value.trim()) {
    nickname.classList.add('error_input');
    document.getElementById('name_error').style.display = 'block';
    isValid = false;
  }
  // Identity
  const identityValue = identity.value.trim();
  if (!identityValue || !/^\d+$/.test(identityValue) || identityValue.length < 6) {
    identity.classList.add('error_input');
    document.getElementById('number_error').style.display = 'block';
    isValid = false;
  }
  // WhatsApp number
  const whatsappValue = whatsapp.value.trim();
  const digitsOnly = whatsappValue.replace(/\D/g, '');
  if (
    !whatsappValue || 
    !/^\+\d+$/.test(whatsappValue) || 
    whatsappValue.split('+').length > 2 || 
    digitsOnly.length < 8 || 
    digitsOnly.length > 18 
  ) {
    whatsapp.classList.add('error_input');
    document.getElementById('phone_error').style.display = 'block';
    isValid = false;
  }
  // Message
  if (!comment.value.trim()) {
    comment.classList.add('error_input');
    document.getElementById('message_error').style.display = 'block';
    isValid = false;
  }
  // Dialog
  if (isValid) {
    showMessage(null);
    window.dialog.showModal();
  }
}

// Validate WhatsApp
document.getElementById('phone').addEventListener('input', function (e) {
  const input = e.target;
  let value = input.value;

  value = value.replace(/[^+\d]/g, '');

  if (value[0] !== '+') {
    value = '+' + value.replace(/\+/g, '');
  }

  input.value = value;
});

// Utility
function showMessage(messageType) {
  const successMessage = document.getElementById('mail_success');
  const failMessage = document.getElementById('mail_fail');
  // Reset
  successMessage.style.display = 'none';
  failMessage.style.display = 'none';
  // Failure n Success
  if (messageType === 'success') {
    successMessage.style.display = 'block';
    setTimeout(() => {
      successMessage.style.display = 'none';
    }, 4500);
  } else if (messageType === 'fail') {
    failMessage.style.display = 'block';
  }
}

// btn-cancel
function processCancel() {
  window.dialog.close();
  showMessage('fail');
}

// btn-confirm
function processAndSend() {
  const nickname = document.getElementById('name').value.trim();
  const identity = document.getElementById('number').value.trim();
  const whatsapp = document.getElementById('phone').value.trim();
  const comment = document.getElementById('message').value.trim();

  const baseURL = "https://wa.me/6282241627789";
  const text = `Nickname: ${encodeURIComponent(nickname)} | Identity: ${encodeURIComponent(identity)} | WhatsApp: ${encodeURIComponent(whatsapp)}%0AComment: ${encodeURIComponent(comment)}%0A%0A_submitted from orbits-1317.github.io_`;
  const targetLink = `${baseURL}?text=${text}`;

  window.dialog.close();
  showMessage('success');

  setTimeout(() => {
    window.location.href = targetLink;
  }, 100);
}
