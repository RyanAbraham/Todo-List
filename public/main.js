// Handles all requests sent by the server
var priority = document.getElementById("change-priority");
var complete = document.getElementById("complete-todo");

// On click, change a todo to critical priority
priority.addEventListener('click', () => {
  fetch('todos', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      "category": "CRITICAL",
      "todo": "Pay rent"
    })
  })
    .then(res => res.json())
    .catch(err => console.log(err));
});

// Add a listener to each button
// TODO: change hardcoded for loop to looping through each todo
for(var i=0; i<4; i++) {
  // On click, finish and delete the todo
  let button = document.getElementById("complete-todo" + i);
  if(button != null) {
    button.addEventListener('click', () => {
      fetch('todos', {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          "oid": button.getAttribute("oid")
        })
      })
      .then(res => {
        if(res.ok) {
          return res;
        } else {
          throw Error(res.statusText);
        }
      })
      .then(data => {
        console.log(data);
      });
    });
  }
}
