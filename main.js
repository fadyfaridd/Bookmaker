var bookmarkName = document.getElementById('bookmarkName');
var websiteUrl = document.getElementById('websiteUrl');
var bookmark;
if (localStorage.getItem('site') != null) {
    bookmark = JSON.parse(localStorage.getItem('site'))
    displaySites(bookmark);
} else {
    bookmark = []
}
function submitBtn() {
    if (validateSiteName() == true && validateSiteUrl() == true) {
        var website = {
            name: bookmarkName.value,
            url: websiteUrl.value
        }
        bookmark.push(website)
        localStorage.setItem('site', JSON.stringify(bookmark));
        clearForm()
        displaySites(bookmark);
    } else {
        alert('In-Valid Input');
    }
}
function clearForm() {
    bookmarkName.value = '';
    websiteUrl.value = '';
}
function displaySites(list) {
    var box = ``;
    for (var i = 0; i < list.length; i++) {
        box += ` <div class="my-2 py-3 d-flex justify-content-between px-5 bg-light"> 
        <h3>${list[i].name}</h3>
        <div>
            <button class="btn btn-primary" onclick='visitSite(${i})'>Visit</button>
            <button class="btn btn-danger" onclick='deleteSite(${i})'>Delete</button>
        </div>
    </div>`
    }
    document.getElementById('display').innerHTML = box;
}
function deleteSite(deletedIndex) {
    bookmark.splice(deletedIndex, 1);
    localStorage.setItem('site', JSON.stringify(bookmark));
    displaySites(bookmark);
}
function visitSite(visited) {
    window.open(`https://${bookmark[visited].url}`);
}

function validateSiteName() {
    var regex = /^[A-Z][a-z]{3,8}[0-9]{0,3}$/;
    if (regex.test(bookmarkName.value) == true) {
        bookmarkName.classList.replace('is-invalid', 'is-valid');
        return true;
    } else {
        bookmarkName.classList.add('is-invalid')
        return false;
    }
}
function validateSiteUrl() {
    var regex = /^[a-z]{3,8}[0-9]{0,3}\.com$/;
    if (regex.test(websiteUrl.value) == true) {
        websiteUrl.classList.replace('is-invalid', 'is-valid');
        return true;
    } else {
        websiteUrl.classList.add('is-invalid')
        return false;
    }
}