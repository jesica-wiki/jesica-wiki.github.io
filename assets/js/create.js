
function add_doc() {
    var nameInput = document.getElementById("names");
    var noteInput = document.getElementById("notes");
    var nameValue = nameInput.value;
    var noteValue = noteInput.value;
    if(nameValue == '' || noteValue == '') {
        alert('Please fill all the fields');
    } else {
        var table = document.getElementById("doc-list-table");
        var tbody = table.getElementsByTagName('tbody')[0];

        var row = tbody.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.innerText = nameValue;
        cell2.innerText = noteValue;
        cell3.innerHTML = '<button type="button" class="btn text-center" style="color: #Ff4b36;" onclick="delete_row(this)"><i class="fas fa-trash"></i></button>';
        nameInput.value = '';
        noteInput.value = '';
    }
}

function delete_row(button) {
    var rowIndex = button.parentNode.parentNode.rowIndex;
    var table = document.getElementById("doc-list-table");
    table.deleteRow(rowIndex);

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

function checkCookie() {
    var ld = document.getElementById('loading-process');
    ld.style.display = "block";
    let user = getCookie("token");      
    var lb = document.getElementById('login-buttons');
    var cb = document.getElementById('create-buttons');
    if (user == "") {
        window.location.href = 'login.html';
    }
    ld.style.display = "none";
}

function submit_button() {
    var title = $("input[name='titles']").val();
    var descriptions = $("textarea[name='descriptions']").val();
    var queryParams = new URLSearchParams(window.location.search);
    var categorys = queryParams.get('category');

    var table = document.getElementById("doc-list-table");
    var rows = table.getElementsByTagName('tbody')[0].rows;
    var extractedData = [];
    for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].cells;
        var rowData = {
            name: cells[0].textContent,
            note: cells[1].innerHTML
        };
        extractedData.push(rowData);
    }
    let token = getCookie("token"); 
    if (title == '' || descriptions == '' || extractedData.length == 0) {
        swal("Oops!", 'Please fill all the fields', "warning");
    } else {
        $.ajax({
            url: 'https://wiki.yogyakartadigital.com/api/v1/docs-create',
            type: 'POST',
            headers: {
                "Authorization": "Bearer " + token
            },
            data: { 
                title:title,
                description:descriptions.replace(/\n/g, '<br>'),
                category:categorys,
                readme:extractedData
            },
            success: function (data) {
                if (data.message == 'success') {
                    window.location.href = 'detail.html?ids='+data.id;
                } else {
                    swal("Failed!", data.message, "error");
                }
            },
            error: function (data) {
                swal("Failed!", 'Something went wrong', "error");
            }
        });
    }
}