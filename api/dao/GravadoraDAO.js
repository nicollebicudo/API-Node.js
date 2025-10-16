const Gravadora = require('../model/Gravadora')
const MysqlDataBase = require('../database/MysqlDatabase')

module.exports = class GravadoraDAO {
  #database

  constructor(databaseInstance) {
    console.log('⬆️  GravadoraDAO.constructor()')
    this.#database = databaseInstance
  }

  //**********************************CREATE****************************************************************************** */
  create = async (objGravadoraModel) => {
    console.log('🟢 GravadoraDAO.create()')

    let SQL, params

    if (objGravadoraModel.idGravadora && objGravadoraModel.idGravadora > 0) {
      SQL =
        'INSERT INTO gravadora (idGravadora, nomeGravadora, localizacao) VALUES (?, ?, ?);'
      params = [
        objGravadoraModel.idGravadora,
        objGravadoraModel.nomeGravadora,
        objGravadoraModel.localizacao,
      ]
    } else {
      throw new Error('idGravadora inválido (não pode ser 0 ou nulo)')
    }

    const pool = await this.#database.getPool()
    const [resultado] = await pool.execute(SQL, params)

    if (!resultado || resultado.affectedRows === 0) {
      throw new Error('Falha ao inserir gravadora')
    }

    return objGravadoraModel.idGravadora
  }
  //**********************************************DELETE*************************************************************** */

  delete = async (objGravadoraModel) => {
    console.log('🟢 GravadoraDAO.delete()')

    const SQL = 'DELETE FROM gravadora WHERE idGravadora = ?;'
    const params = [objGravadoraModel.idGravadora]

    const pool = await this.#database.getPool()
    const [resultado] = await pool.execute(SQL, params)

    return resultado.affectedRows > 0
  }

  //**************************************************UPDATE********************************************************** */

  update = async (objGravadoraModel) => {
    console.log('🟢 GravadoraDAO.update()')

    const SQL =
      'UPDATE Gravadora SET nomeGravadora = ?, localizacao = ? WHERE idGravadora = ?;'
    const params = [
      objGravadoraModel.nomeGravadora,
      objGravadoraModel.localizacao,
      objGravadoraModel.idGravadora,
    ]
    const pool = await this.#database.getPool()
    const [resultado] = await pool.execute(SQL, params)

    return resultado.affectedRows > 0
  }

  //************************************READ************************************************************************************* */

  findAll = async () => {
    console.log('🟢 GravadoraDAO.findAll()')

    const SQL = 'SELECT * FROM gravadora;'

    const pool = await this.#database.getPool()
    const [resultado] = await pool.execute(SQL)

    return resultado
  }

  findById = async (idGravadora) => {
    console.log('🟢 GravadoraDAO.findById()')

    const resultado = await this.findByField('idGravadora', idGravadora)
    console.log(resultado)
    return resultado[0] || null
  }

  findByField = async (field, value) => {
    console.log(
      `🟢 GravadoraDAO.findByField() - Campo: ${field}, Valor: ${value}`
    )

    const allowedFields = ['idGravadora', 'nomeGravadora']
    if (!allowedFields.includes(field)) {
      throw new Error(`Campo inválido para busca: ${field}`)
    }

    const SQL = `SELECT * FROM gravadora WHERE ${field} = ?;`
    const params = [value]

    const pool = await this.#database.getPool()
    const [resultado] = await pool.execute(SQL, params)

    return resultado || []
  }
}
