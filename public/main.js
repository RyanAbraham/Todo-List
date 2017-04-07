var priority = document.getElementById("change-priority");
var complete = document.getElementById("complete-todo");

// On click, change a todo to critical priority
priority.addEventListener('click', () => {
  console.log("click!");
  fetch('todos', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'category': 'CRITICAL',
      'todo': 'Pay rent'
    });
  });
  .then(res => {
    if(res.ok) return res.json();
  });
  .then(data => {
    console.log(data);
    window.location.reload(data);
  }
});

// On click, delete the latest critical todo
complete.addEventListener('click', () => {
  fetch('todos', {
    method: 'delete',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'category': 'CRITICAL'
    });
  });
  .then(res => {
    if(res.ok) return res.json();
  });
  then(data => {
    console.log(data);
    window.location.reload();
  });
});
