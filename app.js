let cards = document.querySelectorAll('.card_inner')
let firstClick = false
let cardPair = []

cards.forEach((card)=>{
    card.state = 'unclicked'
})

shuffle()

for(let i=0; i<cards.length; i++){
    cards[i].addEventListener('click',()=>{
        if(!firstClick){time()}
        firstClick = true        

        if(cards[i].state == 'unclicked'){
            cards[i].style.transform = 'rotateY(180deg)'
            cards[i].state = 'clicked'
            cardPair.push(cards[i])
            check()
        }

        else if(cards[i].state == 'clicked'){
            cards[i].style.transform = 'rotateY(0deg)'
            cards[i].state = 'unclicked'
            cardPair = []
        }
    })
}

function check(){
    if(cardPair.length==2){
        if(cardPair[0].querySelector('img').src==cardPair[1].querySelector('img').src){
            matched()
        }
        else{
            unmatched(cardPair[0],cardPair[1])
        }
    }  
}

function matched(){
    cardPair[0].state='blocked'
    cardPair[1].state='blocked'
    cardPair = []
    let score = document.querySelector('#score').innerHTML
    score++
    document.querySelector('#score').innerHTML = score
}

function unmatched(x,y){
    setTimeout(()=>{
        x.state = 'unclicked'
        y.state = 'unclicked'
        x.style.transform = "rotateY(0deg)"
        y.style.transform = "rotateY(0deg)"
    },750)
    cardPair[0].state = 'blocked'
    cardPair[1].state = 'blocked'
    cardPair = []
}

function time(){
    let secs = 0
    let mins = 0
    let SS
    let MM
    setInterval(()=>{
        secs++
        if(secs==60){secs=0; mins++}

        secs<10?SS=`0${secs}`:SS=`${secs}`
        mins<10?MM=`0${mins}`:SS=`${mins}`
        
        document.querySelector('#time').innerHTML = `${MM}:${SS}`
    }, 1000)
}

function shuffle(){
    let images = document.querySelectorAll('img')
    let srcs = ['assets/dog1.jpg','assets/dog2.jpg','assets/dog3.jpg','assets/dog4.jpg','assets/dog5.png','assets/dog6.png','assets/dog8.png','assets/dog9.png','assets/dog10.png','assets/dog11.png','assets/dog12.png','assets/dog13.jpg','assets/dog5.png','assets/dog6.png']
    
    for(let i=srcs.length-1; i>0; i--){
        let j = Math.floor(Math.random() * i)
        let temp = srcs[i]
        srcs[i] = srcs[j]
        srcs[j] = temp
      }
      
      for(let i=0; i<images.length; i++){
          images[i].src = srcs[i]
      }
}
