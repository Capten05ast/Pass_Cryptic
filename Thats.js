// PROMPT TO CHAT GPT
// 1. give me a text for greeting users who visit my password manager.
// 2. give me an svg for copy button
// copy the svg given by chat gpt and paste it into copy.svg file
// 3. give me an img tag to embeed this copy.svg . 
// It should have an onclick attribute which executes a function called 
// copyText 
// 4. please insert copy logic properly in copyText


// COPY TABLE FROM CODE CWH
// just search html tables and copy table code and style it
// copy basic table structure


// COPY FORMS FROM CWH
// HTML -> HTML forms -> intro to html forms -> HTML forms structure 
// -> copy the code


// NAVIGATOR COPY API JS (for copy function):-
// search for it on google 
// -> mdn docs
// -> readtext() -> writetext()


// WHERE TO CHECK STORED PASSWORD
// In line of console -> Application -> local storage -> file -> here are your passwords


// NO NESTED BACKTICKS
// inside backticks to use backticks, you can use single or double quotes





// TO HIDE THE PASSWORD ON FRONT SCREEN
function maskPassword(pass) {
    let str = "";
    for (let index = 0; index < pass.length; index++) {
        str += "*";
    } 
    return str
}





// CODE TO COPY TEXT 
// copied from chat gpt and modified later
function copyText(txt) {

    navigator.clipboard.writeText(txt).then (
        () => {
            alert("copied the text: " + txt);

            document.getElementById("alert").style.display = "inline";

            setTimeout( () => {
                document.getElementById("alert").style.display = "none";
            }, 2000)

        },
        () => {
            alert("copying failed");
        }
    );
}






// DELETE PASSWORD
// here website is parameter and not argument
const deletePassword = (website) => {
    let data = localStorage.getItem("passwords");
    
    // Parse the stored data to manipulate it
    let arr = JSON.parse(data);
    console.log(arr);
    
    // Use .filter() to remove the entry with the given website
    arrUpdated = arr.filter((e) => {
        // e represents each element in the array
        // Keep only the elements where e.website does NOT match the given website
        return e.website != website;
    });

    // Update localStorage with the filtered array
    localStorage.setItem("passwords", JSON.stringify(arrUpdated));
    
    // Show success message
    alert(`Successfully deleted ${website}'s password`);

    // Refresh the table to show updated data
    showPasswords();
};





// LOGIC TO FILL THE TABLE 
// -> copy one <tr> tag
const showPasswords = () => {
    let tb = document.querySelector("table");
    let data = localStorage.getItem("passwords");
    
    // WRONG: Checking for null but not handling empty array case properly
    // if (data == null || data.length == 0) {
    
    // CORRECT: Check for both null and empty array
    if (data == null || JSON.parse(data).length == 0) {
        tb.innerHTML = "No Data To Show";
    }
    else {
        // WRONG: The table header was not cleared and reset before adding rows
        // tb.innerHTML = tb.innerHTML + str;
        
        // CORRECT: Reset the table HEADER before adding rows
        tb.innerHTML = `<tr class="t1">
            <th class="t1"> website </th>
            <th class="t1"> username </th>
            <th class="t1"> password </th>
            <th class="t1"> Delete </th>
        </tr>`;

        let arr = JSON.parse(data);  // Parse the stored JSON data
        let str = "";

        // WRONG: Not using the 'website' field while adding the new entry
        // str += 
        // `<tr class="t1">
        // <td class="t1">${element.username}</td>
        // <td class="t1">${element.password}</td>
        // </tr>`;
        
        // CORRECT: Include the 'website' field in the table rows
        // REMEMBER: {PASS: 123, USER: 123, WEBSITE: 123} is one element of array at particular nth index
        // passwords is a key this whole array is a value
        // PASS, USER, WEBSITE is a key and 123, 123, 123 is a value
        // Its nested keve values

        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];

            // WATCH CAREFULLY $ SIGNS AND BACKTICKS
            // img tag picked from chat gpt except the argument passed inside onclick function
            str += 
            `<tr class="t1">
                <td class="t1">${element.website}  &nbsp;&nbsp;  <img class="copyBtn" src="copy.svg" alt="Copy Button" onclick="copyText('${element.website}')" style="cursor: pointer;" width="24" height="24"> </td>
                <td class="t1">${element.username}  &nbsp;&nbsp;  <img class="copyBtn" src="copy.svg" alt="Copy Button" onclick="copyText('${element.username}')" style="cursor: pointer;" width="24" height="24"> </td>
                <td class="t1">${maskPassword(element.password)}  &nbsp;&nbsp;  <img class="copyBtn" src="copy.svg" alt="Copy Button" onclick="copyText('${element.password}')" style="cursor: pointer;" width="24" height="24"> </td>
                <td class="t1"> <button class="btnD" onclick="deletePassword('${element.website}')"> Delete </button> </td>
            </tr>`;
        }
        // Add the generated rows to the table
        tb.innerHTML = tb.innerHTML + str;
    }

    // Clear the input fields after the operation in html body
    // SO THAT NEXT TIME IT CAN BE UTILIZED (just for display)
    website.value = "";
    username.value = "";
    password.value = "";
}





// UNDERSTANDING LOCAL STORAGE WORKING
console.log("working");
// at the starting show passwords
showPasswords();

document.querySelector(".btn").addEventListener("click", (e) => {
    e.preventDefault();
    console.log("clicked");
    console.log(website.value, username.value, password.value);

    let passwords = localStorage.getItem("passwords");
    console.log(passwords);

    if (passwords == null) {
        let json = [];

        json.push({website: website.value, username: username.value, password: password.value});
        alert("Password Saved");
        localStorage.setItem("passwords", JSON.stringify(json));
    } else {
        let json = JSON.parse(passwords); // Fixed the parsing
        json.push({website: website.value, username: username.value, password: password.value});
        alert("Password Saved");
        localStorage.setItem("passwords", JSON.stringify(json));
    }

    // At every click on submit, show passwords
    showPasswords();
});






