const addNewInfo = document.getElementById('addNewInfo');
const clientName = document.getElementById('clientName');
const clientAmount = document.getElementById('clientAmount');
const payDate = document.getElementById('payDate');
const nameBox = document.getElementById('nameBox');
const tableName = document.getElementById('tableName');
const thead = document.querySelector("thead");
const tbody =  document.getElementById('tbody');
const addLoan = document.getElementById('addLoan');
const updateInfo = document.getElementById('update');
const selectDate = document.getElementById('selectDate');

const showElement = (Id) => {
    const element = document.getElementById(Id);
    if (element) {
        element.style.display = 'block';
    }
}

const hideElement = (Id) => {
    const element = document.getElementById(Id);
    if (element) {
        element.style.display = 'none';
    }
}

//show Element and Hide Element

//end

addNewInfo.addEventListener('click', ()=> {
    showElement("addInfo")
    hideElement('addNewInfo');
})
const clientArray = [];
const getCurrentDate = () => {
    const newDate = new Date();
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const currentDate = `${year}-${formattedMonth}-${formattedDay}`;
    return currentDate;
  };


const submitnewInfo = () => {
    showElement('addNewInfo');
    let name = clientName.value;
    let currentDate = getCurrentDate();
    let amount = clientAmount.value;
    let returnDate = payDate.value;
    let interest = parseInt(amount * 0.35);
    let total = parseInt(amount * 1.35);
    let uniqueId = Date.now().toString();


    const clientInfoObj = {
        client:{
          name: name
        },
        details:[{
            id:{
                id: uniqueId,
                today: currentDate  
            },
            body:{
                today: currentDate,
                amount: amount,
                interest: interest,
                total: total,
                returnDate: returnDate
            }
        }],
        head:{
            date: 'Date',
            amount: "Amount",
            interest: "Interest",
            total: "Total",
            payon: "Pay On"
        }
    }
    clientArray.push(clientInfoObj);
    console.log(clientArray);
    displayName();
    hideElement("addInfo");
    showElement(nameBox);
    
};
let lastClickedIndex = null; // Use let instead of const
let lastDetailIndex = null;
const displayName = () => {
    nameBox.innerHTML = '';
    thead.innerHTML = '';
    tbody.innerHTML = ''; // Clear existing table headers and body
    tableName.innerHTML = '';

    clientArray.forEach((object, index) => {
        const nameDiv = document.createElement('div');
        nameDiv.textContent = object.client.name;
        nameBox.appendChild(nameDiv);

        nameDiv.addEventListener('click', () => {
            lastClickedIndex = index; // Update lastClickedIndex
            console.log(lastClickedIndex);


            const lastClickedClient = clientArray[lastClickedIndex];   
           lastDetailIndex = clientArray[lastClickedIndex].details;
            console.log("details", lastDetailIndex); 
            lastClickedClient.details.forEach((detail) => {
                lastDetailIndex =  lastClickedClient.detail;
                console.log("details", lastDetailIndex);
            });


            thead.innerHTML = '';
            tbody.innerHTML = '';
            tableName.innerHTML = '';
            showElement("table");
            hideElement("nameBox");
            tableName.textContent = object.client.name;
            
            const tr = document.createElement('tr');
            for (const headObj in object.head) {
                if (object.head.hasOwnProperty(headObj)) {
                    const th = document.createElement('th');
                    th.innerHTML = object.head[headObj];
                    tr.appendChild(th);
                    thead.appendChild(tr);
                }
            }

            object.details.forEach((detail) => {
                const trBody = document.createElement('tr');
                tbody.appendChild(trBody);
            
                for (const prop in detail.body) {
                    if (detail.body.hasOwnProperty(prop)) {
                        const td = document.createElement("td");
                        trBody.appendChild(td);
                        td.innerText = detail.body[prop];
                    }
                }
            });
        })
    });
};


updateInfo.addEventListener('click', () => {
    showElement("updateBox");
    hideElement("table");
    const lastClickedClient = clientArray[lastClickedIndex];    
    lastClickedClient.details.forEach((detail) => {
        const options = document.createElement('option');
        selectDate.appendChild(options);
        for (const prop in detail.id) {
            if (detail.id.hasOwnProperty(prop)) {
                console.log(detail.id[prop]);
                options.innerHTML = detail.id[prop];
            }
        }
    });
})

addLoan.addEventListener('click', ()=> {
    showElement("addInfo");
    hideElement('table');
    showElement('submitNewLoan');
    hideElement('submitnewInfo');
})

const submitNewLoan = () => {
    showElement('nameBox')
    let currentDate = getCurrentDate();
    let amount = clientAmount.value;
    let returnDate = payDate.value;
    let interest = parseInt(amount * 0.35);
    let total = parseInt(amount * 1.35);
    let uniqueId = Date.now().toString();

    // Create the new object
    const newObj = {
        id: {
            id: uniqueId,
            today: currentDate  
        },
        body: {
            today: currentDate,
            amount: amount,
            interest: interest,
            total: total,
            returnDate: returnDate
        }
    }

    // Check if a client has been clicked
    if (lastClickedIndex !== null) {
        // Push the new object into the details array of the last clicked client
        clientArray[lastClickedIndex].details.push(newObj);
        console.log(clientArray); // Print the updated clientArray
        displayName(); // Update the displayed table
    }
}