import { Router } from "express";
import { check } from "express-validator";

import { login } from "./auth.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router()

router.post(
    '/login',
    [
        check('correo', 'Invalid email ').isEmail(),
        check('password', 'Password required').not().isEmpty(),
        validarCampos,
    ], login)

export default router