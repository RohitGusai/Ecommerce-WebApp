const express = require("express");
const router = express.Router();
const { getProducts, getProductsId, deleteProducts, updateProducts, addProducts } = require("./../handlers/product-handler");

// Get all products
router.get("/", async (req, res) => {
    try {
        let products = await getProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: "Error fetching products", details: error.message });
    }
});

// Get product by ID
router.get("/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let product = await getProductsId(id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: "Error fetching product", details: error.message });
    }
});

// Add a new product
router.post("/", async (req, res) => {
    try {
        let model = req.body;
        let product = await addProducts(model);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: "Error adding product", details: error.message });
    }
});

// Update a product by ID
router.put("/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let model = req.body;
        let updatedProduct = await updateProducts(id, model);
        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: "Error updating product", details: error.message });
    }
});

// Delete a product by ID
router.delete("/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let deletedProduct = await deleteProducts(id);
        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting product", details: error.message });
    }
});



module.exports = router;