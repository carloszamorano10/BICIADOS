import { Router } from "express";
import { pizzaController } from "../controllers/pizza.controller.js";

const router = Router();

router.get("/", pizzaController.readPizzas);
router.get("/:id", pizzaController.readPizza);
router.post("/register", pizzaController.register);
router.post("/register", (req, res) => {
  res.json({ ok: true });
});

export default router;
