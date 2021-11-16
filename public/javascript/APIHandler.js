class APIHandler {
  constructor(baseUrl) {
    this.BASE_URL = baseUrl
    this.axiosApp = axios.create({ baseURL: this.BASE_URL })
  }

  getFullList = () => this.axiosApp.get('/characters')

  getOneRegister = (id) => this.axiosApp.get(`/characters/${id}`)

  createOneRegister = (character) =>
    this.axiosApp.post('/characters', character)

  updateOneRegister = (character) =>
    this.axiosApp.put(`/characters/${character.id}`, character)

  deleteOneRegister = (id) => this.axiosApp.delete(`/characters/${id}`)
}
