const Product = require("../models/productModel");

const updateProduct = async (req, res) => {
  try {
    // Extraemos el ID del producto y los campos a actualizar del body
    const { id } = req.params;
    const { name, stock, updatedBy } = req.body;

    // Validamos que el ID y el usuario que actualiza estén presentes
    if (!id || !updatedBy) {
      return res.status(400).json({
        message: "Faltan campos obligatorios (id, updatedBy)."
      });
    }

    // Buscar y actualizar el producto
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, stock, updatedBy, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    // Si el producto no se encuentra
    if (!updatedProduct) {
      return res.status(404).json({
        message: "Producto no encontrado."
      });
    }

    return res.status(200).json({
      message: "Producto actualizado exitosamente.",
      product: updatedProduct
    });
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    return res.status(500).json({
      message: "Error interno del servidor."
    });
  }
};

module.exports = { updateProduct };
