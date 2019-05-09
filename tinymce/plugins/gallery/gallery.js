var qnt = 0;
var div_form = document.getElementById("form_image");
var div_table = document.getElementsByClassName("table")[0];
var div_panel = document.getElementsByClassName("panel")[0];
var inp_url = document.getElementById("url_img");
var inp_alt = document.getElementById("alt_img");
var inp_title = document.getElementById("title_img");
var inp_desc = document.getElementById("desc_img");
var inp_cred = document.getElementById("cred_img");
var table = document.getElementById("table_images");
var row;
var args = top.tinymce.activeEditor.windowManager.getParams();
var element = args.element;

while (element.nodeName !== "BODY") {
    if (element.nodeName === "DIV" && element.getAttribute("id") === "slides") {
        loadGallery();
        break;
    }
    element = element.parentNode;
}

function getUrl() {
    var string = args.url;
    return string.substring(0, string.indexOf("components"));
}

function showForm() {
    div_form.style.display = "block";
    div_table.style.display = "none";
    div_panel.style.display = "none";
    inp_url.focus();
}

function closeForm() {
    div_form.style.display = "none";
    div_table.style.display = "block";
    div_panel.style.display = "block";
    document.getElementById("form_add").style.display = "initial";
    document.getElementById("form_edit").style.display = "none";
    document.getElementById("txt_form_i").style.display = "block";
    document.getElementById("txt_form_m").style.display = "none";
    row = null;
    clearForm();
}

function addImage() {
    if (!validateForm()) {
        return;
    }
    qnt++;
    var row = table.insertRow(qnt);
    var celTmb = row.insertCell(0);
    var celDesc = row.insertCell(1);
    var celAct = row.insertCell(2);

    celTmb.innerHTML = "<img class='thumb' src='" + inp_url.value + "' alt='" + inp_alt.value + "'/>";
    celDesc.innerHTML = "<div class='title'>" + inp_title.value + "</div>"
            + "<div class='desc'>" + inp_desc.value + "</div>"
            + "<div class='cred'>" + inp_cred.value + "</div>";
    celAct.innerHTML = "<button onclick='editForm(this)'>Modify</button>"
            + "<button onclick='removeImage(this)'>Remove</button>";
    celDesc.setAttribute("data-url", encodeURIComponent(inp_url.value));
    celDesc.setAttribute("data-alt", encodeURIComponent(inp_alt.value));
    celDesc.setAttribute("data-title", encodeURIComponent(inp_title.value));
    celDesc.setAttribute("data-desc", encodeURIComponent(inp_desc.value));
    celDesc.setAttribute("data-cred", encodeURIComponent(inp_cred.value));
    closeForm();
    generateHtml();
}

function editImage(activeRow) {
    if (!validateForm()) {
        return;
    }
    var row = activeRow;
    var celTmb = row.cells[0];
    var celDesc = row.cells[1];

    celTmb.innerHTML = "<img class='thumb' src='" + inp_url.value + "' alt='" + inp_alt.value + "'/>";
    celDesc.innerHTML = "<div class='title'>" + inp_title.value + "</div>"
            + "<div class='desc'>" + inp_desc.value + "</div>"
            + "<div class='cred'>" + inp_cred.value + "</div>";
    celDesc.setAttribute("data-url", inp_url.value);
    celDesc.setAttribute("data-alt", inp_alt.value);
    celDesc.setAttribute("data-title", inp_title.value);
    celDesc.setAttribute("data-desc", inp_desc.value);
    celDesc.setAttribute("data-cred", inp_cred.value);
    document.getElementById("form_add").style.display = "initial";
    document.getElementById("form_edit").style.display = "none";
    document.getElementById("txt_form_i").style.display = "block";
    document.getElementById("txt_form_m").style.display = "none";
    row = null;
    closeForm();
    generateHtml();
}

function removeImage(e) {
    qnt--;
    table.deleteRow(e.parentNode.parentNode.rowIndex);
    generateHtml();
}

function editForm(e) {
    row = e.parentNode.parentNode;
    document.getElementById("form_edit").style.display = "initial";
    document.getElementById("form_add").style.display = "none";
    document.getElementById("txt_form_m").style.display = "block";
    document.getElementById("txt_form_i").style.display = "none";
    var celDesc = row.cells[1];
    inp_url.value = decodeURIComponent(celDesc.getAttribute("data-url"));
    inp_alt.value = decodeURIComponent(celDesc.getAttribute("data-alt"));
    inp_title.value = decodeURIComponent(celDesc.getAttribute("data-title"));
    inp_desc.value = decodeURIComponent(celDesc.getAttribute("data-desc"));
    inp_cred.value = decodeURIComponent(celDesc.getAttribute("data-cred"));
    showForm();
}

function clearForm() {
    inp_url.value = "";
    inp_alt.value = "";
    inp_title.value = "";
    inp_desc.value = "";
    inp_cred.value = "";
}

function validateForm() {
    if (inp_url.value === "") {
        top.tinymce.activeEditor.windowManager.open({
            title: "Warning", body: [{
                    type: "container", html: "<p>Insert the image URL.</p>"
                }], buttons: [{
                    text: "Ok", onclick: "close"
                }]
        });
        inp_url.focus();
        return false;
    } else if (inp_alt.value === "") {
        top.tinymce.activeEditor.windowManager.open({
            title: "Warning", body: [{
                    type: "container", html: "<p>Insert the image's alternative text.</p>"
                }], buttons: [{
                    text: "Ok", onclick: "close"
                }]
        });
        inp_alt.focus();
        return false;
    } else {
        return true;
    }
}

function generateHtml() {
    var i;
    var html = "";
    if (qnt !== 0) {
        html = "<p><!-- GALLERY BEGIN --><div id='slides' style='width: 100%; display:block; border: 1px solid #666;'>";
        for (i = 1; i <= qnt; i++) {
            var row = table.rows[i];
            var celDesc = row.cells[1];
            var url = decodeURIComponent(celDesc.getAttribute("data-url"));
            var alt = decodeURIComponent(celDesc.getAttribute("data-alt"));
            var title = decodeURIComponent(celDesc.getAttribute("data-title"));
            var desc = decodeURIComponent(celDesc.getAttribute("data-desc"));
            var cred = decodeURIComponent(celDesc.getAttribute("data-cred"));
            html = html + "<div id='slide' style='border: 1px solid #ccc; display: inline-block; max-width: 235px; height: 235px; text-align: center; padding: 5px; vertical-align: top; margin: 2px;'>";
            html = html + "<img src='" + url + "' alt='" + alt + "' title='" + title + "' longdesc='" + desc + "' style='max-height: 150px; max-width: 200px; margin: 0 auto; display: block;' />";
            html = html + "<div id='title' style='display: block; width: 225px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bold; font-size: 16px;line-height: 30px;'>" + title + "</div>";
            html = html + "<div id='desc' style='display: block; width: 225px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 14px;line-height: 25px;'>" + desc + "</div>";
            html = html + "<div id='cred' style='display: block; width: 225px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-style: italic; font-size: 12px;line-height: 20px;'>" + cred + "</div>";
            html = html + "</div>";
        }
        html = html + "</div><!-- GALLERY END --></p>";
    }
    document.getElementById("htmlGallery").innerHTML = html;
}

function loadGallery() {
    var slidesCount = element.childNodes.length;
    var slideElement = null;


    for (var i = 0; i < slidesCount; i++) {
        var url;
        var alt = "";
        var title = "";
        var desc = "";
        var cred = "";
        slideElement = element.childNodes[i];
        if (slideElement.nodeName === "DIV" && slideElement.getAttribute("id") === "slide") {
            var infoElement;
            var infoCount = slideElement.childNodes.length;
            for (var j = 0; j < infoCount; j++) {
                infoElement = slideElement.childNodes[j];
                if (infoElement.nodeName === "IMG") {
                    url = infoElement.getAttribute("src");
                    alt = infoElement.getAttribute("alt");
                }
                if (infoElement.nodeName === "DIV" && infoElement.getAttribute("id") === "title") {
                    title = infoElement.innerHTML;
                }
                if (infoElement.nodeName === "DIV" && infoElement.getAttribute("id") === "desc") {
                    desc = infoElement.innerHTML;
                }
                if (infoElement.nodeName === "DIV" && infoElement.getAttribute("id") === "cred") {
                    cred = infoElement.innerHTML;
                }
            }

            qnt++;
            var row = table.insertRow(qnt);
            var celTmb = row.insertCell(0);
            var celDesc = row.insertCell(1);
            var celAct = row.insertCell(2);

            celTmb.innerHTML = "<img class='thumb' src='" + url + "' alt='" + alt + "'/>";
            celDesc.innerHTML = "<div class='title'>" + title + "</div>"
                    + "<div class='desc'>" + desc + "</div>"
                    + "<div class='cred'>" + cred + "</div>";
            celAct.innerHTML = "<button onclick='editForm(this)'>Modify</button>"
                    + "<button onclick='removeImage(this)'>Remove</button>";
            celDesc.setAttribute("data-url", encodeURIComponent(url));
            celDesc.setAttribute("data-alt", encodeURIComponent(alt));
            celDesc.setAttribute("data-title", encodeURIComponent(title));
            celDesc.setAttribute("data-desc", encodeURIComponent(desc));
            celDesc.setAttribute("data-cred", encodeURIComponent(cred));
        }
    }
    generateHtml();
}

function openFileManager() {
    alert("Open custom file manager");
}
