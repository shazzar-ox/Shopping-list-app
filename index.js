import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://real-time-database-36371-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)

const dataBAse = getDatabase(app)

const shoppingListDb = ref(dataBAse, "shoppingList") // creates a database called shopping list


// console.log(dataBAse)

// console.log(app)

onValue(shoppingListDb, function(snapshot)
{
    //console.log(snapshot.val())

    if(snapshot.exists())
    {
        clearShoppingList()
        let snapShotKeys = Object.entries(snapshot.val())
        snapShotKeys.sort(function(a,b) {return a[1].localeCompare(b[1])})
        ////console.log(snapShotKeys)
        //let fakeList = document.createElement('div')
    
        for (let  i=0; i < snapShotKeys.length; i++)
        {
            
            let currentItem = snapShotKeys[i]
           let listItem = document.createElement('li')
           let currentItemID = currentItem[0]
           let currentItemValue = currentItem[1]
           //listItem.textContent = snapShotKeys[i]
           listItem.textContent = currentItemValue
        
           //listItem.style.background= 'green'
           listItem.addEventListener('dblclick', function()
           {
            let exactLocationOfListItemInDb = ref(dataBAse,`shoppingList/${currentItemID}`)
            remove(exactLocationOfListItemInDb)
           })
        //    console.log(listItem)
           
        displayShoppingList.append(listItem)
           //console.log(fakeList.sort())
        }
       
      
    }
    else{
        displayShoppingList.style.color='green'
        displayShoppingList.style.fontSize = '27px'
      displayShoppingList.style.fontWeight = 'bolder'
        displayShoppingList.style.fontFamily = 'Rubik, sans-serif'
        displayShoppingList.style.textAlign = 'center'
        displayShoppingList.textContent= 'No item here ......yet'
        //displayShoppingList.innerHTML =`No item here ......yet`
    }
     //console.log(snapShotKeys)
})


const textEl= document.querySelector('#input-field')
const addButton = document.querySelector('#add-button')
const displayShoppingList = document.querySelector('#shopping-list')


textEl.addEventListener('keypress', function()
{
    if (event.key === 'Enter')
    {
        event.preventDefault()

        start()
    }
})

function start()
{
    let inputValue = textEl.value
    let modifiedInputValue = inputValue.replace(inputValue.charAt(0), inputValue.charAt(0).toUpperCase())
   
    push(shoppingListDb, modifiedInputValue)
    //listItems()
    clearText()
}

addButton.addEventListener('click', function ()
{
   start()
})

function clearText()
{
    textEl.value = ''
}

function clearShoppingList()
{
    displayShoppingList.textContent = ''
}

function listItems()
{
    let items = document.createElement('li')
    items.textContent = textEl.value
    displayShoppingList.append(items)
    
}


// let scrimbaUsers = {
//     "00": "sindre@scrimba.com",
//     "01": "per@scrimba.com",
//     "02": "frode@scrimba.com"
// }


// let scrimbaUsersNumber = Object.keys(scrimbaUsers)

// console.log(scrimbaUsersNumber)

// let scrimbaUSersMaill = Object.values(scrimbaUsers)

// console.log(scrimbaUSersMaill)

// let scrimbaUsersEntries = Object.entries(scrimbaUsers)

// console.log(scrimbaUsersEntries)

// console.log(scrimbaUsersEntries[0].splice().join())