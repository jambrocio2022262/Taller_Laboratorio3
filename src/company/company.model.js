import mongoose from "mongoose";

const CompanySchema = mongoose.Schema({
    nombre: {
        type: String,
        require: [true, 'Company name is required']
    },
    telefono: {
        type: String,
        require: [true, 'Company phone number is required']
    },
    nivelInpacto:{ 
        type: String,
        require: [true, 'The companys impact level is mandatory']
    },
    añosTrayectoria: {
        type: String,
        require: [true, 'The years of experience of the company is mandatory']
    },
    categoria:{
        type: String,
        require: [true, 'The category of the company is mandatory']
    },
    estado: {
        type: Boolean,
        default: true,
    }
});

CompanySchema.methods.toJSON = function(){
    const { __v, password, _id, ...company} = this.toObject();
    company.uid = _id;
     return company;
}


export default mongoose.model('Company', CompanySchema);