const Feat = require('../service/FeatService')

module.exports = class FeatControl {
  #featService

  constructor(featServiceDependency) {
    console.log('⬆️  FeatControl.constructor()')
    this.#featService = featServiceDependency
  }

  store = async (request, response, next) => {
    console.log('🔵 FeatControle.store()')
    try {
      console.log('Body recebido no Controller:', request.body)
      const featBodyRequest = request.body.FeatFamoso
      console.log('Objeto que será enviado ao Service:', featBodyRequest)

      const novoId = await this.#featService.createFeat(featBodyRequest)

      const objResposta = {
        success: true,
        message: 'Cadastro realizado com sucesso',
        data: {
          feats: [
            {
              idFeat: novoId,
              nomeFeat: featBodyRequest.nomeFeat,
              cantorFeat: featBodyRequest.cantorFeat,
              streams: featBodyRequest.streams,
            },
          ],
        },
      }
      if (novoId) {
        response.status(201).send(objResposta)
      } else {
        throw new Error('Falha ao cadastrar novo Feat')
      }
    } catch (error) {
      next(error)
    }
  }

  index = async (request, response, next) => {
    console.log('🔵 FeatControle.index()')
    try {
      const arrayFeats = await this.#featService.findAll()

      response.status(200).send({
        success: true,
        message: 'Busca realizada com sucesso',
        data: {
          feats: arrayFeats,
        },
      })
    } catch (error) {
      next(error)
    }
  }

  show = async (request, response, next) => {
    console.log('🔵 FeatControle.show()')
    try {
      const featId = request.params.idFeat
      const feat = await this.#featService.findById(featId)

      const objResposta = {
        success: true,
        message: 'Executado com sucesso',
        data: {
          feats: feat,
        },
      }

      response.status(200).send(objResposta)
    } catch (error) {
      next(error)
    }
  }

  update = async (request, response, next) => {
    console.log('🔵 FeatControle.update()')
    try {
      const featId = request.params.idFeat
      const nomeFeat = request.body.FeatFamoso.nomeFeat
      const cantorFeat = request.body.FeatFamoso.cantorFeat
      const streams = request.body.FeatFamoso.streams
      const atualizou = await this.#featService.updateFeat(
        featId,
        nomeFeat,
        cantorFeat,
        streams
      )

      if (atualizou) {
        return response.status(200).send({
          success: true,
          message: 'Atualizado com sucesso',
          data: {
            feats: [
              {
                idFeat: featId,
                nomeFeat: nomeFeat,
                cantorFeat: cantorFeat,
                streams: streams,
              },
            ],
          },
        })
      } else {
        return response.status(404).send({
          success: false,
          message: 'Feat não encontrado para atualização',
        })
      }
    } catch (error) {
      next(error)
    }
  }

  destroy = async (request, response, next) => {
    console.log('🔵 FeatControle.destroy()')
    try {
      const featId = request.params.idFeat
      console.log('ID recebido na URL:', featId)
      const excluiu = await this.#featService.deleteFeat(featId)

      if (excluiu) {
        return response.status(204).send({
          success: true,
          message: 'Excluido com sucesso com sucesso',
          data: {
            feats: [
              {
                idFeat: featId,
              },
            ],
          },
        })
      } else {
        return response.status(404).send({
          success: false,
          message: 'Feat não encontrado para exclusão',
        })
      }
    } catch (error) {
      next(error)
    }
  }
}
