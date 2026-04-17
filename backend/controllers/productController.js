const db = require ('../models');
const Product = db.Product || db.Product;

//eror 500
exports.getAll = async (req, res ) => {
    try  {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//CREATE
exports.create = async (req,res) => {
    try{
        const product = await Product.create(req.body);
    res.json(product);
    } catch (error) {
        res.status(500).json({error : error.message});
    }
};


//DELETE
exports.delete = async (req, res) => {
  try {
    await Product.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


