const apiEP = "https://randomuser.me/api/?results=3";
const displayElm = document.getElementById("list")
let userList = [];

// 1. Create a function to call the api age fetch the data from ramdom user server
const fetchUsers = (url) => {
    try {
    //promise usimg fetch to get data from the server
        fetch(url) // makes api call
        .then((dt) =>{
            // console.log(dt);
            return dt.json(); // converts into object
        })
        //  2. Put the user array in the global variable
        .then((data) => {
            // console.log(data);
            userList = data.results; // object passing to the array
            // console.log(userList);
            display(userList);
        })
        .catch((error) => {
            console.log(error);
        });
        //async/await to fetch data from the server
    } catch (error) {
        console.log(error);
    }
};

fetchUsers(apiEP);

//  3. Create a function that will loop through the array and displays the content in the dom
const display = (users) => {
    // console.log(users, i);
    let str = "";

    users?.map((user, i) => {
        // console.log(user);
        str += `
        <div class="card flex-grow-1" style="width: 18rem; max-width: 36rem">
        <img src=${user.picture.medium} class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title"> ${user.name?.title + " " + user.name?.first + " " + user?.name.last}</h5>
        <div class="card-text">
            <ul class="list-unstyled">
                <li><i class="fa-solid fa-phone-volume"></i> ${user.phone} </li>
                <li> <i class="fa-solid fa-envelope"></i> ${user.email}</li>
                <li> <i class="fa-solid fa-address-book"></i> ${user.location.street.number} ${user.location.street.name}</li>
            </ul>
        </div>
        </div>
        </div>
        `
    })
    displayElm.innerHTML = str;
    document.querySelector("#counter").innerText = users.length + " users found!";
}

const handleOnGenderSelect = (e) => {
    // console.log(e);
    // console.log(e.value);
    const g = e.value;
    const url = apiEP + "&gender=" + g //https://randomuser.me/api/??results=3&gender=female
    // console.log(g);

    fetchUsers(url);
}

// Handeling the search function
document.getElementById("search").addEventListener("keyup", (e) =>{
    const value = e.target.value.toLowerCase();
    // console.log(value);
    // console.log(fullName);

    const filterArg = userList.filter((user) => {
        const fullName = (user.name.first + "" + user.name.last).toLowerCase();
        return fullName.includes(value); // True or False
    })
    display(filterArg);
})
;