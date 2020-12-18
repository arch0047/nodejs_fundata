const getData = document.querySelector('.btn-primary');
let myData = [];


getData.addEventListener('click', function (event){
    event.preventDefault();
    renderHTML(myData);
});


async function loadData(){
    const response = await fetch("https://official-joke-api.appspot.com/jokes/ten");
    const apiData  = await response.json();
    return apiData;
}

document.addEventListener("DOMContentLoaded", async()=>{

    try {
        myData = await loadData();
    } catch(e)
    {
        console.log('Error happened while loading the data !');
        console.log(e);
    }
  });

    function renderHTML(myData)
    {
        const mainContainer = document.getElementById("myData");
        for (let i = 0; i < myData.length; i++) {
            const div = document.createElement("div");
            div.innerHTML = 'JOKE->' + myData[i].setup + ' PUNCHLINE->' + myData[i].punchline;
            mainContainer.appendChild(div);
       }
    }