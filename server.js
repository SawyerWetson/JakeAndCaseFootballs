/* ===================================================
   Jake & Case Footballs Backend Server
=================================================== */
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: "https://jakeandcasefootballs.onrender.com",
    methods: ["POST", "GET", "OPTIONS"],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

// Middleware to block search engine indexing
app.use((req, res, next) => {
  res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive');
  next();
});

// ================================================
// ORDER SUBMISSION
// ================================================
app.post("/api/orders", async (req,res)=>{
    const order = req.body;
    console.log( "New Order:", order );
    
    try {
        console.log("Creating transporter...");
        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE || "outlook365",
            auth:{
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        
        console.log("Transporter created, sending email...");
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: "🏈 New Football Reconditioning Order",
            text: `
                NEW ORDER RECEIVED
                Name: ${order.name}
                Email: ${order.email}
                Phone: ${order.phone}
                Football Brand: ${order.brand}
                Size: ${order.size}
                Condition: ${order.condition}
                Delivery: ${order.delivery}
                Location: ${order.location}
                Date: ${order.date}
                Time: ${order.time}
                Notes: ${order.notes}
                Payment: Cash
            `
        });
        
        console.log("Email sent successfully!");
        res.json({ success:true, message: "Order submitted successfully" });
    } catch(error){
        console.error("Error:", error.message);
        res.status(500).json({ success:false, message: "Server error", error: error.message });
    }
});

// ================================================
// SERVER START
// ================================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log( `Jake & Case Footballs running on port ${PORT}` );
});
