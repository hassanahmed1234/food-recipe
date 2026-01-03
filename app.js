console.log('javascript');

let searchbtn = document.querySelector('#searchbtn')


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
   let {title,image_url,id} = elem
    // console.log(elem);
    card = ` <div id="${id}" class="dish">
            <div class="left">
                <img src="${image_url}" alt="">
            </div>
            <div class="nameright">
                <p>${title}</p>
                <p>a</p>
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

        tareeqaUI(result)
        
    })
    
})
let img = document.querySelector('#img')
let heading = document.querySelector('#title')
let tareeqa = document.querySelector('#tareeqa')
let li = ""

function tareeqaUI(res){
  let {data} = res
  let {recipe} = data
  let {title,image_url,ingredients} = recipe

  console.log(image_url);
  
  img.src = image_url
    heading.textContent = title

    ingredients.forEach((elem)=>{
       let {description,quantity,unit} = elem
      let finalqty =  quantity ?? 0
       li = `<li>${description}    ==>   ${finalqty}</li>`
       tareeqa.innerHTML += li
    })
}
