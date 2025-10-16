import { Router } from "express";
import { getAllProductos, getProductoById, pizzaController, deleteBici, creaFav, getAllFav, deleteFav } from "../controllers/pizza.controller.js";

const router = Router();

router.get("/", getAllProductos); 
router.get("/favs/:id_usuario", getAllFav); 
router.get("/:id", getProductoById); 
router.post("/register", pizzaController.register); 
router.post("/favs", creaFav);
router.delete("/favs/:id_producto/:id_usuario", deleteFav);
router.delete("/:id", deleteBici);

export default router;