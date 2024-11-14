const form = document.querySelector("#form");
const urlInput = document.querySelector("#input-url");
const companyName = document.querySelector("#company-name");
const checkboxNew = document.querySelector('#new');
const checkboxFeatured = document.querySelector("#featured");
const jobPosition = document.querySelector("#position");
const selectTime = document.querySelector("#time");
const selectJobType = document.querySelector("#job-type");
const selectLocation = document.querySelector("#location");
const checkboxFullstack = document.querySelector("#Fullstack");
const Midweight = document.querySelector("#Midweight");
const Phyton = document.querySelector("#Phyton");
const React = document.querySelector("#React"); 
const button = document.querySelector("#button");
const wrapper = document.querySelector("#wrapper");
const deleteButton =  document.querySelector(".delete");

// Validatsiyalar
// url validation
function validateUrl (urlInput) {
    if (!urlInput.value.startsWith("http")) {
        alert("URL manzilingizni to'g'ri kiriting");
        urlInput.focus();
        return false
    }
    return true
}



// Company Validation
function validateCompany(companyName) {
    if (companyName.value.length <= 3) {
        alert("Kompaniya nomi hech bo'lmaganda 3 ta harfdan iborat bo'lsin");
        companyName.focus();
        return false;
    }
    return true;
}

// validate ish
function validateJob (jobPosition) {
    if (jobPosition.value === "") {
        alert("Bo'sh bo'lmasligi zarur");
        jobPosition.focus();
        return false
    }
    return true
}

// select validations
function validateTime (selectTime) {
    if (selectTime.value === "") {
        alert("Vaqtni tanlang")
        return false
    }
    return true
}
// validation ish
function validateJobType(selectJobType) {
    if (selectJobType.value === "") {
        alert("Ishni tanlang")
        return false 
    }
    return true
}

function validateLocation(selectLocation) {
    if(selectLocation.value === "") {
        alert("Joylashuvni tanla")
        return false
    }
    return true
}

// Hammasini valid qilish
function validateOverall() {
    return validateUrl(urlInput) && validateCompany(companyName) && validateJob(jobPosition) && validateTime(selectTime) && validateJobType(selectJobType) && validateLocation(selectLocation)
}

// Card Creation
function createCard(data) {
    let newText = "";
    if (checkboxNew.checked) {

        newText += '<p id="new-but">NEW!</p>';
    }

    let featureText = "";
    if (checkboxFeatured.checked) {

        featureText += '<p id="feat">FEATURED</p>';
    }

    let selectedSkills = [];
    if (checkboxFullstack.checked) {
        selectedSkills.push("Fullstack");
    }
    if (Midweight.checked) {
        selectedSkills.push("Midweight");
    }
    if (Phyton.checked) {
         selectedSkills.push("Phyton");
    }
    if (React.checked) {

        selectedSkills.push("React");
    }

    let skills = "";
    for (let i = 0; i < selectedSkills.length; i++) {
        skills += `<p>${selectedSkills[i]}</p>`;
    }

    return `
        <div class="block">
            <div class="card"> 
                <div class="card-left">
                    <div class="image"><img src="${data.urlInput}" width="88" height="88" alt=""></div>
                    <div class="photosnap">
                        <div class="scripts">
                            <h3>${data.companyName}</h3>
                            ${newText}
                            ${featureText}
                        </div>
                        <div class="type">${data.jobPosition}</div>
                        <div class="day-time">
                            <p>${data.selectTime}</p>
                            <p>${data.selectJobType}</p>
                            <p>${data.selectLocation}</p>
                        </div>
                    </div>
                </div>
                <div class="card-right">
                    ${skills}
                </div>
              <button class="delete" data-id="${data.id}">Delete</button>
            </div>
        </div>
    `;
}



// My local storage

function getDataFromLocalStorage() {
    let data = [];
    if (localStorage.getItem('todos')) {
        data = JSON.parse(localStorage.getItem('todos'))
    }
    return data;
}

// Button 
button.addEventListener('click', function(event) {
    event.preventDefault();

   
    const isValid = validateOverall();
    if (!isValid) {
        return;
    }

    const todo = {
        id: Date.now(),
        urlInput: urlInput.value,
     companyName: companyName.value,
     jobPosition: jobPosition.value,
     selectTime: selectTime.value,
    selectJobType: selectJobType.value,
     selectLocation: selectLocation.value,
    };

    const cardHtml = createCard(todo);
    wrapper.innerHTML += cardHtml;
    form.reset();

    let todos = getDataFromLocalStorage();
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos))
});

document.addEventListener('DOMContentLoaded', function(){
    let todos = getDataFromLocalStorage();
    todos.forEach(todo => {
        let card = createCard(todo);
        wrapper.innerHTML += card;
    })

    let buttons = document.querySelectorAll(".delete");
    buttons.length > buttons.forEach(btn => {
        btn && btn.addEventListener("click" , function(event) {
            let isDelete = confirm ('Rostan ham ochirasimi')
            let cardDelete = this.parentElement.parentElement;
            cardDelete.remove();
            let id = this.getAttribute('data-id');
            if (id) {
                todos = todos.filter(value => {
                    return value.id != id
                })
                localStorage.setItem("todos", JSON.stringify(todos))
            }
        })
    })
})





