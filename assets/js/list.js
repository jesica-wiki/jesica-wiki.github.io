
$(document).ready(function() {
    var inputSearch = document.getElementById('searchs');
    var ld = document.getElementById('loading-process');
    ld.style.display = "block";
    var queryParams = new URLSearchParams(window.location.search);
    var search = queryParams.get('search');
    inputSearch.value = search;
    var category = queryParams.get('category');
    var parentDiv = document.getElementById('parentDiv');

    var parentDiv2 = document.getElementById('parentDivTag');
    var newDiv2 = document.createElement('div');
    newDiv2.innerHTML = '<small style="color: grey;" class=""><i class="fa fa-sort-alpha-asc"></i> '+category.toUpperCase()+'</small>';
    parentDiv2.appendChild(newDiv2);
    
    
    var selectElement = document.getElementById("search_cat");
    for (var i = 0; i < selectElement.options.length; i++) {
        if (selectElement.options[i].value === category) {
            selectElement.selectedIndex = i;
            break
        }
    }

    if (search == null) {
        search = '';
    }
    if (category == null) {
        category = 'all';
    }
    $.ajax({
        url:"https://wiki.yogyakartadigital.com/api/v1/docs-list?category="+category+"&search="+search,
        type: "GET",
        dataType : 'json',
        success: function(result){
            $.each(result['list'],function(key,value){
                var newDiv = document.createElement('div');
                newDiv.innerHTML = '<a href="detail.html?ids='+value["id"]+'" class="link_list"><h4 class="question">'+value["title"]+'</h4></a> <div class="answer">'+value["description"]+'</div> <div class="meta text-small">created by '+value["creator"]+'</div> <hr/>';
                newDiv.className = 'detail-wiki-'+key;
                parentDiv.appendChild(newDiv);
            });
        }
    });
    ld.style.display = "none";
});

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
    var queryParams = new URLSearchParams(window.location.search);
    var category = queryParams.get('category');
    var ld = document.getElementById('loading-process');
    ld.style.display = "block";
    let user = getCookie("token");      
    var lb = document.getElementById('login-buttons');
    var cb = document.getElementById('create-buttons');
    if (user != "") {
        cb.innerHTML = '<a class="btn btn-cta" href="create.html?category='+category+'" style="background:#Ff4b36;"><i class="fas fa-pencil"></i> Create Doc</a>';
    } else {
        lb.innerHTML = '<a class="btn btn-cta" href="login.html" style="background:#Ff4b36;"><i class="fas fa-external-link-alt"></i> Login</a>';
    }
    ld.style.display = "none";
}