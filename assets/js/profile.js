
$(document).ready(function() {
    let token = getCookie("token");
     var fullnameInput = document.getElementById("fullname");
     var usernameInput = document.getElementById("username");
    $.ajax({
         url:"https://wiki.yogyakartadigital.com/api/v1/profile",
         type: "GET",
         headers: {
             "Authorization": "Bearer " + token
         },
         dataType : 'json',
         success: function(result){
             console.log(result);
             fullnameInput.value = result['user']['name'];
             usernameInput.value = result['user']['username'];
         },
         error: function (data) {
             alert('Something went wrong');
         }
    });
 });

 function submit_button() {
     var fullname = $("input[name='fullname']").val();
     var password = $("input[name='password']").val();
     var confirm_password = $("input[name='confirm_password']").val();

     if (fullname == '') {
         alert('Please fill the fullname');
     } else {
         let token = getCookie("token");
         $.ajax({
             url: 'https://wiki.yogyakartadigital.com/api/v1/profile-update',
             type: 'POST',
             headers: {
                 "Authorization": "Bearer " + token
             },
             data: { 
                 full_name: fullname,
                 password: password == "" ? null : password,
                 confirm_password: confirm_password == "" ? null : confirm_password,
             },
             success: function (data) {
                 if (data.message == 'success') {
                     window.location.href = 'index.html';
                 } else {
                     alert(data.message);
                 }
             },
             error: function (data) {
                 window.location.href = 'login.html';
             }
         });
         ld.style.display = "none";
     }
 }
 function setCookie(cname,cvalue,exdays) {
     const d = new Date();
     d.setTime(d.getTime() + (exdays*24*60*60*10000));
     let expires = "expires=" + d.toUTCString();
     document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
 }
 
 function getCookie(cname) {
     let name = cname + "=";
     let decodedCookie = decodeURIComponent(document.cookie);
     let ca = decodedCookie.split(';');
     for(let i = 0; i < ca.length; i++) {
         let c = ca[i];
         while (c.charAt(0) == ' ') {
         c = c.substring(1);
         }
         if (c.indexOf(name) == 0) {
         return c.substring(name.length, c.length);
         }
     }
     return "";
 }