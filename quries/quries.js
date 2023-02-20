const {req, res} = require('express')
const {Model} = require('sequelize')

const Pool = require('pg').Pool
const data = new Pool({
  user: 'super1',
  host: 'localhost',
  database: 'vikram',
  password:'super1',
  port: 5432,
})

const all = (req, res) => {
    data.query('SELECT * FROM data', (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
  }
const applyid = (req, res) => {
    id = parseInt(req.params.id)
    console.log(id);
    data.query('SELECT * FROM data WHERE id = $1',[id], (error, results) => {
        if(error){
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const post = (req, res) => {
    const {id,name,gender,email} = req.body
    console.log(id);
    data.query('INSERT INTO data(id,name,gender,email) VALUES($1,$2,$3,$4)RETURNING * ',[id,name,gender,email], (error, results) => {
        if(error){
            throw error
        }
        res.send(`id:${results.rows[0].id}`)
    })
}

const update = (req, res) => {
    const id = parseInt(req.params.id)
    const { name,gender, email } = req.body
  
    data.query(
      'UPDATE data SET name = $1,gender=$2,email=$3 WHERE ID=$4',
      [name,gender, email, id],
      (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).send(`User  : ${results.rows[0].id}}`)
      }
    )
  }


const earase = (req,res)=> {
    const id = parseInt(req.params.id)
  
    data.query('DELETE FROM data WHERE ID = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`User ID : ${id}`)
    })
  }
module.exports = {
    all,
    applyid,
    post,
    update,
    earase,
}