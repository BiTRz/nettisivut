// Function to open tabs
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
    for (var tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (var tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

// Functions to open and close the side menu
var sidemenu = document.getElementById("sidemenu");

function openmenu() {
    sidemenu.style.right = "0";
}

function closemenu() {
    sidemenu.style.right = "-200px";
}

// Form submission handling
document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission
    document.getElementById("message").textContent = "Submitting...";
    document.getElementById("message").style.display = "block";
    document.querySelector(".btn.btn2").disabled = true;

    // Collect the form data
    var formData = new FormData(this);
    var keyValuePairs = [];
    for (var pair of formData.entries()) {
        keyValuePairs.push(encodeURIComponent(pair[0]) + "=" + encodeURIComponent(pair[1]));
    }
    var formDataString = keyValuePairs.join("&");

    // Send a POST request to your Google Apps Script
    fetch("https://script.google.com/macros/s/AKfycbwau2OeO2clOdeU9uEJ_FlmizmdudwElRBHtWViU_FPPVQkp_MYfrvO_okkKcmTCn1WHg/exec", {
        redirect: "follow",
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: formDataString,
    })
    .then(function (response) {
        // Check if the request was successful
        if (response.ok) {
            return response.json(); // Assuming your script returns JSON response
        } else {
            throw new Error("Failed to submit the form.");
        }
    })
    .then(function (data) {
        // Check if the response contains a success indicator
        if (data.result === "success") {
            // Display a success message
            document.getElementById("message").textContent = "Data submitted successfully!";
            document.getElementById("message").style.display = "block";
            document.getElementById("message").style.backgroundColor = "green";
            document.getElementById("message").style.color = "beige";
            document.querySelector(".btn.btn2").disabled = false;
            document.getElementById("form").reset();
            setTimeout(function () {
                document.getElementById("message").textContent = "";
                document.getElementById("message").style.display = "none";
            }, 2600);
        } else {
            throw new Error("Failed to submit the form.");
        }
    })
    .catch(function (error) {
        // Handle errors, you can display an error message here
        console.error(error);
        document.getElementById("message").textContent = "An error occurred while submitting the form.";
        document.getElementById("message").style.display = "block";
        document.getElementById("message").style.backgroundColor = "red";
        document.getElementById("message").style.color = "white";
        document.querySelector(".btn.btn2").disabled = false;
    });
});