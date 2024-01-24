
function submit_button() {
    var email = $("input[name='email']").val();
    var password = $("input[name='password']").val();
    if (email == '' || password == '') {
        alert('Please fill all the fields');
    } else {
        var ld = document.getElementById('loading-process');
        ld.style.display = "block";
        $.ajax({
            url: 'https://wiki.yogyakartadigital.com/api/v1/login',
            type: 'POST',
            data: { 
                email: email,
                password: password
            },
            success: function (data) {
                if (data.message == 'success') {
                    setCookie("token", data.token, 300);
                    setCookie("username", data.user.username, 300);
                    window.location.href = 'index.html';
                } else {
                    alert(data.message);
                }
            },
            error: function (data) {
                alert('Something went wrong');
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