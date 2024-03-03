import { response, request } from "express";
import Company from './company.model.js';
import excelJS from 'exceljs';

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

export const exportExcelCompany = async (req, res) =>{
    try{
        let book = new excelJS.Workbook();

        const sheet = book.addWorksheet("books");
        sheet.columns = [
            {header: "Unique Code", key:"_id", width: 25},
            {header: "Name", key:"nombre", width: 25},
            {header: "Phone", key:"telefono", width: 25},
            {header: "Impact Level", key:"nivelInpacto", width: 25},
            {header: "Years of trajectory", key:"añosTrayectoria", width: 25},
            {header: "Category", key:"categoria", width: 25}
        ]
        const companys = await Company.find({});

        companys.forEach(company =>{
            sheet.addRow(company.toObject());
        })
        
        const buffer = await book.xlsx.writeBuffer();

        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", "attatchment: filename=excelCompany.xlsx");
        res.status(200).send(buffer);
    }catch(error){
        console.log(error),
        res.status(400).json({
            msg: "Error downloading excel"
        })
    }
}