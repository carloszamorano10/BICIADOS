import { Router } from "express";
import { getAllProductos, getProductoById, pizzaController } from "../controllers/pizza.controller.js";

const router = Router();

router.get("/", getAllProductos); 
router.get("/:id", getProductoById); 
router.post("/register", pizzaController.register); 




export default router;