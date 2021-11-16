const charactersAPI = new APIHandler('https://minions-api.herokuapp.com/')
const characterContainer = document.querySelector('.characters-container')
const updateBtn = document.getElementById('send-data')
const createBtn = document.getElementById('create-send-data')

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
          characterContainer = text
          document.querySelector('.operation input').value = ''
        })
        .catch((err) => console.log('ERROR', err))
    })

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

  document
    .getElementById('edit-character-form')
    .addEventListener('submit', function (event) {
      event.preventDefault()

      const inputs = document.querySelectorAll('#edit-character-form input')
      const editForm = document.querySelector('#edit-character-form')

      const character = {
        id: inputs[0].value,
        name: inputs[1].value,
        occupation: inputs[2].value,
        weapon: inputs[3].value,
        cartoon: inputs[4].checked,
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

  document
    .getElementById('new-character-form')
    .addEventListener('submit', function (event) {
      event.preventDefault()

      const inputs = document.querySelectorAll('#new-character-form input')
      const newForm = document.querySelector('#new-character-form')

      const character = {
        name: inputs[0].value,
        occupation: inputs[1].value,
        weapon: inputs[2].value,
        cartoon: inputs[3].checked,
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
