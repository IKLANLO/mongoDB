const Product = require("../models/Product");
const ProductController ={

  async create(req,res){
    try {
      const product = await Product.create(req.body)
      res.status(201).send(product)
    } catch (error) {
      console.error(error)
      res.status(500).send({ message: 'Ha habido un problema al crear el producto' })
    }
  },

  async getAll(req, res) {
    try {
      const product = await Product.find()
      res.status(200).send(product)   
    } catch (error) {
      res.status(500).send(error)
    }
  },

  async getById(req, res) {
    try {
      const product = await Product.findById(req.params._id)
      res.status(200).send(product)
    } catch (error) {
      res.status(500).send(error)
    }
  },

  async getProductsByName(req, res) {
    try {
      if (req.params.name > 20){
        return res.status(500).send('Búsqueda demasiado larga')
      }
      const name = RegExp(req.params.name, "i")
      // añadimos el index creado en el modelo, así las búsquedas las hace para cada palabra indicada en el endpoint
      const product = await Product.find({
        $text:{
          $search: name
        }
      })
      res.status(200).send({message: 'product deleted'})
    } catch (error) {
      res.status(500).send(error)
    }
  },

  async delete(req, res) {
    try {
      const product = await Product.findByIdAndDelete(req.params._id)
      res.status(200).send(product)
    } catch (error) {
      res.status(500).send({message: 'there was a problem trying to remove the publication'})
    }
  },

  async update(req, res) {
    try {
      const product = await Product.findByIdAndUpdate(req.params._id, req.body, {new: true})
      res.status(200).send({message: 'product updated', product})
    } catch (error) {
      res.status(500).send(error)
    }
  }
}

module.exports = ProductController;