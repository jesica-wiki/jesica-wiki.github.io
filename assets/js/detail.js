
$(document).ready(function() {
    var ld = document.getElementById('loading-process');
    ld.style.display = "block";

    var queryParams = new URLSearchParams(window.location.search);
    var ids = queryParams.get('ids');

    if (ids == null || ids == '') {
        window.location.href = 'index.html';
    }
    
    
    let token = getCookie("token");
    var parentDiv = document.getElementById('parentDiv');
    var parentDiv2 = document.getElementById('doc-menu');
    var parentDivTitle = document.getElementById('doc-title');
    var parentDivMeta = document.getElementById('doc-meta');
    $.ajax({
         url:"https://wiki.yogyakartadigital.com/api/v1/docs-detail/"+ids,
         type: "GET",
         headers: {
             "Authorization": "Bearer " + token
         },
         dataType : 'json',
         success: function(result){
            var cb = document.getElementById('create-buttons');
            let user = getCookie("username"); 
            if (user == result['data']['creator']) {
                 cb.innerHTML = '<a class="btn btn-cta" href="update.html?ids='+result['data']['id']+'" style="background:#Ff4b36;"><i class="fas fa-pencil"></i> Update Doc</a>';
            }
         
            var newDivtitle = document.createElement('i');
            newDivtitle.innerHTML = result['data']['title'];
            parentDivTitle.appendChild(newDivtitle);

            
            var newDivMeta = document.createElement('span');
            newDivMeta.innerHTML = '<small><i class="fa fa-arrow"></i> Creator '+result['data']['creator']+'</small>';
            parentDivMeta.appendChild(newDivMeta);

            var newDiv = document.createElement('section');
            newDiv.innerHTML = '<h2 class="section-title">Description</h2><div class="section-block"><ul class="list list-unstyled">'+result["data"]["description"]+'</ul></div>';
            newDiv.className = 'doc-section';
            newDiv.id = 'description';
            parentDiv.appendChild(newDiv);
            
            var newDiv2 = document.createElement('li');
            newDiv2.innerHTML = '<a class="nav-link scrollto" href="#description">description</a>';
            newDiv2.className = 'nav-item';
            parentDiv2.appendChild(newDiv2);

            $.each(result['data']['readme'],function(key,value){
                 var newDiv = document.createElement('section');
                 newDiv.innerHTML = '<h2 class="section-title">'+value["name"]+' <a href="#note'+key+'" onclick="copyToClipboard('+key+')"><i class="fa fa-copy"></i></a></h2><div class="section-block"><ul class="list list-unstyled"><pre><code class="language-markup" style="min-width:100%;" id="not_doc'+key+'"></code></pre></ul></div>';
                 newDiv.className = "doc-section";
                 newDiv.id = 'note'+key;
                 parentDiv.appendChild(newDiv);
             
                 var parentDiv1 = document.getElementById('not_doc'+key);
                 var newDiv1 = document.createElement('span');
                 newDiv1.innerHTML = value["note"]+"<br/><br/>";
                 parentDiv1.appendChild(newDiv1);

                 var newDiv2 = document.createElement('li');
                 newDiv2.innerHTML = '<a class="nav-link scrollto" href="#note'+key+'">'+value["name"]+'</a>';
                 newDiv2.className = 'nav-item';
                 parentDiv2.appendChild(newDiv2);
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

function copyToClipboard(div) {
     div = "not_doc"+div;
     var dataDiv = document.getElementById(div);
     var range = document.createRange();
     range.selectNode(dataDiv);
     var selection = window.getSelection();
     selection.removeAllRanges();
     selection.addRange(range);
     document.execCommand('copy');
     selection.removeAllRanges();
 }