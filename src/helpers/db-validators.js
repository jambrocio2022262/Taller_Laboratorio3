import User from '../users/user.model.js'
import Company from '../company/company.model.js'

export const existenteEmail = async (correo = '') => {
    const existeEmail = await User.findOne({correo});
    if (existeEmail){
        throw new Error(`El email ${correo} ya fue registrado`);
    }
}

export const existeUsuarioById = async (id = '') => {
    const existeUsuario = await User.findById(id);
    if (!existeUsuario){
        throw new Error(`El ID: ${correo} No existe`);
    }
}

export const existeEmpresaById = async (id = '') =>{
    const existeEmpresa = await Company.findById(id);
    if(!existeEmpresa){
        throw new Error(`El ID: ${correo} No existe`);
    }
}

export const validarAños = async (años = "") => {
    if(años < 0){
        throw new Error('Years cannot be less than 0');
    }

    if(años == 0){
        throw new Error('Cannot be equal to 0');
    }
}