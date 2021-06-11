var emailBtn=false,mobileBtn=false,$phone=document.getElementById("phone"),$email=document.getElementById("email"),
$phoneBtn= document.getElementById("phone-btn"), $emailBtn=document.getElementById("email-btn"); 
function removeErorrCss(){
  document.querySelector('#email').parentNode.classList.remove("email-error");
  document.querySelector('#phone').parentNode.classList.remove("phone-error");
} 
function emailClicked() {
  removeErorrCss();
  localStorage.clear();
  $phone.style.display="none";
 $email.style.display="block";
 $phoneBtn.classList.remove("clicked");
 $emailBtn.classList.add("clicked");
  emailBtn=true;
  mobileBtn=false;
  
}
function phoneClicked() {
  removeErorrCss();
  localStorage.clear();
 $emailBtn.classList.remove("clicked");
  $phone.style.display="block";
 $email.style.display="none";
 $phoneBtn.classList.add("clicked");
  emailBtn=false;
  mobileBtn=true;
}

$(document).ready(function () {
  document.getElementById("loader-container").style.display = "none";
 $emailBtn.classList.add("clicked");
 $email.style.display="block";
  $phone.style.display="none";
  emailBtn=true;
  $("#btn-search").on("click", function (e) {
    e.preventDefault();
    localStorage.clear(); //Clears storage for next request
    if(emailBtn){
      email = $('#email').val().toLowerCase();

      var isEmailValidated;
      regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (email.match(regEx)) {
        isEmailValidated = true;
      } else {
        isEmailValidated = false;
      }
  
      if (isEmailValidated === true) {
        removeErorrCss();
  document.getElementById("loader-container").style.display = "block";
        const proxyurl = "";
        const url =
          'https://ltv-data-api.herokuapp.com/api/v1/records.json?email=' + email;
        fetch(proxyurl + url)
          .then((response) => {
  document.getElementById("loader-container").style.display = "none";
            return response.text()})
          .then(function (contents) {
            localStorage.setItem("userObject", contents);
            window.location.href = "result.html";
          })
          .catch((e) => console.log(e));
      } else if (isEmailValidated !== true) {
        document.querySelector('#email').parentNode.classList.add("email-error");
      }
    }
    else if(mobileBtn){
      phone = $('#phone').val().toLowerCase();

      var isPhoneValidated;
      regEx =  /^\d{10}$/;
      if (phone.match(regEx)) {
        isPhoneValidated = true;
      } else {
        isPhoneValidated = false;
      }
  
      if (isPhoneValidated === true) {
  document.getElementById("loader-container").style.display = "block";
        removeErorrCss();
        const proxyurl = "";
        const url =
          'https://ltv-data-api.herokuapp.com/api/v1/records.json?phone=' + phone;
        fetch(proxyurl + url)
          .then((response) => {
  document.getElementById("loader-container").style.display = "none";
            return response.text()})
          .then(function (contents) {
            localStorage.setItem("userObject", contents);
            window.location.href = "result.html";
          })
          .catch((e) => console.log(e));
      } else if (isPhoneValidated !== true) {
        document.querySelector('#phone').parentNode.classList.add("phone-error");
      }
    }
    
  });

  // $('input[type="text"]').keypress(function (event) {
  //   email = $('input[type="text"]').val().toLowerCase();
  //   regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  //   if (email.match(regEx)) {
  //     x = true;
  //     document.querySelector('input[type="text"]').parentNode.classList.remove("error");
  //   } else {
  //     x = false;
  //   }
  //   keycode = (event.keyCode ? event.keyCode : event.which);
  //   if (keycode == '13') {
  //     /**
  //      * Makes a request to ltv API to search an specific email address.
  //      * If there's a response, it gets stored in the local storage and redirects to results page
  //      */
  //     event.preventDefault();
  //     localStorage.clear(); //Clears storage for next request

  //     var x, y;


  //     if (x === true) {
  //       const proxyurl = "";
  //       const url =
  //         'https://ltv-data-api.herokuapp.com/api/v1/records.json?email=' + email;
  //       fetch(proxyurl + url)
  //         .then((response) => response.text())
  //         .then(function (contents) {
  //           localStorage.setItem("userObject", contents);
  //           window.location.href = "result.html";
  //         })
  //         .catch((e) => console.log(e));
  //     } else if (x !== true) {
  //       document.querySelector('input[type="text"]').parentNode.classList.add("error");
  //     }
  //   }
  // });

});
