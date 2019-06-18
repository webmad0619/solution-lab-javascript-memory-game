let memoryGame = new MemoryGame(cards);
memoryGame.shuffleCards()
let pairPicked = [];

document.addEventListener("DOMContentLoaded", function(event) { 
  let html = '';
  memoryGame.cards.forEach(function (pic) {
    html += '<div class="card" data-card-name="'+ pic.name +'">';
    html += '<div class="back" name="'+ pic.img +'"></div>';
    html += '<div class="front" style="background: url(img/'+ pic.img +') no-repeat"></div>';
    html += '</div>';
  });

  // Add all the div's to the HTML
  document.querySelector('#memory_board').innerHTML = html;

  // Bind the click event of each element to a function
  document.querySelectorAll('.back').forEach(function (card) {
    card.onclick = function () {
      if (card.classList[0] == "back") {
        card.parentElement.childNodes.forEach(childCard => {
          childCard.classList.toggle("back")
          childCard.classList.toggle("front")
        })
        pairPicked.push(card)
        if (pairPicked.length === 2) {
          if (memoryGame.checkIfPair(pairPicked[0].outerHTML, pairPicked[1].outerHTML)) {
            document.getElementById('pairs_guessed').innerHTML = memoryGame.pairsGuessed
            pairPicked = [];
          } else {
            setTimeout(()=>{
              pairPicked.forEach(card => {
                card.parentElement.childNodes.forEach(childCard => {
                  childCard.classList.toggle("back")
                  childCard.classList.toggle("front")
                })
              })
              pairPicked = [];
            },1000)
          }
          document.getElementById('pairs_clicked').innerHTML = memoryGame.pairsClicked
        }
      }
    };
  });
})
