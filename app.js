console.log('javascript');

let searchbtn = document.querySelector('#btn')


searchbtn.addEventListener('click',()=>{
    let input = document.querySelector('input')
console.log(input.value);
fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${input.value}`).then((result)=>{
    return result.json()
}).then((result)=>{
    console.log(result);

    recipeUI(result)
    
})

})

let card = ""
let recipeleft = document.querySelector('.recipeleft')

function recipeUI(res){
 let localrecipes =  JSON.parse(localStorage.getItem('recipes')) || []
  let {data} =  res
  let {recipes} =  data
  localrecipes.push(recipes)

console.log(localrecipes);
localStorage.setItem('recipes',JSON.stringify(recipes))
renderload()

 
}
renderload()
function renderload(){
     recipeleft.innerHTML = ""
    let localrecipes =  JSON.parse(localStorage.getItem('recipes')) || []

     localrecipes.forEach((elem) => {
   let {title,image_url,id,publisher} = elem
   
    // console.log(elem);
    card = ` <div id="${id}" class="dish">
            <div class="left">
                <img src="${image_url}" alt="">
            </div>
            <div class="nameright">
                <p>${title}</p>
                <p>${publisher}</p>
            </div>
        </div>`
        recipeleft.innerHTML += card
  });
}
recipeleft.addEventListener('click',(e)=>{
    console.log('hehe');
    let elemId = e.target.parentElement.parentElement.id
    fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${elemId}`).then((result)=>{
        return result.json()
    }).then((result)=>{
        console.log(result);

        
        let {data} = result
        let {recipe} = data
        console.log(recipe);
        localStorage.setItem('tareeqa',JSON.stringify(recipe))
        tareeqaUI()
    })
    
})
let img = document.querySelector('#img')
let heading = document.querySelector('#title')
let tareeqa = document.querySelector('#tareeqa')

tareeqaUI()
function tareeqaUI(res){
  let localtareeqa =  JSON.parse(localStorage.getItem('tareeqa'))
   let {title,image_url,ingredients} = localtareeqa

  
  img.src = image_url
    heading.textContent = title

    ingredients.forEach((elem,idx)=>{
       let {description,quantity,unit} = elem
      let finalqty =  quantity ?? 0
      let li = document.createElement('div')
       li.innerHTML = `<div>${idx}- ${description} (${finalqty})</div>`
       li.classList.add('divLi')
       tareeqa.appendChild(li)
    })
}
