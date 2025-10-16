module.exports = class Feat {
  #idFeat
  #nomeFeat
  #cantorFeat
  #streams

  constructor() {
    console.log('👌 Feat.constructor()')
  }

  get idFeat() {
    return this.#idFeat
  }

  set idFeat(value) {
    const parsed = Number(value)

    if (!Number.isInteger(parsed)) {
      throw new Error('idFeat deve ser um número inteiro.')
    }

    if (parsed <= 0) {
      throw new Error('idFeat deve ser maior que zero.')
    }

    this.#idFeat = parsed
  }

  get nomeFeat() {
    return this.#nomeFeat
  }

  set nomeFeat(value) {
    if (typeof value !== 'string') {
      throw new Error('nomeFeat deve ser uma string.')
    }

    const nome = value.trim()

    if (nome.length < 3) {
      throw new Error('nomeFeat deve ter pelo menos 3 caracteres.')
    }

    if (nome.length > 64) {
      throw new Error('nomeFeat deve ter no máximo 64 caracteres.')
    }

    this.#nomeFeat = nome
  }

  get cantorFeat() {
    return this.#cantorFeat
  }

  set cantorFeat(value) {
    if (typeof value !== 'string') {
      throw new Error('cantorFeat deve ser uma string.')
    }

    const loc = value.trim()

    if (loc.length < 3) {
      throw new Error('cantorFeat deve ter pelo menos 3 caracteres.')
    }

    if (loc.length > 64) {
      throw new Error('cantorFeat deve ter no máximo 64 caracteres.')
    }

    this.#cantorFeat = loc
  }

  get streams() {
    return this.#streams
  }

  set streams(value) {
    if (typeof value !== 'string') {
      throw new Error('streams deve ser uma string.')
    }

    const loc = value.trim()

    if (loc.length < 3) {
      throw new Error('streams deve ter pelo menos 3 caracteres.')
    }

    if (loc.length > 64) {
      throw new Error('streams deve ter no máximo 64 caracteres.')
    }

    this.#streams = loc
  }
}
