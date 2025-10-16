const GravadoraDAO = require('../dao/GravadoraDAO')
const Gravadora = require('../model/Gravadora')
const ErrorResponse = require('../utils/ErrorResponse')

module.exports = class GravadoraService {
  #gravadoraDAO

  constructor(gravadoraDAODependency) {
    console.log('⬆️  GravadoraService.constructor()')
    this.#gravadoraDAO = gravadoraDAODependency
  }

  //**************************************CREATE**************************************************************** */

  createGravadora = async (gravadoraJson) => {
    console.log('🟣 GravadoraService.createGravadora()')

    if (!gravadoraJson.idGravadora) {
      throw new Error(
        'É necessário informar um idGravadora para criar uma nova gravadora.'
      )
    }

    const gravadora = new Gravadora()

    gravadora.idGravadora = gravadoraJson.idGravadora
    gravadora.nomeGravadora = gravadoraJson.nomeGravadora
    gravadora.localizacao = gravadoraJson.localizacao

    const resultado = await this.#gravadoraDAO.findByField(
      'nomeGravadora',
      gravadora.nomeGravadora
    )

    if (resultado.length > 0) {
      throw new ErrorResponse(400, 'Gravadora já existe', {
        message: `O gravadora ${gravadora.nomeGravadora} já existe`,
      })
    }

    return this.#gravadoraDAO.create(gravadora)
  }

  //*********************************************READ************************************************************* */

  findAll = async () => {
    console.log('🟣 GravadoraService.findAll()')
    return this.#gravadoraDAO.findAll()
  }

  findById = async (idGravadora) => {
    console.log('🟣 GravadoraService.findById()')
    const gravadora = new Gravadora()

    gravadora.idGravadora = idGravadora

    return this.#gravadoraDAO.findById(gravadora.idGravadora)
  }

  //****************************************UPDATE****************************************************************** */

  updateGravadora = async (idGravadora, nomeGravadora, localizacao) => {
    console.log('🟣 GravadoraService.updateGravadora()')

    const gravadora = new Gravadora()

    gravadora.idGravadora = idGravadora
    gravadora.nomeGravadora = nomeGravadora
    gravadora.localizacao = localizacao

    return this.#gravadoraDAO.update(gravadora)
  }

  //********************************************************DELETE***************************************** */

  deleteGravadora = async (idGravadora) => {
    console.log('🟣 GravadoraService.deleteGravadora()')

    const gravadora = new Gravadora()
    gravadora.idGravadora = idGravadora

    return this.#gravadoraDAO.delete(gravadora)
  }
}
