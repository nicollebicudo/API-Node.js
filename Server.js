const express = require('express')
const MysqlDataBase = require('./api/database/MysqlDatabase')
const GravadoraDAO = require('./api/dao/GravadoraDAO')
const GravadoraService = require('./api/service/GravadoraService')
const GravadoraControle = require('./api/controller/GravadoraController')
const GravadoraRoteador = require('./api/router/GravadoraRoteador')

const FeatDAO = require('./api/dao/FeatDAO')
const FeatService = require('./api/service/FeatService')
const FeatControle = require('./api/controller/FeatController')
const FeatRoteador = require('./api/router/FeatRoteador')

const CantorDAO = require('./api/dao/CantorDAO')
const CantorService = require('./api/service/CantorService')
const CantorControle = require('./api/controller/CantorController')
const CantorRouter = require('./api/router/CantorRouter')

module.exports = class Server {
  #porta
  #router
  #app
  #database
  #gravadoraControl
  #gravadoraService
  #gravadoraDAO
  #gravadoraRoteador

  #featControl
  #featService
  #featDAO
  #featRoteador

  #cantorControl
  #cantorService
  #cantorDAO
  #cantorRoteador

  constructor(porta) {
    console.log('⬆️ GravadoraControl.constructor()')
    this.#porta = porta ?? 8080
  }

  init = async () => {
    console.log('⬆️  Server.init()')
    this.#app = express()

    this.#app.use(express.json())
    this.#app.use(express.static('static'))

    this.#database = new MysqlDataBase({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'aula_api_2024',
      port: 3306,
      waitForConnections: true,
      connectionLimit: 50,
      queueLimit: 10,
    })

    this.#database.connect()

    this.setupGravadora()
    this.setupFeat()
    this.setupCantor()
  }

  setupGravadora = () => {
    console.log('⬆️  Server.setupGravadora()')

    this.#router = express.Router()

    this.#gravadoraDAO = new GravadoraDAO(this.#database)
    this.#gravadoraService = new GravadoraService(this.#gravadoraDAO)
    this.#gravadoraControl = new GravadoraControle(this.#gravadoraService)

    const fakeMiddleware = {
      validateToken: (req, res, next) => next(),
      validateBody: (req, res, next) => next(),
      validateIdParam: (req, res, next) => next(),
    }

    this.#gravadoraRoteador = new GravadoraRoteador(
      this.#router,
      fakeMiddleware, // fake jwtMiddleware
      fakeMiddleware, // fake gravadoraMiddleware
      this.#gravadoraControl
    )

    this.#app.use('/api/v1/gravadoras', this.#gravadoraRoteador.createRoutes())
  }

  setupFeat = () => {
    console.log('⬆️  Server.setupFeat()')

    this.#router = express.Router()

    this.#featDAO = new FeatDAO(this.#database)
    this.#featService = new FeatService(this.#featDAO)
    this.#featControl = new FeatControle(this.#featService)

    const fakeMiddleware = {
      validateToken: (req, res, next) => next(),
      validateBody: (req, res, next) => next(),
      validateIdParam: (req, res, next) => next(),
    }

    this.#featRoteador = new FeatRoteador(
      this.#router,
      fakeMiddleware, // fake jwtMiddleware
      fakeMiddleware, // fake featMiddleware
      this.#featControl
    )

    this.#app.use('/api/v1/feats', this.#featRoteador.createRoutes())
  }

  setupCantor = () => {
    console.log('⬆️  Server.setupCantor()')

    this.#router = express.Router()

    this.#cantorDAO = new CantorDAO(this.#database)
    if (!this.#gravadoraDAO) {
      this.#gravadoraDAO = new GravadoraDAO(this.#database)
    }
    if (!this.#featDAO) {
      this.#featDAO = new FeatDAO(this.#database)
    }

    this.#cantorService = new CantorService(
      this.#cantorDAO,
      this.#gravadoraDAO,
      this.#featDAO
    )
    this.#cantorControl = new CantorControle(this.#cantorService)

    const fakeMiddleware = {
      validateToken: (req, res, next) => next(),
      validateBody: (req, res, next) => next(),
      validateIdParam: (req, res, next) => next(),
    }

    this.#cantorRoteador = new CantorRouter(
      this.#router,
      fakeMiddleware, // fake jwtMiddleware
      fakeMiddleware, // fake gravadoraMiddleware
      this.#cantorControl
    )

    this.#app.use('/api/v1/cantores', this.#cantorRoteador.createRoutes())
  }

  run = () => {
    this.#app.listen(this.#porta, () => {
      console.log(
        `🚀 Server rodando em http://localhost:${this.#porta}/Login.html`
      )
    })
  }
}
