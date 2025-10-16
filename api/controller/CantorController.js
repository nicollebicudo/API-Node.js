const Cantor = require('../service/CantorService')

module.exports = class CantorControl {
  #CantorService

  constructor(CantorServiceDependency) {
    console.log('⬆️  CantorControl.constructor()')
    this.#CantorService = CantorServiceDependency
  }

  store = async (request, response, next) => {
    console.log('🔵 CantorControle.store()')
    try {
      const CantorBodyRequest = request.body.Cantor

      const novoId = await this.#CantorService.createCantor(CantorBodyRequest)

      const objResposta = {
        success: true,
        message: 'Cadastro realizado com sucesso',
        data: {
          Cantor: [
            {
              idCantor: novoId,
              nomeCantor: CantorBodyRequest.nomeCantor,
            },
          ],
        },
      }

      response.status(201).send(objResposta)
    } catch (error) {
      next(error)
    }
  }

  index = async (request, response, next) => {
    console.log('🔵 CantorControle.index()')
    try {
      const arrayCantors = await this.#CantorService.findAll()

      response.status(200).send({
        success: true,
        message: 'Busca realizada com sucesso',
        data: {
          Cantores: arrayCantors,
        },
      })
    } catch (error) {
      next(error)
    }
  }

  show = async (request, response, next) => {
    console.log('🔵 CantorControle.show()')
    try {
      const CantorId = request.params.idCantor
      const Cantor = await this.#CantorService.findById(CantorId)

      const objResposta = {
        success: true,
        message: 'Executado com sucesso',
        data: {
          Cantor: Cantor,
        },
      }

      response.status(200).send(objResposta)
    } catch (error) {
      next(error)
    }
  }

  update = async (request, response, next) => {
    console.log('🔵 CantorControle.update()')
    try {
      const CantorId = request.params.idCantor

      const CantorBodyRequest = request.body.Cantor

      if (!CantorBodyRequest) {
        throw new Error('Corpo da requisição inválido.')
      }

      const atualizou = await this.#CantorService.updateCantor(
        CantorId,
        CantorBodyRequest
      )

      if (atualizou) {
        return response.status(200).send({
          success: true,
          message: 'Atualizado com sucesso',
          data: {
            Cantors: [
              {
                idCantor: parseInt(request.params.idCantor),
                nomeCantor: request.body.Cantor.nomeCantor,
              },
            ],
          },
        })
      } else {
        return response.status(404).send({
          success: false,
          message: 'Cantor não encontrado para atualização',
        })
      }
    } catch (error) {
      next(error)
    }
  }

  destroy = async (request, response, next) => {
    console.log('🔵 CantorControle.destroy()')
    try {
      const CantorId = request.params.idCantor
      const excluiu = await this.#CantorService.deleteCantor(CantorId)

      if (excluiu) {
        return response.status(204).send({
          success: true,
          message: 'Excluido com sucesso com sucesso',
        })
      } else {
        return response.status(404).send({
          success: false,
          message: 'Cantor não encontrado para exclusão',
        })
      }
    } catch (error) {
      next(error)
    }
  }
}
