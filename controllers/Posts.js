const Data = require('../modules/Data.js')
const { model } = require('mongoose');
const createData = async (req, res) => {
    try {

        const count = await Data.countDocuments();
        const newData = await Data.create({
            RecordId: count + 1,
          ...req.body
        });      
        return res.status(200).json({
            newData
        })
    } catch (error) {
        return res.status(500).json({

            "error": "Internal Server Error",
            "message": "Failed to access the database. Please try again later.",
            "detail": error.message

        })
    }
}
const viewData = async (req, res) => {
    try {
        const { Id } = req.query;      
        const data = Id ? await Data.findOne({Id}): await Data.find();
        if(data==null)
        {return res.status(404).json({
            status:"NotFound",
            "message":`ID not found in the db. ID:${Id}`
        })}
        return res.status(200).json({
            data
        })
    


    } catch (error) {
        return res.status(500).json({

            "error": "Internal Server Error",
            "message": "Failed to access the database. Please try again later.",
            "detail": error.message

        })
    }
}
const updateData = async (req, res) => {
    try {
        const { RecordId } = req.query;  
        let dataOndb=await Data.findOne({RecordId})
        if(dataOndb==null)
        {return res.status(404).json({
            status:"NotFound",
            "message":`ID not found in the db. ID:${RecordId}`
        })}
        else{
           
            if(req.body==null){
                return res.status(400).json({
                    status:"BadRequest",
                    "message":"response body is null"
                })

            }
            else{
                const updatedData = await Data.findOneAndUpdate({RecordId:RecordId}, req.body, { new: true });
                return res.status(200).json({
                    updatedData
                })
            }
        }

    } catch (error) {
        return res.status(500).json({

            "error": "Internal Server Error",
            "message": "Failed to access the database. Please try again later.",
            "detail": error.message

        })
    }
}
const deleteData = async (req, res) => {
    try {
        const { RecordId } = req.query;          
        if(RecordId==null){
            return res.status(400).json({
                status:"BadRequest",
                "message":"response body hasn't RecordId paramater"
            })
        }
        let dataOndb=await Data.findOneAndDelete({RecordId})
         if (dataOndb==null){
            return res.status(404).json({
                status:"NotFound",
                "message":`ID not found in the db. ID:${RecordId}`
            })}
        else{
            return res.status(200).json({
                status:"OK",
                "message":"DELETED!",
                dataOndb
            })
        }


    } catch (error) {
        return res.status(500).json({

            "error": "Internal Server Error",
            "message": "Failed to access the database. Please try again later.",
            "detail": error.message

        })
    }
}
module.exports={createData,viewData,updateData,deleteData}