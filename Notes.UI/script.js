const apiUrl = 'https://localhost:7135/api/';
const saveButton = document.querySelector('#btnSave');
const titleInput = document.querySelector('#title');
const descriptionInput = document.querySelector('#description');
const notesContainer = document.querySelector('#notes_container');

//clear form fields
function clearForm() {
    titleInput.value='';
    descriptionInput.value='';

}
// Display all notes
function displayNotes(notes) {
    let allNotes = '';
  notes.forEach((note) => {
    const noteElement = `
        <div class="note">
            <h3>${note.title}</h3>
            <p>${note.description}</p>
        </div>
        `;
    allNotes += noteElement;
    
  });
  notesContainer.innerHTML = allNotes;
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

//saveButton
saveButton.addEventListener('click', function () {
  addNote(titleInput.value, descriptionInput.value);
});
