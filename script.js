"use strict"



// LIGHT AND DARK MODE

// grabs the element and toggles between the dark and light modes
// ended up doing it this way because otherwise the selectors I had used
// overrid any attempts at changing the colors
function darkMode() {
    document.getElementById("about").classList.toggle("dark");
    document.getElementById("albums").classList.toggle("dark");
    document.getElementById("guess").classList.toggle("dark");
    document.getElementById("contact").classList.toggle("dark");

    document.getElementById("about").classList.toggle("light");
    document.getElementById("albums").classList.toggle("light");
    document.getElementById("guess").classList.toggle("light");
    document.getElementById("contact").classList.toggle("light");

}


// FORM VALIDATION

// messages object, to be displayed upon submission
let message = {
    success: "The form was submitted successfully. Thank you!",
    failure: "There was an issue when submitting the form, please correct your erroes and try again."
};
// creates an object to store user information
let filledForm = {
    fullName: "",
    prefContact: "",
    inputPhone: "",
    inputEmail: "",
    inputComment: "",
    getInfo: function () {
        return `<strong>Full name:</strong> ${this.fullName}<br>
        <strong>Preferred Contact:</strong> ${this.prefContact}<br>
        <strong>Phone:</strong> ${this.inputPhone}<br>
        <strong>Email:</strong> ${this.inputEmail}<br>
        <strong>Comments:</strong> ${this.inputComment}<br>`;
    }
};

function validateForm(event) {
    // prevents submission during validation
    event.preventDefault()

    // inputs
    let fName = document.getElementById("name");
    let prefEmail = document.getElementById("conEmail");
    let prefPhone = document.getElementById("conPhone");
    let phone = document.getElementById("phone");
    let email = document.getElementById("email");
    let comment = document.getElementById("comments");

    // regex (esnures proper formatting and content)
    // regex for email and phone is pulled from class activity, phone has been modified
    // name checks for two names separated by a space
    let nameRegex = /^[a-zA-Z]*\s[a-zA-Z]*/;
    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/;
    let phoneRegex = /^\d{10}$/;

    // resets border style on inputs
    fName.classList.remove("error");
    email.classList.remove("error");
    phone.classList.remove("error");
    comment.classList.remove("error");

    // resets prefered contact
    phone.classList.remove("required");
    email.classList.remove("required");

    // hides previous error messages
    fName.nextElementSibling.classList.add("hidden");
    email.nextElementSibling.classList.add("hidden");
    phone.nextElementSibling.classList.add("hidden");
    comment.nextElementSibling.classList.add("hidden");

    // tracks if form is valud
    let isValid = true;

    // validation begnis
    // checks which contact method checked
    if (prefEmail.checked) {
        // sets email as required 
        email.classList.add("required");
        // adds info to object
        filledForm.prefContact = "Email";
        // ensures email is an email address (matches pattern)
        if (email.value.trim() === "" || !emailRegex.test(email.value)) {
            // marks form invalid
            isValid = false;
            // adds error class to input
            email.classList.add("error");
            // displays error message to user
            email.nextElementSibling.classList.remove("hidden");

        } else {
            // adds info to object
            filledForm.inputEmail = email.value;
        }
    } else if (prefPhone.checked) {
        // sets phone as requried
        phone.classList.add("required");
        // adds info to object
        filledForm.prefContact = "Phone";
        // ensures phone number is 10 digits
        if (phone.value.trim() === "" || !phoneRegex.test(phone.value)) {
            // marks form invalid
            isValid = false;
            // adds error class to input
            phone.classList.add("error");
            // displays error message to user
            phone.nextElementSibling.classList.remove("hidden");
        } else {
            // adds info to object
            filledForm.inputPhone = phone.value;
        }

    }


    // ensures full name contains at least two characters separated by a space
    if (fName.value.trim() === "" || !nameRegex.test(fName.value)) {
        // marks form invalid
        isValid = false;
        // adds error class to input
        fName.classList.add("error");
        // displays error message to user
        fName.nextElementSibling.classList.remove("hidden");

    } else {
        // adds info to object
        filledForm.fullName = fName.value;
    }




    // checks that comments aren't blank
    if (comment.value.trim() === "") {
        // marks form invalid
        isValid = false;
        // adds error class to input
        comment.classList.add("error");
        // displays error message to user
        comment.nextElementSibling.classList.remove("hidden");
    } else {
        // adds info to object
        filledForm.inputComment = comment.value;
    }

    if (isValid) {
        // calls function to show info before form
        displayInfo();

        // reset values
        fName.value = "";
        email.value = "";
        phone.value = "";
        comment.value = "";
        prefEmail.checked = false;
        prefPhone.checked = true;
        phone.classList.remove("required");
        email.classList.remove("required");

        // hides previous error messages
        fName.nextElementSibling.classList.add("hidden");
        email.nextElementSibling.classList.add("hidden");
        phone.nextElementSibling.classList.add("hidden");
        comment.nextElementSibling.classList.add("hidden");

        // gives an alert telling it worked
        window.alert(message["success"]);
    } else {
        window.alert(message["failure"]);
    }
}

function displayInfo() {
    // container to display the user object
    let display = document.getElementById("displayInfo");

    // un-hide the container by rmoving the hidden class
    display.classList.remove("hidden");

    // reset text in the confirm paragraph to ready for new output
    display.innerHTML = "";

    // display the user's input to them on the screen (add your user's info to the output below)
    display.innerHTML = "<strong>Your Information:</strong><br>" + filledForm.getInfo();
}


// GUESSING GAME
// function from book
// random number, inclusive
function getRandomNumber(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

function guessNum(){
    let userInput = document.getElementById("guessIn");

    let randomDisplay = document.getElementById("randomNum");
    let gameMsg = document.getElementById("guessMsg");

    let randomNumber = getRandomNumber(1,10);

    if(userInput.value < 1 || userInput.value > 10){
        gameMsg.textContent = "Please enter a number between 1 and 10"
    }else{
        randomDisplay.innerHTML = "Winning number: " + randomNumber + "<br>Your guess: " + userInput.value;

    if (randomNumber == userInput.value){
        gameMsg.textContent = "You won!"
    }else{
        gameMsg.textContent = "You lost, try again"
    }
    }


}



// PRODUCT SWITCHER
// let albumQbutton = document.getElementById("changeQ")
// toggles class for each one
// there's probably a better way to do this
function swaptoQ() {
    document.getElementById("q").classList.remove("hidden");
    document.getElementById("ten").classList.add("hidden");
    document.getElementById("bl").classList.add("hidden");
    document.getElementById("j2D").classList.add("hidden");
    document.getElementById("aku").classList.add("hidden");

    document.getElementById("changeQ").classList.add("active")
    document.getElementById("changeTen").classList.remove("active")
    document.getElementById("changeBL").classList.remove("active")
    document.getElementById("change12D").classList.remove("active")
    document.getElementById("changeAku").classList.remove("active")
}

function swaptoTen() {
    document.getElementById("q").classList.add("hidden");
    document.getElementById("ten").classList.remove("hidden");
    document.getElementById("bl").classList.add("hidden");
    document.getElementById("j2D").classList.add("hidden");
    document.getElementById("aku").classList.add("hidden");

    document.getElementById("changeQ").classList.remove("active")
    document.getElementById("changeTen").classList.add("active")
    document.getElementById("changeBL").classList.remove("active")
    document.getElementById("change12D").classList.remove("active")
    document.getElementById("changeAku").classList.remove("active")
}
function swaptoBL() {
    document.getElementById("q").classList.add("hidden");
    document.getElementById("ten").classList.add("hidden");
    document.getElementById("bl").classList.remove("hidden");
    document.getElementById("j2D").classList.add("hidden");
    document.getElementById("aku").classList.add("hidden");

    document.getElementById("changeQ").classList.remove("active")
    document.getElementById("changeTen").classList.remove("active")
    document.getElementById("changeBL").classList.add("active")
    document.getElementById("change12D").classList.remove("active")
    document.getElementById("changeAku").classList.remove("active")
}
function swaptoj2D() {
    document.getElementById("q").classList.add("hidden");
    document.getElementById("ten").classList.add("hidden");
    document.getElementById("bl").classList.add("hidden");
    document.getElementById("j2D").classList.remove("hidden");
    document.getElementById("aku").classList.add("hidden");

    document.getElementById("changeQ").classList.remove("active")
    document.getElementById("changeTen").classList.remove("active")
    document.getElementById("changeBL").classList.remove("active")
    document.getElementById("change12D").classList.add("active")
    document.getElementById("changeAku").classList.remove("active")
}
function swaptoAku() {
    document.getElementById("q").classList.add("hidden");
    document.getElementById("ten").classList.add("hidden");
    document.getElementById("bl").classList.add("hidden");
    document.getElementById("j2D").classList.add("hidden");
    document.getElementById("aku").classList.remove("hidden");

    document.getElementById("changeQ").classList.remove("active")
    document.getElementById("changeTen").classList.remove("active")
    document.getElementById("changeBL").classList.remove("active")
    document.getElementById("change12D").classList.remove("active")
    document.getElementById("changeAku").classList.add("active")
}




// EVENT HANDLERS
// for theme change
document.getElementById("themeToggle").addEventListener("click", darkMode);
// for form validation
document.getElementById("form").addEventListener("submit", validateForm);
// for product switcher
document.getElementById("changeQ").addEventListener("click", swaptoQ);
document.getElementById("changeTen").addEventListener("click", swaptoTen);
document.getElementById("changeBL").addEventListener("click", swaptoBL);
document.getElementById("change12D").addEventListener("click", swaptoj2D);
document.getElementById("changeAku").addEventListener("click", swaptoAku);

// for guessing game
document.getElementById("gamePlay").addEventListener("click", guessNum);