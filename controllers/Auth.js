const Auth = require('../modules/Auth.js')
const bcyrpt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { model } = require('mongoose');

const register = async (req, res) => {

    try {
        const { username, email, password } = req.body
        
        const user = await Auth.findOne({ email })
        if (user) {
            return res.status(409).json({

                "error": "Conflict",
                "message": `The mail address already exist. Mail : ${email}`

            })
        }
        const passwordHash = await bcyrpt.hash(password, 12)
        const newUser = await Auth.create({ username, email, password: passwordHash })
        const userToken = jwt.sign({
            id: newUser.id
        },
            process.env.SECRET_TOKEN,
            { expiresIn: "1h" })
     return res.status(200).json({
        status:"OK",
        "user":newUser,
        "token":userToken

     })
    } catch (error) {
        return res.status(500).json({

            "error": "Internal Server Error",
            "message": "Failed to access the database. Please try again later.",
            "detail": error.message

        })
    }

}
const login = async (req, res) => {

    try {
        const { email, password } = req.body
        const user = await Auth.findOne({ email })
        if (!user) {
            return res.status(404).json({

                "error": "Not Found",
                "message": `The mail address not found. Mail : ${email}`
            })
        }
        const comparePassword = bcyrpt.compare(password, user.password)
        if (!comparePassword) {
            return res.status(401).json({

                "error": "Unauthorized",
                "message": `The password is not correct.`
            })
        }
        const userToken=jwt.sign({id:user.id},process.env.SECRET_TOKEN,{expiresIn:'1h'});
        
        return res.status(200).json({

            status:"OK",
            user:user,
            token:userToken

        })

    } catch (error) {

    }

}
module.exports={register,login}