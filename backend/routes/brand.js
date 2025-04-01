const express = require("express"); 
const router = express.Router();
const { getBrands, updateBrands, deleteBrands, getBrandsById, addBrands } = require("./../handlers/brand-handler");

router.get("", async function (req, res) {
    try {
        let brands = await getBrands();
        res.send(brands);
    } catch (error) {
        console.error("Error fetching brands:", error);
        res.status(500).json({ error: "Failed to fetch brands" });
    }
});

router.post("", async function (req, res) {
    try {
        let model = req.body;
        let brand = await addBrands(model);
        res.status(201).json(brand);
    } catch (error) {
        console.error("Error adding brand:", error);
        res.status(500).json({ error: "Failed to add brand" });
    }
});

router.get("/:id", async function (req, res) {
    try {
        let id = req.params["id"];
        let brand = await getBrandsById(id);

        if (!brand) {
            return res.status(404).json({ error: "Brand not found" });
        }

        res.json(brand);
    } catch (error) {
        console.error(`Error fetching brand with ID ${req.params["id"]}:`, error);
        res.status(500).json({ error: "Failed to fetch brand" });
    }
});

router.put("/:id", async function (req, res) {
    try {
        let id = req.params["id"];
        let model = req.body;
        let updatedBrand = await updateBrands(id, model);

        if (!updatedBrand) {
            return res.status(404).json({ error: "Brand not found or not updated" });
        }

        res.json(updatedBrand);
    } catch (error) {
        console.error(`Error updating brand with ID ${req.params["id"]}:`, error);
        res.status(500).json({ error: "Failed to update brand" });
    }
});

router.delete("/:id", async function (req, res) {
    try {
        let id = req.params["id"];
        let deletedBrand = await deleteBrands(id);

        if (!deletedBrand) {
            return res.status(404).json({ error: "Brand not found or already deleted" });
        }

        res.json({ message: "Brand deleted successfully", deletedBrand });
    } catch (error) {
        console.error(`Error deleting brand with ID ${req.params["id"]}:`, error);
        res.status(500).json({ error: "Failed to delete brand" });
    }
});

module.exports = router;
