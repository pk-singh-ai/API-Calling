let btn = document.querySelector("button")

let list = document.querySelector("ul")

let country = document.getElementById('country')
let state = document.getElementById('state')

let url = "http://universities.hipolabs.com/search?country=";

btn.addEventListener("click", () => {
    getclg();
    return;
})

function urlconvertor(country){
    let urlcountry = country.trim();

    return url+urlcountry;
}

async function getclg(){
    try{
        let newurl = urlconvertor(country.value)
        let data = await fetch(newurl);

        if(!data.ok){
            throw new Error(`response status - ${"weak Internet Connection"}`)
        }
        data = await data.json();
        list.innerHTML = "";
        let searchState = state.value.trim().toLowerCase();

        for(let uni of data){

            if( uni["state-province"] == undefined || uni["state-province"] == null) continue;
            let lowerState = uni["state-province"].toLowerCase();
            if(lowerState != searchState) continue;

            let li = document.createElement('li');
            li.innerHTML = `State-${uni["state-province"]}\tuniversity-${uni.name}`
            list.appendChild(li);
        }

        for(let uni of data){

            if(searchState == "") {
                let li = document.createElement('li');
                li.innerHTML = `State-${uni["state-province"]}\tuniversity-${uni.name}`
                list.appendChild(li);
            }
        }
    
    }
    catch (error){
        console.log(error.message);
    }
    
}
