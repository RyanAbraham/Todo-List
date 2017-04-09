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

// On click, delete the latest critical todo
complete.addEventListener('click', () => {
  fetch('todos', {
    method: 'delete',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      "category": "CRITICAL"
    })
  })
    .then(res => {
      if(res.ok) {
        return res;
      } else {
        throw Error(resp.statusText);
      }
    })
    .then(data => {
      console.log(data);
    });
});
