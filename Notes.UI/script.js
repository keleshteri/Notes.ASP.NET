const apiUrl = 'https://localhost:7135/api/';
const saveButton = document.querySelector('#btnSave');
const deleteButton = document.querySelector('#btnDelete');
const titleInput = document.querySelector('#title');
const descriptionInput = document.querySelector('#description');
const notesContainer = document.querySelector('#notes_container');

//clear form fields
function clearForm() {
  titleInput.value = '';
  descriptionInput.value = '';
  deleteButton.classList.add('hidden');
}
function displayNoteInForm(note) {
  titleInput.value = note.title;
  descriptionInput.value = note.description;
  deleteButton.classList.remove('hidden');
  deleteButton.setAttribute('data-id', note.id);
  saveButton.setAttribute('data-id', note.id);
}

function getNoteById(id) {
  fetch(`${apiUrl}notes/${id}`)
    .then((response) => response.json())
    .then((response) => {
      displayNoteInForm(response);
    });
}
//for edit note
function populateForm(id) {
  getNoteById(id);
}
// Display all notes
function displayNotes(notes) {
  let allNotes = '';
  notes.forEach((note) => {
    const noteElement = `
        <div class="note" data-id="${note.id}" >
            <h3>${note.title}</h3>
            <p>${note.description}</p>
        </div>
        `;
    allNotes += noteElement;
  });
  notesContainer.innerHTML = allNotes;
  // add event listeners
  document.querySelectorAll('.note').forEach((note) => {
    note.addEventListener('click', () => {
      populateForm(note.dataset.id);
    });
  });
}

//call api to addNote
function addNote(title, description) {
  const body = {
    title: title,
    description: description,
    isVisible: true,
  };
  fetch(apiUrl + 'notes', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((data) => data.json())
    .then((response) => {
      clearForm();
      getAllNotes();
    });
}
//get all notes from api
function getAllNotes() {
  fetch(apiUrl + 'notes', {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((data) => data.json())
    .then((response) => displayNotes(response));
}

//call getAllNotes
getAllNotes();

//update note by id
function updateNote(id,title,description) {
    const body = {
        title: title,
        description: description,
        isVisible: true,
      };
  fetch(apiUrl + 'notes/' + id, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
        'content-type': 'application/json',
      },
    })
      .then((data) => data.json())
      .then(response => {
        clearForm();
        getAllNotes();
      } );
}

//saveButton
saveButton.addEventListener('click', function () {
    const id = saveButton.dataset.id;
    if(id){
        updateNote(id,titleInput.value, descriptionInput.value);
    }else{
        addNote(titleInput.value, descriptionInput.value);
    }
   
});

function deleteNote(id) {
  fetch(apiUrl + 'notes/' + id, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
  }).then((response) => {
    console.log(response);
    clearForm();
    getAllNotes();
  });
}

deleteButton.addEventListener('click', function () {
  const id = deleteButton.dataset.id;
  deleteNote(id);
})
