const GravadoraService = require('../service/GravadoraService')

module.exports = class GravadoraControl {
  #gravadoraService

  constructor(gravadoraServiceDependency) {
    console.log('⬆️  GravadoraControl.constructor()')
    this.#gravadoraService = gravadoraServiceDependency
  }

  store = async (request, response, next) => {
    console.log('🔵 GravadoraControle.store()')
    try {
      const gravadoraBodyRequest = request.body.Gravadora

      const novoId = await this.#gravadoraService.createGravadora(
        gravadoraBodyRequest
      )

      const objResposta = {
        success: true,
        message: 'Cadastro realizado com sucesso',
        data: {
          gravadoras: [
            {
              idGravadora: novoId,
              nomeGravadora: gravadoraBodyRequest.nomeGravadora,
              localizacao: gravadoraBodyRequest.localizacao,
            },
          ],
        },
      }
      if (novoId) {
        response.status(201).send(objResposta)
      } else {
        throw new Error('Falha ao cadastrar novo Gravadora')
      }
    } catch (error) {
      next(error)
    }
  }

  index = async (request, response, next) => {
    console.log('🔵 GravadoraControle.index()')
    try {
      const arrayGravadoras = await this.#gravadoraService.findAll()

      response.status(200).send({
        success: true,
        message: 'Busca realizada com sucesso',
        data: {
          gravadoras: arrayGravadoras,
        },
      })
    } catch (error) {
      next(error)
    }
  }

  show = async (request, response, next) => {
    console.log('🔵 GravadoraControle.show()')
    try {
      const gravadoraId = request.params.idGravadora
      const gravadora = await this.#gravadoraService.findById(gravadoraId)

      const objResposta = {
        success: true,
        message: 'Executado com sucesso',
        data: {
          gravadoras: gravadora,
        },
      }

      response.status(200).send(objResposta)
    } catch (error) {
      next(error)
    }
  }

  update = async (request, response, next) => {
    console.log('🔵 GravadoraControle.update()')
    try {
      const gravadoraId = request.params.idGravadora
      const nomeGravadora = request.body.Gravadora.nomeGravadora
      const localizacao = request.body.Gravadora.localizacao
      const atualizou = await this.#gravadoraService.updateGravadora(
        gravadoraId,
        nomeGravadora,
        localizacao
      )

      if (atualizou) {
        return response.status(200).send({
          success: true,
          message: 'Atualizado com sucesso',
          data: {
            gravadoras: [
              {
                idGravadora: gravadoraId,
                nomeGravadora: nomeGravadora,
                localizacao: localizacao,
              },
            ],
          },
        })
      } else {
        return response.status(404).send({
          success: false,
          message: 'Gravadora não encontrado para atualização',
          data: {
            gravadoras: [
              {
                idGravadora: gravadoraId,
                nomeGravadora: nomeGravadora,
                localizacao: localizacao,
              },
            ],
          },
        })
      }
    } catch (error) {
      next(error)
    }
  }

  destroy = async (request, response, next) => {
    console.log('🔵 GravadoraControle.destroy()')
    try {
      const gravadoraId = request.params.idGravadora
      const excluiu = await this.#gravadoraService.deleteGravadora(gravadoraId)

      if (excluiu) {
        return response.status(204).send({
          success: true,
          message: 'Excluido com sucesso com sucesso',
          data: {
            gravadoras: [
              {
                idGravadora: gravadoraId,
              },
            ],
          },
        })
      } else {
        return response.status(404).send({
          success: false,
          message: 'Gravadora não encontrado para exclusão',
          data: {
            gravadoras: [
              {
                idGravadora: gravadoraId,
              },
            ],
          },
        })
      }
    } catch (error) {
      next(error)
    }
  }
}
