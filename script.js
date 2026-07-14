/* ===================================================
   Jake & Case Footballs
   Main Website JavaScript
=================================================== */


/* ===================================================
   FOOTBALL ASSISTANT
   (No API - Prewritten Responses)
=================================================== */


function askAssistant() {

    const input = document.getElementById("question");
    const chat = document.getElementById("chatWindow");

    const question = input.value.toLowerCase().trim();


    if(question === "") {
        return;
    }


    // User message

    chat.innerHTML += `
        <div class="user-message">
            ${input.value}
        </div>
    `;


    let answer =
    "I'm not sure about that yet. Please contact Jake & Case for more information.";


    if(question.includes("price") ||
       question.includes("cost") ||
       question.includes("money")) {

        answer =
        "Pricing depends on the football's condition. Contact us for a quote!";
    }


    else if(question.includes("pay") ||
            question.includes("payment") ||
            question.includes("cash")) {

        answer =
        "Currently we accept cash when your football is received.";
    }


    else if(question.includes("delivery") ||
            question.includes("pickup") ||
            question.includes("drop")) {

        answer =
        "We offer school meetings, pickup, and delivery options.";
    }


    else if(question.includes("time") ||
            question.includes("long")) {

        answer =
        "Most footballs are completed within a few days depending on demand.";
    }


    else if(question.includes("clean")) {

        answer =
        "We clean footballs, remove dirt and stains, and restore their appearance.";
    }


    else if(question.includes("grip")) {

        answer =
        "Grip restoration improves the feel and condition of your football.";
    }


    else if(question.includes("brand") ||
            question.includes("wilson") ||
            question.includes("nike")) {

        answer =
        "We accept most football brands including Wilson, Nike, Rawlings, and Under Armour.";
    }


    else if(question.includes("hello") ||
            question.includes("hi")) {

        answer =
        "Hello! How can I help with your football today?";
    }


    setTimeout(function(){

        chat.innerHTML += `
            <div class="bot-message">
                ${answer}
            </div>
        `;

        chat.scrollTop = chat.scrollHeight;

    },500);


    input.value="";

}



/* ===================================================
   MOBILE MENU
=================================================== */


const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");


if(menuButton){

    menuButton.addEventListener("click", function(){

        navLinks.classList.toggle("active");

    });

}



/* ===================================================
   NAVBAR SCROLL EFFECT
=================================================== */


window.addEventListener("scroll", function(){

    const header = document.querySelector("header");


    if(window.scrollY > 50){

        header.classList.add("scrolled");

    }

    else {

        header.classList.remove("scrolled");

    }

});



/* ===================================================
   SCROLL REVEAL ANIMATIONS
=================================================== */


const revealElements =
document.querySelectorAll(
".service-card, .stat-card, .gallery-card, .review-card, .feature, .faq-item"
);



function reveal(){

    revealElements.forEach(function(element){

        const position =
        element.getBoundingClientRect().top;


        const screenHeight =
        window.innerHeight;


        if(position < screenHeight - 100){

            element.classList.add("active");

        }

    });

}


window.addEventListener(
"scroll",
reveal
);


reveal();



/* ===================================================
   ORDER FORM SUBMISSION
=================================================== */

const orderForm = document.getElementById("orderForm");


if (orderForm) {

    orderForm.addEventListener("submit", async function(event) {

        event.preventDefault();


        const orderData = {

            name:
            document.getElementById("name").value,

            email:
            document.getElementById("email").value,

            phone:
            document.getElementById("phone").value,

            brand:
            document.getElementById("brand").value,

            size:
            document.getElementById("size").value,

            condition:
            document.getElementById("condition").value,

            delivery:
            document.getElementById("delivery").value,

            location:
            document.getElementById("location").value,

            date:
            document.getElementById("date").value,

            time:
            document.getElementById("time").value,

            notes:
            document.getElementById("notes").value

        };


        try {


           const response = await fetch("https://jake-case-footballs-api.onrender.com/", {

                method:"POST",

                headers: {

                    "Content-Type":"application/json"

                },

                body: JSON.stringify(orderData)

            });



            const result = await response.json();



            if(result.success) {


                alert(
                    "Your football reconditioning request has been sent!"
                );


                orderForm.reset();


            }

            else {


                alert(
                    "Something went wrong. Please try again."
                );


            }


        }


        catch(error) {


            console.error(error);


            alert(
                "Unable to send order. Please contact Jake & Case directly."
            );


        }


    });

}



/* ===================================================
   BEFORE / AFTER SLIDER
=================================================== */

const comparisonSliders = 
document.querySelectorAll(".slider-control");


comparisonSliders.forEach(function(slider) {

    slider.addEventListener("input", function() {

        const beforeImage =
        slider.parentElement.querySelector(".before-image");


        beforeImage.style.width =
        slider.value + "%";

    });

});
