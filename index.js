//creating span for each letter on the right side dynamically
let letters="abcdefghijklmnopqrstuvwxyz";
let arrOfLetters = Array.from(letters);
let rightContainer=document.querySelector(".right-container");

arrOfLetters.forEach(letter =>{

    let span=document.createElement("span");
    span.classList.add("letter-box");
    span.innerHTML=letter;
    rightContainer.appendChild(span);
})

//mini database for the game
let words={

    programming : ["javascript","html","css","python"],

    animals : ["lion", "duck", "tiger","frog","camel"],

    names :["albert einestin","chris brown","mohamed salah"]
}

//extracting a random word from words object
let arrOfCateg =Array.from(Object.keys(words));
let randomCategNum=Math.floor(Math.random() * arrOfCateg.length);
let randomCateg = arrOfCateg[randomCategNum];
let randomElemNum=Math.floor(Math.random() * words[randomCateg].length);
let randomWord=words[randomCateg][randomElemNum];
let chosenWordArr= Array.from(randomWord);

document.querySelector(".category span").innerHTML=randomCateg;

//creating span for each letter of the chosen word at the bottom
chosenWordArr.forEach((chosenletter) => {
    let textSpan=document.createElement("span");
    textSpan.classList.add(`text-span`);
    document.querySelector(".bottom-bottom-container").appendChild(textSpan);

    if(chosenletter ===" "){

        textSpan.classList.add("with-space")

    }

})

//handling letter buttons and wrong attempts drawing
let letterButton=Array.from(document.querySelectorAll(".letter-box"));
let guessSpans=document.querySelectorAll(".text-span");
let flag;
let wrongAttempts=0;

letterButton.forEach((button) => {
    
    button.addEventListener("click",function() {
        flag=false;
    let letter=button.innerHTML;
    button.classList.add("clicked") 
    
    chosenWordArr.forEach( (wordLetter,wIndex) => {
        
        if(letter===wordLetter)
        {
            flag=true;
            guessSpans.forEach((span,sIndex) =>{
                if(wIndex===sIndex){

                span.innerHTML=letter;
                }
            })

        }


    })

    

    if (flag===false){

        document.querySelector(".draw").classList.add(`wrong-${wrongAttempts}`);
        wrongAttempts++;
        if(wrongAttempts>8)
        {
            checker();
            letterButton.forEach(b =>{
            b.classList.add("finished")
            })
        }
    }

});})

//handling hint button
let hintButton=document.querySelector(".hint");
let hints=3;
let tRand=[]
hintButton.addEventListener("click",() => {
    hints--;
    hintButton.innerHTML="HINT x"+hints
    let randomvalue=Math.floor(Math.random() * guessSpans.length);

    const checkRandoms=()=>{
    if(!(randomvalue in tRand))
    {
        tRand.push(randomvalue)
    }
    else{
        randomvalue=Math.floor(Math.random()*randomvalue)
        tRand.push(randomvalue)
    }
    }
    
    checkRandoms()
    len=tRand.length
    guessSpans.forEach((ele,i)=>{

        if(i==randomvalue){
            if(chosenWordArr[tRand[len-1]]==" ")
            {
                tRand[len-1]++
            }

            ele.innerHTML=chosenWordArr[tRand[len-1]]
        }
    })

    



    if(hints<=0)
    {
        hintButton.classList.add("finished")
    }
})
function checker(){

    alert(`Game Over The Word Is ${randomWord}`);

}
