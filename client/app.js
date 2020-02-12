//ref to login form
const loginForm = document.getElementById('welcome-form');

//ref to messages section
const messagesSection = document.getElementById('messages-section');

//ref to messages list
const messagesList = document.getElementById('messages-list');

//ref to add message form
const addMessageForm = document.getElementById('add-messages-form');

//ref to user name input
const userNameInput = document.getElementById('username');

//ref to message input
const messageContentInput = document.getElementById('message-content');

//global variable - user login
let userName = '';

function login() {
  if (userNameInput.value.length === '') {
    window.alert('Enter your nickname');
  } else {
    userName = userNameInput;
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
  }
}

function sendMessage() {
  if (messageContentInput.value.length === '') {
    window.alert('Enter your message');
  } else {
    addMessage(userName, messageContentInput.value);
    messageContentInput.value = '';
  }
}

function addMessage(author, content) {
  const message = document.createElement('li');
  message.classList.add('message', 'message--received');
  if (author === userName) message.classList.add('message--self');
  message.innerHTML = `
    <h3 class="message__author">${userName === author ? 'You' : author}</h3>
    <div class="message__content">
      ${content}
    </div>
  `;
  messagesList.appendChild(message);
}

loginForm.addEventListener('submit', function(event) {
  event.preventDefault();
  login();
});

addMessageForm.addEventListener('submit', function(event) {
  event.preventDefault();
  sendMessage();
});
