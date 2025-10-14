import { Router } from "express";
import { getAllProductos, getProductoById, pizzaController, deleteBici } from "../controllers/pizza.controller.js";

const router = Router();

router.get("/", getAllProductos); 
router.get("/:id", getProductoById); 
router.post("/register", pizzaController.register); 
router.delete("/:id", deleteBici);




export default router;