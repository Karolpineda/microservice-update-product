const Product = require("../models/productModel");

// Función para actualizar un producto
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;  // Obtener el id del producto desde la URL
    const { name, stock, updatedBy } = req.body;  // Obtener los datos a actualizar desde el cuerpo de la solicitud

    // Verificar que los campos obligatorios estén presentes
    if (!name || !updatedBy) {
      return res.status(400).json({
        message: "Faltan campos obligatorios (name, updatedBy)."
      });
    }

    // Buscar el producto en la base de datos
    const product = await Product.findByPk(id);

    // Si no se encuentra el producto, devolver un error
    if (!product) {
      return res.status(404).json({
        message: "Producto no encontrado."
      });
    }

    // Actualizar el producto con los nuevos datos
    product.name = name;
    product.stock = stock || product.stock;  // Solo actualizar el stock si se proporciona
    product.updatedBy = updatedBy;

    // Guardar el producto actualizado en la base de datos
    await product.save();

    return res.status(200).json({
      message: "Producto actualizado exitosamente.",
      product
    });
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    return res.status(500).json({
      message: "Error interno del servidor."
    });
  }
};

module.exports = { updateProduct };
