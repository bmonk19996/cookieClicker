let breadTotal = 0
let breadAddedPerSec = 0
let itemCount = 0
let resRateForItem = 1
let itemCost = 5
let itemLimit = 10
//new item names can be added or removed but must have at least one in the list without any other changes
const itemNames = ['Bread Pan','Oven','Cooling Rack']
const myItems = []

const shop = document.getElementById('shop')
const breadImg = document.getElementById('bread')
const breadCount = document.getElementById('bread-count')
const nextItemCost = document.getElementById('next-item-cost')
const breadRate = document.getElementById('bread-rate')
//check if a button was clicked and remove cost and update and display item counter and breadRate
function shopClicker(clickEvent){
    myButton = clickEvent.target
    if(myButton.matches('button')){
        let index = myButton.classList[0]
        let myItem = myItems[index]
        let myCost = myItem.cost

        if(breadTotal >= myCost){        
            //update the count of the item   
            myItem.counter.innerText++
            //update the bread per second
            const myResRate = myItem.rate
            breadAddedPerSec = breadAddedPerSec + myResRate
            breadRate.innerText = breadAddedPerSec
            //remove cost from bread total
            breadTotal = breadTotal - myCost
            breadCount.innerText =  breadTotal
        }
    }
}

//increment and display total bread
function breadClicker(){
    breadTotal++
    breadCount.innerText =  breadTotal
}
//set the next item cost for the first item
nextItemCost.innerText = itemCost
//increment and display the bread cost and display new items
function addBread(){
    breadTotal += breadAddedPerSec
    breadCount.innerText =  breadTotal
    if(breadTotal >=itemCost){
        //item limit is hard coded at the top and is arbitrary
        if(itemCount >= itemLimit){
            nextItemCost.innerText = 'all items unlocked'
        }
        else{
            //create new items when they can be purchased if somehow 
            //multiple new items are available only one will be created per second
            createItem()
            nextItemCost.innerText = itemCost
        }
    }

}

//create a new item with dynamic values
function createItem(){
    if(itemCount <=itemLimit){  
    const newItem = document.createElement('article')
    newItem.classList.toggle('item')
    const newName = document.createElement('span')
    const newRate = document.createElement('span')
    const newCost = document.createElement('span')
    const newButton = document.createElement('button')    
    newButton.classList.toggle(itemCount)
    const newCount = document.createElement('span')
    //combine the html items into an item
    newItem.appendChild(newName)
    newItem.appendChild(newRate)
    newItem.appendChild(newCost)
    newItem.appendChild(newButton)
    newItem.appendChild(newCount)
    //attach the new item to the bottom of the shop
    shop.appendChild(newItem)
    //store items created in an array for easy access and prevent html edits from effecting the game
    let newMyItem = {
        rate: resRateForItem,
        cost: itemCost,
        counter: newCount
    }
    myItems.push(newMyItem)
    //fills in html objects 
    //with newName it rounds the item count up to start the count mk 1 for every name then mk 2 and so on
    newName.innerText = `${itemNames[itemCount % itemNames.length]} mk${Math.ceil((itemCount + 1) /itemNames.length)}`
    newRate.innerText = resRateForItem
    newCost.innerText = itemCost
    newButton.innerText = 'buy'
    newCount.innerText = 0

    //update variables for the next item
    //the change to item cost and generation rate 
    //are arbitrary and can be changed here
    itemCount++
    resRateForItem = resRateForItem * 5
    itemCost *= 5
    }
}

shop.addEventListener('click', shopClicker)
breadImg.addEventListener('click', breadClicker)
setInterval(addBread, 1000)

