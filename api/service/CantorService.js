const GravadoraDAO = require('../dao/GravadoraDAO')
const FeatDAO = require('../dao/FeatDAO')
const CantorDAO = require('../dao/CantorDAO')
const Gravadora = require('../model/Gravadora')
const Feat = require('../model/Feat')
const Cantor = require('../model/Cantor')
const ErrorResponse = require('../utils/ErrorResponse')

module.exports = class CantorService {
  #cantorDAO
  #gravadoraDAO
  #featDAO

  constructor(cantorDAODependency, gravadoraDAODependency, featDAODependency) {
    console.log('⬆️  CantorService.constructor()')
    this.#cantorDAO = cantorDAODependency
    this.#gravadoraDAO = gravadoraDAODependency
    this.#featDAO = featDAODependency
  }

  //****************************************************CREATE************************************************************ */

  createCantor = async (jsonCantor) => {
    console.log('🟣 CantorService.createCantor()')

    const objetoGravadora = new Gravadora()
    const objetoFeat = new Feat()
    objetoGravadora.idGravadora = jsonCantor.Gravadora_idGravadora
    objetoFeat.idFeat = jsonCantor.FeatFamoso_idFeat

    const objCantor = new Cantor()

    objCantor.idCantor = jsonCantor.idCantor
    objCantor.nomeCantor = jsonCantor.nomeCantor
    objCantor.nacionalidade = jsonCantor.nacionalidade
    objCantor.idade = jsonCantor.idade
    objCantor.sexo = jsonCantor.sexo
    objCantor.Gravadora = objetoGravadora
    objCantor.Feat = objetoFeat

    const gravadoraExiste = this.#gravadoraDAO.findByField(
      'idGravadora',
      objCantor.Gravadora.idGravadora
    )
    if (gravadoraExiste.length == 0) {
      throw new ErrorResponse(400, 'A Gravadora informada não existe')
    }

    const featExiste = this.#featDAO.findByField(
      'idFeat',
      objCantor.Feat.idFeat
    )
    if (featExiste.length == 0) {
      throw new ErrorResponse(400, 'O Feat informado não existe')
    }

    await this.#cantorDAO.create(objCantor)

    return objCantor.idCantor
  }

  //*********************************FIND********************************************************* */

  findAll = async () => {
    console.log('🟣 CantorService.findAll()')
    return this.#cantorDAO.findAll()
  }

  findById = async (idCantor) => {
    const objCantor = new Cantor()
    objCantor.idCantor = idCantor

    const cantor = await this.#cantorDAO.findById(objCantor.idCantor)

    if (!cantor) {
      throw new ErrorResponse(404, 'Cantor não encontrado', {
        message: `Não existe cantor com id ${idCantor}`,
      })
    }

    return cantor
  }

  //******************************************************UPDATE************************************************************************ */

  updateCantor = async (idCantor, requestBody) => {
    console.log('🟣 CantorService.updateCantor()')
    const jsonCantor = requestBody

    const objGravadora = new Gravadora()
    const objFeat = new Feat()
    objGravadora.idGravadora = jsonCantor.Gravadora_idGravadora
    objFeat.idFeat = jsonCantor.FeatFamoso_idFeat

    const objCantor = new Cantor()

    objCantor.idCantor = idCantor
    objCantor.nomeCantor = jsonCantor.nomeCantor
    objCantor.nacionalidade = jsonCantor.nacionalidade
    objCantor.idade = jsonCantor.idade
    objCantor.sexo = jsonCantor.sexo
    objCantor.Gravadora = objGravadora
    objCantor.Feat = objFeat

    return await this.#cantorDAO.update(objCantor)
  }

  //**************************************************DELETE***************************************************************** */

  deleteCantor = async (idCantor) => {
    const cantor = new Cantor()
    cantor.idCantor = idCantor
    return await this.#cantorDAO.delete(cantor)
  }
}
