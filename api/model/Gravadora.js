module.exports = class Gravadora {
  #idGravadora
  #nomeGravadora
  #localizacao

  constructor() {
    console.log('👌 Gravadora.constructor()')
  }

  get idGravadora() {
    return this.#idGravadora
  }

  set idGravadora(value) {
    const parsed = Number(value)

    if (!Number.isInteger(parsed)) {
      throw new Error('idGravadora deve ser um número inteiro.')
    }

    if (parsed <= 0) {
      throw new Error('idGravadora deve ser maior que zero.')
    }

    this.#idGravadora = parsed
  }

  get nomeGravadora() {
    return this.#nomeGravadora
  }

  set nomeGravadora(value) {
    if (typeof value !== 'string') {
      throw new Error('nomeGravadora deve ser uma string.')
    }

    const nome = value.trim()

    if (nome.length < 3) {
      throw new Error('nomeGravadora deve ter pelo menos 3 caracteres.')
    }

    if (nome.length > 64) {
      throw new Error('nomeGravadora deve ter no máximo 64 caracteres.')
    }

    this.#nomeGravadora = nome
  }

  get localizacao() {
    return this.#localizacao
  }

  set localizacao(value) {
    if (typeof value !== 'string') {
      throw new Error('localizacao deve ser uma string.')
    }

    const loc = value.trim()

    if (loc.length < 3) {
      throw new Error('localizacao deve ter pelo menos 3 caracteres.')
    }

    if (loc.length > 64) {
      throw new Error('localizacao deve ter no máximo 64 caracteres.')
    }

    this.#localizacao = loc
  }
}
