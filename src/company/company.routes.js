import { Router } from "express";
import { check } from "express-validator";

import{
    companyGet,
    companyGetAZ,
    companyGetZA,
    companyPost,
    companyPut
} from "./company.controller.js";

import{
    existeEmpresaById,
    validarAños
} from "../helpers/db-validators.js";

import {validarCampos} from "../middlewares/validar-campos.js";
import {validarJWT} from "../middlewares/validar-jwt.js";

const router = Router();

router.get("/", companyGet)

router.post(
    "/",
    [
        check("nombre", "The name is obligatory").not().isEmpty(),
        check("telefono", "The CellPhone is obligatory").not().isEmpty(),
        check("nivelInpacto", "The level the impact is obligatory").not().isEmpty(),
        check("añosTrayectoria", "The year of the trayectory is obligatory").not().isEmpty(),
        check("añosTrayectoria","The year of the trayectory is obligatory").custom(validarAños),
        check("categoria","The categorie is obligatory").not().isEmpty(),
        validarCampos,
    ],companyPost)

router.put(
    "/:id",
    [
        check("id", "The id is not valid").isMongoId(),
        check("id").custom(existeEmpresaById),
        validarCampos,
    ], companyPut);

router.get("/companys", companyGetAZ);

router.get("/companyss", companyGetZA);


export default router;