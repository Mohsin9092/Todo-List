// Select the header (h1) and add mouseover/mouseleave color effects
let header = document.querySelector('h1');
header.addEventListener('mouseover', () => header.style.color = 'hotpink');
header.addEventListener('mouseleave', () => header.style.color = 'yellow');

// Sample tasks array with id, title, and status
let tasks = [
    { id: 1, title: 'Studying Javascript', completed: 'done' },
    { id: 2, title: 'Studying Html', completed: 'notdone' },
];

// Get reference to the last button and style it
let lastbtn = document.querySelector('#lastbtn');
lastbtn.classList.add('input', 'but');
let labels = document.querySelectorAll('label')
let inputs = document.querySelectorAll('input');
// Function to add a new task
function add() {
    let value1 = document.querySelector('#input1'); // task id field (not used much)
    let value2 = document.querySelector('#input2').value; // task title
    let value3 = document.querySelector('#input3').value.trim().toLowerCase(); // task status (done/notdone)

    let search = tasks.find(task => task.title === value2); // check for duplicate
    let onlyLetters = /^[a-zA-Z\s]+$/; // regex to validate text input

    if (search) {
        alert('Task already exists');
    } else if (value2 === "" || value3 === '') {
        alert('Please Add Task Title and Status');
    } else if (!onlyLetters.test(value2) || !onlyLetters.test(value3)) {
        alert("Please enter only letters in both fields!");
    } else if (value3 !== 'done' && value3 !== 'notdone') {
        alert("Status must be either 'done' or 'notdone'.");
        return;
    } else {
        // Add new task to array
        tasks.push({ id: tasks.length + 1, title: value2, completed: value3 });
        alert('Task added Successfully');
        value1.value = tasks.length; // update id field
    }
}

// Function to switch view to task adding mode
function addtask() {
    let secondpara = document.querySelector('#secondpara');
    secondpara.style.display = "none"; // hide welcome paragraph

    let showtask = document.querySelector('#showtask');
    showtask.style.display = "none"; // hide show task box

    // Display labels and inputs
    lastbtn.style.display = 'block';

    labels.forEach(label => {
        label.style.display = 'block';
    });

    inputs.forEach(input => input.style.display = 'block');

    return false;
}

// Function to display tasks and toggle status on click
function showtask() {
    let showtaskbox = document.querySelector('#showtask');
    showtaskbox.innerHTML = ''; // Clear existing list
    showtaskbox.style.display = 'block';
        lastbtn.style.display='none';
        labels.forEach(label => {
            label.style.display='none';
        });
        inputs.forEach(input=>input.style.display='none')
    tasks.forEach((task) => {
        let li = document.createElement('li');
        li.textContent = `${task.id}. ${task.title} - ${task.completed}`;
        li.style.cursor = 'pointer';

        // Style if task is completed
        if (task.completed === 'done') {
            li.style.textDecoration = 'line-through';
            li.style.color = 'gray';
        }

        // Toggle task status on click
        li.addEventListener('click', () => {
            task.completed = task.completed === 'done' ? 'notdone' : 'done';
            showtask(); // Refresh list
        });

        showtaskbox.appendChild(li);
    });

    return false;
}

// Function to remove a task based on ID
function removetask() {
    let id = +prompt('Enter Task Id');

    let found = tasks.find(task => task.id === id);
    if (!found) {
        alert(`Task with ID ${id} not found.`);
        return false;
    }

    tasks = tasks.filter(task => task.id !== id); // Remove task from array
    alert(`Task with ID ${id} removed successfully`);

    showtask(); // Refresh list
    return false;
}
