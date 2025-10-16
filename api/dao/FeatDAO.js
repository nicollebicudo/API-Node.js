const Feat = require('../model/Feat')
const MysqlDataBase = require('../database/MysqlDatabase')

module.exports = class FeatDAO {
  #database

  constructor(databaseInstance) {
    console.log('⬆️  FeatDAO.constructor()')
    this.#database = databaseInstance
  }

  //**********************************CREATE****************************************************************************** */
  create = async (objFeatModel) => {
    console.log('🟢 FeatDAO.create()')

    let SQL, params

    if (objFeatModel.idFeat && objFeatModel.idFeat > 0) {
      SQL =
        'INSERT INTO FeatFamoso (idFeat, nomeFeat, cantorFeat, streams) VALUES (?, ?, ?, ?);'
      params = [
        objFeatModel.idFeat,
        objFeatModel.nomeFeat,
        objFeatModel.cantorFeat,
        objFeatModel.streams,
      ]
    } else {
      throw new Error('idFeat inválido (não pode ser 0 ou nulo)')
    }

    const pool = await this.#database.getPool()
    const [resultado] = await pool.execute(SQL, params)

    if (!resultado || resultado.affectedRows === 0) {
      throw new Error('Falha ao inserir feat')
    }

    return objFeatModel.idFeat
  }
  //**********************************************DELETE*************************************************************** */

  delete = async (objFeatModel) => {
    console.log('🟢 FeatDAO.delete()')
    console.log('ID usado na Query DELETE:', objFeatModel.idFeat)

    const SQL = 'DELETE FROM FeatFamoso WHERE idFeat = ?;'
    const params = [objFeatModel.idFeat]

    const pool = await this.#database.getPool()
    const [resultado] = await pool.execute(SQL, params)
    console.log('Linhas Afetadas:', resultado.affectedRows)

    return resultado.affectedRows > 0
  }

  //**************************************************UPDATE********************************************************** */

  update = async (objFeatModel) => {
    console.log('🟢 FeatDAO.update()')

    const SQL =
      'UPDATE FeatFamoso SET nomeFeat = ?, cantorFeat = ?, streams = ? WHERE idFeat = ?;'
    const params = [
      objFeatModel.nomeFeat,
      objFeatModel.cantorFeat,
      objFeatModel.streams,
      objFeatModel.idFeat,
    ]
    const pool = await this.#database.getPool()
    const [resultado] = await pool.execute(SQL, params)

    return resultado.affectedRows > 0
  }

  //************************************READ************************************************************************************* */

  findAll = async () => {
    console.log('🟢 FeatDAO.findAll()')

    const SQL = 'SELECT * FROM FeatFamoso;'

    const pool = await this.#database.getPool()
    const [resultado] = await pool.execute(SQL)

    return resultado
  }

  findById = async (idFeat) => {
    console.log('🟢 FeatDAO.findById()')

    const resultado = await this.findByField('idFeat', idFeat)
    console.log(resultado)
    return resultado[0] || null
  }

  findByField = async (field, value) => {
    console.log(`🟢 FeatDAO.findByField() - Campo: ${field}, Valor: ${value}`)

    const allowedFields = ['idFeat', 'nomeFeat']
    if (!allowedFields.includes(field)) {
      throw new Error(`Campo inválido para busca: ${field}`)
    }

    const SQL = `SELECT * FROM FeatFamoso WHERE ${field} = ?;`
    const params = [value]

    const pool = await this.#database.getPool()
    const [resultado] = await pool.execute(SQL, params)

    return resultado || []
  }
}
