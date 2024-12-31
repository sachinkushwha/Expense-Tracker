if (localStorage.getItem('expance') == null) {
    var expance = [];
}
else {
    var expance = JSON.parse(localStorage.getItem('expance'))
}
function add() {
    let expancename = document.getElementById("expance-name").value;
    let amount = document.getElementById("expance-amount").value;
    let date = document.getElementById("date").value;
    if (expancename.length && amount.length && date.length > 0) {
        let expdata = {
            uid: Date.now(),
            name: expancename,
            amount: amount,
            date: date
        };
        expance.push(expdata);
        savedata(expance);
        alert("expance add successfuly");
        document.getElementById("expance-name").value = "";
        document.getElementById("expance-amount").value = "";
        document.getElementById("date").value = "";
    }
    else {
        alert("enter complet data!");
    }

}
function savedata(exdata) {
    localStorage.setItem('expance', JSON.stringify(exdata));
}

function views() {
    if (document.getElementById("view-expance")) {
        viewexpance();
    } else {
        let newdiv = document.createElement("div");
        newdiv.id = "view-expance";
        let addcon = document.getElementById("container");
        addcon.appendChild(newdiv);
        viewexpance();
    }
}
function viewexpance() {
    let viewexpance = document.getElementById("view-expance");
    viewexpance.innerHTML = "";
    let table = document.createElement("table");
    let head = document.createElement("thead");
    let headerrow = document.createElement("tr");
    let headings = ["Expance Name", "Expance Amount", "Expance Date"];
    headings.forEach(heading => {
        let th = document.createElement("th");
        th.textContent = heading;
        headerrow.appendChild(th);
    });
    head.appendChild(headerrow);
    table.appendChild(head);
    let tbody = document.createElement("tbody");

    expance.forEach(function (expance) {
        let row = document.createElement("tr");
        row.setAttribute("data-id", expance.uid);
        let nameCell = document.createElement("td");
        nameCell.textContent = expance.name;
        let nameamount = document.createElement("td");
        nameamount.textContent = "₹" + expance.amount;
        let namedate = document.createElement("td");
        let date = expance.date;
        date = date.split('-').reverse().join('-');
        namedate.textContent = date;
        let bu = document.createElement("td");
        let butt = document.createElement("button");
        butt.onclick = function () {
            dekh(this);
        };
        butt.textContent = "delete";
        bu.appendChild(butt);
        row.appendChild(nameCell);
        row.appendChild(nameamount);
        row.appendChild(namedate);
        row.appendChild(bu);
        tbody.appendChild(row);
    });
    table.appendChild(tbody);
    noitem(tbody, table);
    total(tbody, table);

    viewexpance.appendChild(table);

}
function noitem(tbody, table) {
    if (expance.length === 0) {
        let row = document.createElement("tr");
        let td = document.createElement("td");
        td.colSpan = 3;
        td.innerHTML = "no expance added";
        row.appendChild(td);
        tbody.appendChild(row);
        table.appendChild(tbody);
    }
}
function total(tbody, table) {
    let row = document.createElement("tr");
    let td = document.createElement("td");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let total = 0;
    expance.forEach(expance => {
        total += parseFloat(expance.amount);
    })
    td1.textContent = "Total";
    td1.style.fontWeight = "bold";
    td2.textContent = "₹" + total;
    td2.style.fontWeight = "bold";
    row.appendChild(td1);
    row.appendChild(td2);
    tbody.appendChild(row);
    table.appendChild(tbody);
}
function dekh(button) {
    let row = button.closest("tr");
    if (row) {
        row.remove();
        let id = row.getAttribute('data-id');
        expance = expance.filter(item => item.uid !== Number(id));
        localStorage.setItem('expance', JSON.stringify(expance));
        viewexpance();
    }
}
