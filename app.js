let cards = document.querySelectorAll('.cardinside')
let firstClick = false
let PairsofCard = []

cards.forEach((card)=>{
    card.state = 'unclicked'
})

RandomDraw()

for(let i=0; i<cards.length; i++){
    cards[i].addEventListener('click',()=>{
        if(!firstClick){time()}
        firstClick = true        

        if(cards[i].state == 'unclicked'){
            cards[i].style.transform = 'rotateY(180deg)'
            cards[i].state = 'clicked'
            PairsofCard.push(cards[i])
            CheckPaired()
        }

        else if(cards[i].state == 'clicked'){
            cards[i].style.transform = 'rotateY(0deg)'
            cards[i].state = 'unclicked'
            PairsofCard = []
        }
    })
}

function CheckPaired(){
    if(PairsofCard.length==2){
        if(PairsofCard[0].querySelector('img').src==PairsofCard[1].querySelector('img').src){
            matched()
        }
        else{
            unmatched(PairsofCard[0],PairsofCard[1])
        }
    }  
}

function matched(){
    PairsofCard[0].state='blocked'
    PairsofCard[1].state='blocked'
    PairsofCard = []
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
    PairsofCard[0].state = 'blocked'
    PairsofCard[1].state = 'blocked'
    PairsofCard = []
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

function RandomDraw(){
    let images = document.querySelectorAll('img')
    let srcs = ['assets/dog1.jpg','assets/dog2.jpg','assets/dog3.jpg','assets/dog4.jpg','assets/dog5.png','assets/dog6.png','assets/dog1.jpg','assets/dog2.jpg','assets/dog3.jpg','assets/dog4.jpg','assets/dog5.png','assets/dog6.png']
    
    for(let i=srcs.length-1; i>0; i--){
        let RD = Math.floor(Math.random() * i)
        let store = srcs[i]
        srcs[i] = srcs[RD]
        srcs[RD] = store
      }
      
      for(let i=0; i<images.length; i++){
          images[i].src = srcs[i]
      }
}

