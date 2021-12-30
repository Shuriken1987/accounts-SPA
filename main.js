
window.addEventListener('beforeunload',save);

let db = [];
if (localStorage.db) {
    db = JSON.parse(localStorage.db);
}  

let index = '';
let tBody = document.querySelector('tbody');
let editTbody = document.querySelector('#editTbody');
let userAddAccount = document.querySelector('.userAddAccount');
let accountsView = document.querySelector('.accountsView');
let editDeleteView = document.querySelector('.editDeleteView');
let editUserAccountView = document.querySelector('.userEdit');
let addAccountBtn = document.querySelector('#addAccountBtn');
let viewAccountsBtn = document.querySelector('#viewAccountsBtn');
let editDeleteBtn = document.querySelector('#editDeleteBtn');
let inputId = document.querySelector('[placeholder = "id"]');
let inputName = document.querySelector('[placeholder = "name"]');
let inputDeposit = document.querySelector('[placeholder = "deposit"]');
let inputCcard = document.querySelector('[placeholder = "credit card"]');
let saveBtn = document.querySelector('.save');
let updateBtn = document.querySelector('.updateBtn');
let editId = document.querySelector('#editId');
let editName = document.querySelector('#editName');
let editDeposit = document.querySelector('#editDeposit');
let editCcard = document.querySelector('#editCcard');

createTable();

addAccountBtn.addEventListener('click', addAccount);
viewAccountsBtn.addEventListener('click', accounts);
saveBtn.addEventListener('click', saveAccount);
editDeleteBtn.addEventListener('click', displayEditDeleteView);
updateBtn.addEventListener('click', updateAccount);

function updateAccount() {
    let editedAccount = {
        id: editId.value,
        name: editName.value,
        deposit: editDeposit.value,
        cCard: editCcard.value
    }
    db[index] = editedAccount;
    createTable();
    accounts();
}

function displayEditView() {
    index = this.getAttribute('data-index');
    updateBtn.setAttribute('data-id', index);
    let accountId = this.getAttribute('data-id');
    console.log(index);
    let currenAccount = db.filter(function (el) {
        if (el.id == accountId) {
            return true;
        }
    });
    editId.value = currenAccount[0].id;
    editName.value = currenAccount[0].name;
    editDeposit.value = currenAccount[0].deposit;
    editCcard.value = currenAccount[0].cCard;

    accountsView.style.display = 'none';
    userAddAccount.style.display = 'none';
    editDeleteView.style.display = 'none';
    editUserAccountView.style.display = 'block';
}

function displayEditDeleteView() {
    createEditTable();
    editUserAccountView.style.display = 'none';
    accountsView.style.display = 'none';
    userAddAccount.style.display = 'none';
    editDeleteView.style.display = 'block';
}

function addAccount() { // displayAddAccountView
    editUserAccountView.style.display = 'none';
    accountsView.style.display = 'none';
    editDeleteView.style.display = 'none';
    userAddAccount.style.display = 'block';
}

function accounts() { // display accountView
    editUserAccountView.style.display = 'none';
    userAddAccount.style.display = 'none';
    editDeleteView.style.display = 'none';
    accountsView.style.display = 'block';
    createTable();
}

function createTable() {
    let text = '';
    for (let i = 0; i < db.length; i++) {
        const account = db[i];
        text += `
        <tr>
            <td>${account.id}</td>
            <td>${account.name}</td>
            <td>${account.deposit}</td>
            <td>${account.cCard}</td>
        </tr>
        `;
    }
    tBody.innerHTML = text;
}

function createEditTable() {
    let text = '';
    for (let i = 0; i < db.length; i++) {
        const account = db[i];
        text += `
        <tr>
            <td>${account.id}</td>
            <td>${account.name}</td>
            <td>${account.deposit}</td>
            <td>${account.cCard}</td>
            <td><button class="btn btn-sm btn-danger mx-1 deleteBtns" id="${db[i].id}">Delete</button><button class="btn btn-sm btn-warning editBtns" data-id="${db[i].id}" data-index="${i}">Edit</button></td>
        </tr>
        `;
    }
    editTbody.innerHTML = text;
    let deleteBtns = document.querySelectorAll('.deleteBtns');
    let editBtns = document.querySelectorAll('.editBtns');
    for (let i = 0; i < deleteBtns.length; i++) {
        deleteBtns[i].addEventListener('click', deleteAccount);
        editBtns[i].addEventListener('click', displayEditView);
    }
}

function deleteAccount() {
    let accountId = this.id;
    console.log(accountId);
    let newDb = db.filter(function (el) {
        if (accountId == el.id) {
            return false;
        } else {
            return true;
        }
    });
    db = newDb;
    createEditTable();
}

function saveAccount() {
    let addedAcount = {
        id: inputId.value,
        name: inputName.value,
        deposit: inputDeposit.value,
        cCard: inputCcard.value
    }
    db.push(addedAcount);
    validation();
    inputId.value = '';
    inputName.value = '';
    inputDeposit.value = '';
    inputCcard.value = '';
}

function validation() {
    if ((inputId.value && inputName.value && inputDeposit.value && inputCcard.value) !== '') {
        createTable();
        accounts();
    } else {
        let message = document.querySelector('.message');
        message.innerHTML = `All fields must be field`;
    }
}

function save(){
    localStorage.db = JSON.stringify(db);
}
