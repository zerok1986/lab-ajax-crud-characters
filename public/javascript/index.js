const charactersAPI = new APIHandler('https://minions-api.herokuapp.com/')
const characterContainer = document.querySelector('.characters-container')
const updateBtn = document.getElementById('send-data')
const createBtn = document.getElementById('create-send-data')
const editInputs = document.querySelectorAll('#edit-character-form input')
const editForm = document.querySelector('#edit-character-form')
const newInputs = document.querySelectorAll('#new-character-form input')
const newForm = document.querySelector('#new-character-form')

// Get All Characters
window.addEventListener('load', () => {
  document
    .getElementById('fetch-all')
    .addEventListener('click', function (event) {
      charactersAPI
        .getFullList()
        .then((characters) => {
          let charList = ''

          characters.data.reverse().forEach((char) => {
            charList += `<div class="character-info">
                     <div class="name">Id: ${char.id}</div>
                     <div class="name">Name: ${char.name}</div>
                     <div class="occupation"> Occupation: ${char.occupation}</div>
                     <div class="cartoon">Is a Cartoon?: ${char.cartoon}</div>
                     <div class="weapon">Weapon: ${char.weapon}</div>
                   </div>`
          })
          characterContainer.innerHTML = charList
        })
        .catch((err) => console.error(err))
    })

  // Get One Character
  document
    .getElementById('fetch-one')
    .addEventListener('click', function (event) {
      let charId = document.querySelector('.operation input').value

      charactersAPI
        .getOneRegister(charId)
        .then((charInfo) => {
          const character = charInfo.data
          text = `<div class="character-info">
                  <div class="name">Id: ${character.id}</div>
                  <div class="name">Name: ${character.name}</div>
                  <div class="occupation"> Occupation: ${character.occupation}</div>
                  <div class="cartoon">Is a Cartoon?: ${character.cartoon}</div>
                  <div class="weapon">Weapon: ${character.weapon}</div>
                </div>`
          characterContainer.innerHTML = text
          document.querySelector('.operation input').value = ''
        })
        .catch((err) => console.log('ERROR', err))
    })

  // Delete Character by Id
  document
    .getElementById('delete-one')
    .addEventListener('click', function (event) {
      const charId = document.querySelector('.delete input').value

      charactersAPI
        .deleteOneRegister(charId)
        .then((character) => {
          document.getElementById('delete-one').style.backgroundColor =
            !character.data ? 'red' : 'green'

          document.querySelector('.delete input').value = ''
        })
        .catch((err) => {
          console.error(err)
          document.getElementById('delete-one').style.backgroundColor = 'red'
        })
    })

  // Edit One Character by Id
  document
    .getElementById('edit-character-form')
    .addEventListener('submit', function (event) {
      event.preventDefault()

      const character = {
        id: editInputs[0].value,
        name: editInputs[1].value,
        occupation: editInputs[2].value,
        weapon: editInputs[3].value,
        cartoon: editInputs[4].checked,
      }

      charactersAPI
        .updateOneRegister(character)
        .then(() => {
          editForm.reset()
          updateBtn.style.backgroundColor = 'green'
        })
        .catch((err) => {
          console.error(err)
          updateBtn.style.backgroundColor = 'red'
        })
    })

  // Create a New Character
  document
    .getElementById('new-character-form')
    .addEventListener('submit', function (event) {
      event.preventDefault()

      const character = {
        name: newInputs[0].value,
        occupation: newInputs[1].value,
        weapon: newInputs[2].value,
        cartoon: newInputs[3].checked,
      }

      charactersAPI
        .createOneRegister(character)
        .then((newChar) => {
          createBtn.style.backgroundColor = 'green'
          newForm.reset()
        })
        .catch((err) => {
          console.error(err)
          createBtn.style.backgroundColor = 'red'
        })
    })
})
