const Cantor = require('../model/Cantor')
const Gravadora = require('../model/Gravadora')
const Feat = require('../model/Feat')
const MysqlDatabase = require('../database/MysqlDatabase')

module.exports = class CantorDAO {
  #database

  constructor(databaseInstance) {
    console.log('⬆️  CantorDAO.constructor()')
    this.#database = databaseInstance
  }

  //***************************************************CREATE*************************************************************** */

  create = async (objCantorModel) => {
    console.log('🟢 CantorDAO.create()')

    const SQL = `
            INSERT INTO Cantor 
            (idCantor, nomeCantor, nacionalidade, idade, sexo, Gravadora_idGravadora, FeatFamoso_idFeat) 
            VALUES (?, ?, ?, ?, ?, ?, ?);`
    const params = [
      objCantorModel.idCantor,
      objCantorModel.nomeCantor,
      objCantorModel.nacionalidade,
      objCantorModel.idade,
      objCantorModel.sexo,
      objCantorModel.Gravadora.idGravadora,
      objCantorModel.Feat.idFeat,
    ]

    const pool = await this.#database.getPool()
    const [resultado] = await pool.execute(SQL, params)

    if (resultado.affectedRows === 0) {
      throw new Error('Falha ao inserir cantor')
    }

    return resultado.insertId
  }

  //**************************************************DELETE************************************* */

  delete = async (objCantorModel) => {
    console.log('🟢 CantorDAO.delete()')

    const SQL = 'DELETE FROM Cantor WHERE idCantor = ?;'
    const params = [objCantorModel.idCantor]

    const pool = await this.#database.getPool()
    const [resultado] = await pool.execute(SQL, params)

    return resultado.affectedRows > 0
  }

  //******************************************************UPDATE******************************************************* */

  update = async (objCantorModel) => {
    console.log('🟢 CantorDAO.update()')

    let SQL
    let params

    SQL = `
                UPDATE Cantor 
                SET nomeCantor=?, nacionalidade=?, idade=?, sexo=?, Gravadora_idGravadora=?, FeatFamoso_idFeat=? 
                WHERE idCantor=?;`
    params = [
      objCantorModel.nomeCantor,
      objCantorModel.nacionalidade,
      objCantorModel.idade,
      objCantorModel.sexo,
      objCantorModel.Gravadora.idGravadora,
      objCantorModel.Feat.idFeat,
      objCantorModel.idCantor,
    ]

    const pool = await this.#database.getPool()
    const [resultado] = await pool.execute(SQL, params)

    return resultado.affectedRows > 0
  }

  findAll = async () => {
    console.log('🟢 CantorDAO.findAll()')

    const SQL = `
            SELECT idCantor, nomeCantor, nacionalidade, idade, sexo, idGravadora, nomeGravadora, idFeat, nomeFeat 
            FROM Cantor
            JOIN Gravadora ON Cantor.Gravadora_idGravadora = idGravadora
            JOIN FeatFamoso ON Cantor.FeatFamoso_idFeat = idFeat;`

    const pool = await this.#database.getPool()
    const [matrizDados] = await pool.execute(SQL)

    return matrizDados.map((row) => ({
      idCantor: row.idCantor,
      nomeCantor: row.nomeCantor,
      nacionalidade: row.nacionalidade,
      idade: row.idade,
      sexo: row.sexo,
      Gravadora: {
        idGravadora: row.idGravadora,
        nomeGravadora: row.nomeGravadora,
      },
      FeatFamoso: {
        idFeat: row.idFeat,
        nomeFeat: row.nomeFeat,
      },
    }))
  }

  findById = async (idCantor) => {
    console.log('🟢 CantorDAO.findById()')

    const resultado = await this.findByField('idCantor', idCantor)
    return resultado[0] || null
  }

  findByField = async (field, value) => {
    console.log(`🟢 CantorDAO.findByField() - Campo: ${field}, Valor: ${value}`)

    const allowedFields = [
      'idCantor',
      'nomeCantor',
      'nacionalidade',
      'idade',
      'sexo',
      'Gravadora_idGravadora',
      'FeatFamoso_idFeat',
    ]
    if (!allowedFields.includes(field)) {
      throw new Error('Campo inválido para busca')
    }

    const SQL = `SELECT * FROM Cantor WHERE ${field} = ?;`
    const params = [value]

    const pool = await this.#database.getPool()
    const [rows] = await pool.execute(SQL, params)

    return rows || []
  }
}
