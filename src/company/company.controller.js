import { response, request } from "express";
import Company from './company.model.js';

export const companyGet = async (req = request, res = response) =>{
    const {limite, desde} = req.query;
    const query = {estado: true};

    const [total, company] = await Promise.all([
        Company.countDocuments(query),
        Company.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        company
    })
}

export const companyPost = async (req, res) =>{

    const {nombre, telefono, nivelInpacto, añosTrayectoria, categoria} = req.body;
    const company = new Company({nombre, telefono, nivelInpacto, añosTrayectoria, categoria});

    await company.save();

    res.status(200).json({
        company
    });
}

export const companyPut = async (req, res = response) =>{
    const { id } = req.params;
    const{_id, ...resto} = req.body;

    await Company.findByIdAndUpdate(id, resto);

    const company = await Company.findOne({_id: id});

    res.status(200).json({
        msg: "Company Update",
        company
    })
}

export const companyGetAZ = async (req = request, res = response) =>{
    const {limite, desde} = req.query;
    const query = {estado: true};

   try{
         const [total, company] = await Promise.all([
            Company.countDocuments(query),
            Company.find(query)
            .sort({nombre: 1})
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

             res.status(200).json({
            total,
            company
    })
   }catch(e){
    console.log(console.e);
    res.status(500).json({
        msg: 'Error to company'
    });
   }
};

export const companyGetZA = async (req = request, res = response) =>{
    const {limite, desde} = req.query;
    const query = {estado: true};

   try{
         const [total, company] = await Promise.all([
            Company.countDocuments(query),
            Company.find(query)
            .sort({nombre: -1})
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

             res.status(200).json({
            total,
            company
    })
   }catch(e){
    console.log(console.e);
    res.status(500).json({
        msg: 'Error to company'
    });
   }
};