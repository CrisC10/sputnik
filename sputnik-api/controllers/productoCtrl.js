'use strict'

const Producto = require('../models/producto')

function getProducto(req,res){
    let productoId = req.params.productoId
    
    Producto.findByImagen(productoId, (err,producto)=>{
        if(err) return res.status(500).send({mensaje: `Error al realizar la peticion : ${err}`})
        if(!producto) return res.status(404).status({mensaje: `El producto no existe`})
        res.status(200).send({producto})
    })
}

function getProductos(req,res){

    Producto.find({},(err, productos)=>{
        if(err) return res.status(500).send({mensaje: `Error al realizar la peticion: ${err}`})
        if(!productos) return res.status(404).send({mensaje: `No existen productos`})
        res.status(200).send({productos})
    })

}

function saveProducto(req,res){
    console.log(`POST /api/producto `)
    console.log(req.body)

    let producto = new Producto()
    producto.nombre = req.body.nombre
    producto.imagen = req.body.imagen
    producto.precio = req.body.precio
    producto.categoria = req.body.categoria
    producto.descripcion = req.body.descripcion

    producto.save((err,productoStored)=>{
        if(err) res.status(500).send({mensaje: `Error al salvar en la base de datos : ${err}`})
        res.status(200).send({producto: productoStored})
    })

}

function updateProducto(req,res){
    let productoId = req.params.productoId
    let update = req.body

    Producto.findByIdAndUpdate(productoId, update,(err,productoActualizado)=>{
        if(err) return res.status(500).send({mensaje: `Error al modificar el Producto : ${err}`})
        if(!productoActualizado) return res.status(404).status({mensaje: `El producto no existe`})
        
        res.status(200).send({producto: update})
        
    })

}

function deleteProducto(req,res){
    let productoId = req.params.productoId

    Producto.findById(productoId, (err,producto)=>{
        if(err) return res.status(500).send({mensaje: `Error al borrar el Producto : ${err}`})
        if(!producto) return res.status(404).status({mensaje: `El producto no existe`})
        producto.remove(err=>{
            if(err) res.status(500).send({mensaje: `Error al borrar el producto: ${err}`})
            res.status(200).send({mensaje: `El producto ha sido eliminado`})
        })
        
    })

}

module.exports = {
    getProducto,
    getProductos,
    saveProducto,
    updateProducto,
    deleteProducto
}