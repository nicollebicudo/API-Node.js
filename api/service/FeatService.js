const FeatDAO = require('../dao/FeatDAO')
const Feat = require('../model/Feat')
const ErrorResponse = require('../utils/ErrorResponse')

module.exports = class FeatService {
  #featDAO

  constructor(featDAODependency) {
    console.log('⬆️  FeatService.constructor()')
    this.#featDAO = featDAODependency
  }

  //**************************************CREATE**************************************************************** */

  createFeat = async (featJson) => {
    console.log('🟣 FeatService.createFeat()')

    if (!featJson) {
      throw new Error('Erro: featJson está undefined')
    }

    if (!featJson.idFeat) {
      throw new Error(
        'É necessário informar um idFeat para criar uma nova feat.'
      )
    }

    const feat = new Feat()

    feat.idFeat = featJson.idFeat
    feat.nomeFeat = featJson.nomeFeat
    feat.cantorFeat = featJson.cantorFeat
    feat.streams = featJson.streams

    const resultado = await this.#featDAO.findByField('nomeFeat', feat.nomeFeat)

    if (resultado.length > 0) {
      throw new ErrorResponse(400, 'Feat já existe', {
        message: `O feat ${feat.nomeFeat} já existe`,
      })
    }

    return this.#featDAO.create(feat)
  }

  //*********************************************READ************************************************************* */

  findAll = async () => {
    console.log('🟣 FeatService.findAll()')
    return this.#featDAO.findAll()
  }

  findById = async (idFeat) => {
    console.log('🟣 FeatService.findById()')
    const feat = new Feat()

    feat.idFeat = idFeat

    return this.#featDAO.findById(feat.idFeat)
  }

  //****************************************UPDATE****************************************************************** */

  updateFeat = async (idFeat, nomeFeat, cantorFeat, streams) => {
    console.log('🟣 FeatService.updateFeat()')

    const feat = new Feat()

    feat.idFeat = idFeat
    feat.nomeFeat = nomeFeat
    feat.cantorFeat = cantorFeat
    feat.streams = streams

    return this.#featDAO.update(feat)
  }

  //********************************************************DELETE***************************************** */

  deleteFeat = async (idFeat) => {
    console.log('🟣 FeatService.deleteFeat()')
    console.log('ID enviado para o Service:', idFeat)
    const feat = new Feat()
    feat.idFeat = idFeat

    return this.#featDAO.delete(feat)
  }
}
