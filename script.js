// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSAfY22YP965ukHqIOGuafl-0TAWTZnws",
  authDomain: "codemaster-arc.firebaseapp.com",
  databaseURL: "https://codemaster-arc-default-rtdb.firebaseio.com",
  projectId: "codemaster-arc",
  storageBucket: "codemaster-arc.appspot.com",
  messagingSenderId: "540576153306",
  appId: "1:540576153306:web:158fbe92cfd44ae72befe3",
  measurementId: "G-BBFNZTZQ2L"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// initialize database
const db = firebase.database();

// get user's data
const username = prompt("Enter your name:");

// submit form
// listen for submit event on the form and call the postChat function
document.getElementById("message-form").addEventListener("submit", sendMessage);

// send message to db
function sendMessage(e) {
  e.preventDefault();

  // get values to be submitted
  const timestamp = Date.now();
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value;

  // clear the input box
  messageInput.value = "";

  //auto scroll to bottom
  document
    .getElementById("messages")
    .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

  // create db collection and send in the data
  db.ref("messages/" + timestamp).set({
    username,
    message,
  });
}

// display the messages
// reference the collection created earlier
const fetchChat = db.ref("messages/");

// check for new messages using the onChildAdded event listener
fetchChat.on("child_added", function (snapshot) {
  const messages = snapshot.val();
  const message = `<li class=${
    username === messages.username ? "sent" : "receive"
  }><span>${messages.username}: </span>${messages.message}</li>`;
  // append the message on the page
  document.getElementById("messages").innerHTML += message;
});

