const Gravadora = require('./Gravadora')
const Feat = require('./Feat')

module.exports = class Cantor {
  #idCantor
  #Gravadora
  #Feat
  #nomeCantor
  #nacionalidade
  #idade
  #sexo

  get idCantor() {
    return this.#idCantor
  }

  set idCantor(valor) {
    const parsed = Number(valor)

    if (!Number.isInteger(parsed)) {
      throw new Error('idCantor deve ser um número inteiro.')
    }

    if (parsed <= 0) {
      throw new Error('idCantor deve ser um número inteiro positivo.')
    }

    this.#idCantor = parsed
  }

  get Gravadora() {
    return this.#Gravadora
  }

  set Gravadora(value) {
    if (!(value instanceof Gravadora)) {
      throw new Error('Gravadora deve ser uma instância válida de Gravadora.')
    }

    this.#Gravadora = value
  }

  get Feat() {
    return this.#Feat
  }

  set Feat(value) {
    if (!(value instanceof Feat)) {
      throw new Error('Feat deve ser uma instância válida de Feat.')
    }

    this.#Feat = value
  }

  get nomeCantor() {
    return this.#nomeCantor
  }

  set nomeCantor(value) {
    if (typeof value !== 'string') {
      throw new Error('nomeCantor deve ser uma string.')
    }

    const nome = value.trim()

    if (nome.length < 3) {
      throw new Error('nomeCantor deve ter pelo menos 3 caracteres.')
    }
    this.#nomeCantor = nome
  }

  get nacionalidade() {
    return this.#nacionalidade
  }

  set nacionalidade(value) {
    if (typeof value !== 'string') {
      throw new Error('nacionalidade deve ser uma string.')
    }

    const nacionalidadeTrimmed = value.trim()

    if (nacionalidadeTrimmed === '') {
      throw new Error('nacionalidade não pode ser vazio.')
    }

    this.#nacionalidade = nacionalidadeTrimmed
  }

  get idade() {
    return this.#idade
  }

  set idade(value) {
    const parsed = Number(value)

    if (!Number.isInteger(parsed)) {
      throw new Error('idade deve ser um número inteiro.')
    }

    if (parsed <= 0) {
      throw new Error('idade deve ser maior que zero.')
    }

    this.#idade = parsed
  }
  get sexo() {
    return this.#sexo
  }

  set sexo(value) {
    if (typeof value !== 'string') {
      throw new Error('sexo deve ser uma string.')
    }

    const nome = value.trim()

    if (nome.length < 3) {
      throw new Error('sexo deve ter pelo menos 3 caracteres.')
    }

    if (nome.length > 64) {
      throw new Error('sexo deve ter no máximo 64 caracteres.')
    }

    this.#sexo = nome
  }
}
