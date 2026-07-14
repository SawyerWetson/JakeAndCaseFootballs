/*
===================================================
Jake & Case Footballs
Backend Server
===================================================
*/


const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();


const app = express();


// Middleware

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended:true
}));


// Serve website files

app.use(express.static("public"));



// Home page

app.get("/", (req,res)=>{

    res.sendFile(
        __dirname + "/public/index.html"
    );

});




// ================================================
// ORDER SUBMISSION
// ================================================


app.post("/api/orders", async (req,res)=>{


    const order = req.body;


    console.log(
        "New Order:",
        order
    );



    try {


        const transporter =
        nodemailer.createTransport({

            service: process.env.EMAIL_SERVICE || "outlook365",

            auth:{

                user:
                process.env.EMAIL_USER,

                pass:
                process.env.EMAIL_PASSWORD

            }

        });



        await transporter.sendMail({

            from:
            process.env.EMAIL_USER,


            to:
            process.env.EMAIL_USER,


            subject:
            "🏈 New Football Reconditioning Order",


            text:

`
NEW ORDER RECEIVED

Name:
${order.name}

Email:
${order.email}

Phone:
${order.phone}

Football Brand:
${order.brand}

Size:
${order.size}

Condition:
${order.condition}

Delivery:
${order.delivery}

Location:
${order.location}

Date:
${order.date}

Time:
${order.time}

Notes:
${order.notes}

Payment:
Cash
`

        });



        res.json({

            success:true,

            message:
            "Order submitted successfully"

        });



    }


    catch(error){


        console.error(error);


        res.status(500).json({

            success:false,

            message:
            "Server error"

        });


    }


});




// ================================================
// SERVER START
// ================================================


const PORT =
process.env.PORT || 3000;



app.listen(PORT, ()=>{


console.log(

`Jake & Case Footballs running on port ${PORT}`

);


});
