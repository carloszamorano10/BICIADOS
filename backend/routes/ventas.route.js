import { Router } from "express";
import { VentasController } from "../controllers/ventas.controller.js";

const router = Router();


router.post("/register", VentasController.register);
router.get("/", VentasController.readVentas);


export default router;