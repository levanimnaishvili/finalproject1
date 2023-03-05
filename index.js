const url = 'https://bitbucket.org/hpstore/spacex-cargo-planner/raw/204125d74487b1423bbf0453f4dcb53a2161353b/shipments.json';
const shipmentlist = document.getElementById('shipmentlist');
const shipmentheader = document.getElementById('shipmentheader');
const contact = document.getElementById('contact');
const shipmentBox = document.getElementById('shipmentBox');
const shipmentBays = document.getElementById('shipmentBays');
const burger = document.getElementById('burger');
const search = document.getElementById('search')
const listContainer = document.getElementById('listContainer')
const shipmentContainer = document.getElementById('shipment-container')
const searchContainer = document.getElementById('searchContainer');
const span = document.getElementById("span");
let companies = [];


/*--move "fetch data"--*/
function fetchedData() {
    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        return data;
         
      })
      .catch((err) => alert(Error));
}
/*--move "cargo information on click function"--*/
async function moveInfo(){
    const shipmentDetails = await fetchedData();
    let orderboxes;
    companies = shipmentDetails.map((item)=>{
        const companyNames = document.createElement('li');
        companyNames.textContent = item.name;
        companyNames.addEventListener('click', () =>{
            shipmentheader.textContent = item.name;
            contact.textContent = item.email;
            shipmentBox.value = item.boxes;
            if(shipmentBox.value){
                let boxValue = item.boxes.split(',');
                const sum = boxValue.map(parseFloat).reduce((acc,curr) => acc + curr,0)
                orderboxes = Math.ceil(sum/10);
                return shipmentBays.innerHTML = orderboxes;
            }else{
                return shipmentBays.innerHTML = "No order, You can fill on your own";
            }
        })
        return companyNames;
    })
    shipmentlist.append(...companies);
};

moveInfo();

/*--move "make a change in shipmentbay if som1 add number in input"--*/

shipmentBox.addEventListener("input", (e) => {
    shipmentBays.innerText = shipmentBoxValue(e.target.value); 
});

function shipmentBoxValue(inputValue) {
    return Math.ceil(inputValue.split(",").reduce((acc, val) => +val + acc, 0) / 10);
}

/*--burger display for mobile--*/

burger.addEventListener('click', function(){
    burger.classList.toggle('is-active');
    if(burger.classList.contains('is-active')){
        listContainer.style.display = "block";
        searchContainer.style.display = "none";
        shipmentContainer.style.display = "none"
    }else{
        listContainer.style.display = "none";
        searchContainer.style.display = "block";
        shipmentContainer.style.display = "block";
        
    }
});

/*--search company and if it exists, show it function--*/
async function searchEngine(){
    const dataInfo = await fetchedData();
  
    search.addEventListener('input', () => {
      const searchTerm = search.value.toLowerCase();
      
      dataInfo.forEach((element) =>{
        const name = element.name.toLowerCase();
        if(name.includes(searchTerm)){
            shipmentheader.textContent = element.name;
            contact.textContent = element.email;
            shipmentBox.value = element.boxes;
      }
      })
    })
  }
  searchEngine();

/*--clear span from search if input is in and show it if its clear--*/
  search.addEventListener('mouseover', () =>{
    span.style.display = "none";
  })
  search.addEventListener("mouseleave", () =>{
    if(search.value){
        span.style.display = "none";
    }else{
        span.style.display = "inline";
    }
    
  })