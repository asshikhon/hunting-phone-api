const loadPhone = async (searchText=13, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data =await res.json()
    const phones = data.data;
    // console.log(phones)
displayPhones(phones, isShowAll)

}

const displayPhones = (phones, isShowAll) => {
// console.log(phones);

const phoneContainer = document.getElementById('phone-container');
// clear phone container before adding new card
phoneContainer.textContent = ''

// display show all btn if there are more than 12 phone
const showAllContainer = document.getElementById('show-all-container')
if(phones.length > 12 && !isShowAll){
    showAllContainer.classList.remove('hidden')
}else{
    showAllContainer.classList.add('hidden')
}
// display show 
if(!isShowAll){
    phones = phones.slice(0,12);
}

phones.forEach(phone =>{
    // console.log(phone);


    // 2. create a div 
    const phoneCard = document.createElement('div');
    phoneCard.classList = `card p-4 bg-gray-100 shadow-xl`;
    // 3.set innerhtml
    phoneCard.innerHTML = `
    <figure><img src="${phone.image}" alt="Shoes" /></figure>
    <div class="card-body">
      <h2 class="card-title">${phone.
        phone_name}</h2>
      <p>${phone.slug}</p>
      <div class="card-actions justify-center">
        <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
      </div>
    </div>
    `;
    // 4. append child

    phoneContainer.appendChild(phoneCard)

})
// hide loading spinner
togleLoadingSpinner(false);


}

// show details
const handleShowDetail =async (id) => {
// load single phone data
const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
const data = await res.json()
// console.log(data);
const phone = data.data;
showPhoneDetails(phone)

}

// show phone details
const showPhoneDetails = (phone) =>{
    const phoneName = document.getElementById('phone-name');
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
    <img src="${phone.image}" alt="" />
    <P> <span>Storage:</span>${phone?.mainFeatures?.storage} </P>
<p><span>Gps:</span>${phone?.others?.GPS || 'Not Available'}</p>
    `
// show the modal
show_details_modal.showModal()
}

// handle search btn
const handleSearch = (isShowAll) =>{
    togleLoadingSpinner(true)
    const searchText = document.getElementById('input-field').value;
console.log(searchText);
loadPhone(searchText, isShowAll);
}

// handle search recap

const togleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner')
    if(isLoading){
        loadingSpinner.classList.remove('hidden')
    }
    else{
        loadingSpinner.classList.add('hidden')
    }
}

// show all btn
const handleShowAll = () =>{
    handleSearch(true);
}


loadPhone()