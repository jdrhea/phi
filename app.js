document.addEventListener('DOMContentLoaded', () =>  {
  const gridDisplay = document.querySelector('.grid')
  const scoreDisplay = document.getElementById('score')
  const resultDisplay = document.getElementById('result')
  let squares = []
  let fibSeq = [1,1,2,3,5,8,13,21,34,55,89,144,233,377,610,987]
  const width = 4
  let score = 0
  let combine = new Audio('click6.mp3');


  //create the playing board
  function createBoard() {
    for (let i=0; i < width*width; i++) {
      square = document.createElement('div')
      square.innerHTML = 0
      gridDisplay.appendChild(square)
      squares.push(square)
    }
    generate()
    generate()
  }
  createBoard()

  //generate a new number
  function generate() {
    randomNumber = Math.floor(Math.random() * squares.length)
    if (squares[randomNumber].innerHTML == 0) {
      squares[randomNumber].innerHTML = 1
      checkForGameOver()
    } else generate()
  }

  function moveRight() {
    for (let i=0; i < 16; i++) {
      if (i % 4 === 0) {
        let totalOne = squares[i].innerHTML
        let totalTwo = squares[i+1].innerHTML
        let totalThree = squares[i+2].innerHTML
        let totalFour = squares[i+3].innerHTML
        let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

        let filteredRow = row.filter(num => num)
        let missing = 4 - filteredRow.length
        let zeros = Array(missing).fill(0)
        let newRow = zeros.concat(filteredRow)

        squares[i].innerHTML = newRow[0]
        squares[i +1].innerHTML = newRow[1]
        squares[i +2].innerHTML = newRow[2]
        squares[i +3].innerHTML = newRow[3]
      }
    }
  }

  function moveLeft() {
    for (let i=0; i < 16; i++) {
      if (i % 4 === 0) {
        let totalOne = squares[i].innerHTML
        let totalTwo = squares[i+1].innerHTML
        let totalThree = squares[i+2].innerHTML
        let totalFour = squares[i+3].innerHTML
        let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

        let filteredRow = row.filter(num => num)
        let missing = 4 - filteredRow.length
        let zeros = Array(missing).fill(0)
        let newRow = filteredRow.concat(zeros)

        squares[i].innerHTML = newRow[0]
        squares[i +1].innerHTML = newRow[1]
        squares[i +2].innerHTML = newRow[2]
        squares[i +3].innerHTML = newRow[3]
      }
    }
  }


  function moveUp() {
    for (let i=0; i < 4; i++) {
      let totalOne = squares[i].innerHTML
      let totalTwo = squares[i+width].innerHTML
      let totalThree = squares[i+(width*2)].innerHTML
      let totalFour = squares[i+(width*3)].innerHTML
      let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

      let filteredColumn = column.filter(num => num)
      let missing = 4 - filteredColumn.length
      let zeros = Array(missing).fill(0)
      let newColumn = filteredColumn.concat(zeros)

      squares[i].innerHTML = newColumn[0]
      squares[i +width].innerHTML = newColumn[1]
      squares[i+(width*2)].innerHTML = newColumn[2]
      squares[i+(width*3)].innerHTML = newColumn[3]
    }
  }

  function moveDown() {
    for (let i=0; i < 4; i++) {
      let totalOne = squares[i].innerHTML
      let totalTwo = squares[i+width].innerHTML
      let totalThree = squares[i+(width*2)].innerHTML
      let totalFour = squares[i+(width*3)].innerHTML
      let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

      let filteredColumn = column.filter(num => num)
      let missing = 4 - filteredColumn.length
      let zeros = Array(missing).fill(0)
      let newColumn = zeros.concat(filteredColumn)

      squares[i].innerHTML = newColumn[0]
      squares[i +width].innerHTML = newColumn[1]
      squares[i+(width*2)].innerHTML = newColumn[2]
      squares[i+(width*3)].innerHTML = newColumn[3]
    }
  }

  function combineRow() {
    for (let i =0; i < 15; i++) {
      let fib1 = parseInt(squares[i].innerHTML)
      let fib2 = parseInt(squares[i +1].innerHTML)
      if (canAdd(fib1, fib2) || canAdd(fib2, fib1)) {
        let combinedTotal = fib1 + fib2
        squares[i].innerHTML = combinedTotal
        squares[i +1].innerHTML = 0
        score = calcScore()
        combine.play()
        scoreDisplay.innerHTML = score
      }
    }
    checkForWin()
  }

  function combineColumn() {
    for (let i =0; i < 12; i++) {
      let fib1 = parseInt(squares[i].innerHTML)
      let fib2 = parseInt(squares[i +width].innerHTML)
      if (canAdd(fib1, fib2) || canAdd(fib2, fib1)) {
        let combinedTotal = fib1 + fib2
        squares[i].innerHTML = combinedTotal
        squares[i +width].innerHTML = 0
        score = calcScore()
        combine.play()
        scoreDisplay.innerHTML = score
      }
    }
    checkForWin()
  }

  //assign functions to keyCodes
  function control(e) {
    if(e.keyCode === 37) {
      keyLeft()
    } else if (e.keyCode === 38) {
      keyUp()
    } else if (e.keyCode === 39) {
      keyRight()
    } else if (e.keyCode === 40) {
      keyDown()
    }
  }

  function touchStartControl(e){
    touchstartX = e.changedTouches[0].screenX;
    touchstartY = e.changedTouches[0].screenY;
  }

  function touchEndControl(e){
    touchendX = e.changedTouches[0].screenX;
    touchendY = e.changedTouches[0].screenY;
    handleGesture();
  }

  document.addEventListener('keyup', control)
  document.getElementsByClassName("grid")[0].addEventListener('touchstart', touchStartControl, false);
  document.getElementsByClassName("grid")[0].addEventListener('touchend', touchEndControl, false);

  function handleGesture() {
    let touchsizeX = touchendX - touchstartX
    let touchsizeY = touchendY - touchstartY

    if(Math.abs(touchsizeX) > Math.abs(touchsizeY)){
      if (touchendX < touchstartX) {
        keyLeft()
      }

      if (touchendX > touchstartX) {
        keyRight()
      }
    } else {
      if (touchendY < touchstartY) {
        keyUp()
      }

      if (touchendY > touchstartY) {
        keyDown()
      }
    }
  }

  function keyRight() {
    moveRight()
    combineRow()
    moveRight()
    generate()
  }

  function keyLeft() {
    moveLeft()
    combineRow()
    moveLeft()
    generate()
  }

  function keyUp() {
    moveUp()
    combineColumn()
    moveUp()
    generate()
  }

  function keyDown() {
    moveDown()
    combineColumn()
    moveDown()
    generate()
  }

  //check for the number 2048 in the squares to win
  function checkForWin() {
    for (let i=0; i < squares.length; i++) {
      if (squares[i].innerHTML == 987) {
        resultDisplay.innerHTML = 'You WIN';
        var element = document.getElementById("fireworks");
        element.classList.add("before");
        document.removeEventListener('keyup', control)
        document.getElementsByClassName("grid")[0].removeEventListener('touchstart',touchStartControl)
        document.getElementsByClassName("grid")[0].removeEventListener('touchend',touchEndControl)
        setTimeout(() => clear(), 3000)
      }
    }
  }

  //check if there are no zeros on the board to lose
  function checkForGameOver() {
    let zeros = 0
    for (let i=0; i < squares.length; i++) {
      if (squares[i].innerHTML == 0) {
        zeros++
      }
    }
    let rowAdds = 0
    // loop through all the rows to see if there are two numbers to add
    for (let i =0; i < 15; i++) {
      let fib1 = parseInt(squares[i].innerHTML)
      let fib2 = parseInt(squares[i +1].innerHTML)
      if (canAdd(fib1, fib2) || canAdd(fib2, fib1)) {
        rowAdds++
      }
    }
    let colAdds = 0
    // loop through all the columns to see if there are two numbers to add
    for (let i =0; i < 12; i++) {
      let fib1 = parseInt(squares[i].innerHTML)
      let fib2 = parseInt(squares[i +width].innerHTML)
      if (canAdd(fib1, fib2) || canAdd(fib2, fib1)) {
        colAdds++
      }
    }
    if (zeros === 0 && rowAdds === 0 && colAdds === 0) {
      resultDisplay.innerHTML = 'Game Over'
      document.removeEventListener('keyup', control)
      setTimeout(() => clear(), 3000)
    }
  }

  // this function will return true
  // when fib1 and fib2 are consecutive 
  // numbers in the fib sequence
  function canAdd(fib1,fib2) {
    for(let i=0;i<fibSeq.length;i++){
      if (fibSeq[i] === fib1 && fibSeq[i+1]===fib2){
        return true
      } 
    }
    return false
    
  }

  function calcScore(){
    var highestVal = 0;
    var highestValIndex = -1;
    var result = 0;
    var resultString = "";
    // find square with highest value
    for(let i=0;i<squares.length;i++){
      let fib = parseInt(squares[i].innerHTML)
      if (fib > highestVal){
        highestVal = fib
      }
    }
    // find index in fibSeq that corresponds to highest value
    for(let i=0;i<fibSeq.length;i++){
      if (fibSeq[i] == highestVal){
        highestValIndex = i
      }
    }
    if (highestVal > 0){
      result = fibSeq[highestValIndex]/fibSeq[highestValIndex-1]
      resultString = fibSeq[highestValIndex].toString() + "/" + fibSeq[highestValIndex-1].toString() + " = " + result.toFixed(6)
    }
    return resultString
  }

  //clear timer
  function clear() {
    clearInterval(myTimer)
  }


  //add colours
  function addColours() {
    for (let i=0; i < squares.length; i++) {
      if (squares[i].innerHTML == 0) squares[i].style.backgroundColor = '#afa192'
      else if (squares[i].innerHTML == 1) squares[i].style.backgroundColor = '#eee4da'
      else if (squares[i].innerHTML  == 1) squares[i].style.backgroundColor = '#ede0c8' 
      else if (squares[i].innerHTML  == 2) squares[i].style.backgroundColor = '#f2b179' 
      else if (squares[i].innerHTML  == 3) squares[i].style.backgroundColor = '#ffcea4' 
      else if (squares[i].innerHTML  == 5) squares[i].style.backgroundColor = '#e8c064' 
      else if (squares[i].innerHTML == 8) squares[i].style.backgroundColor = '#ffab6e' 
      else if (squares[i].innerHTML == 13) squares[i].style.backgroundColor = '#fd9982' 
      else if (squares[i].innerHTML == 21) squares[i].style.backgroundColor = '#ead79c' 
      else if (squares[i].innerHTML == 34) squares[i].style.backgroundColor = '#76daff' 
      else if (squares[i].innerHTML == 55) squares[i].style.backgroundColor = '#beeaa5' 
      else if (squares[i].innerHTML == 89) squares[i].style.backgroundColor = '#d7d4f0' 
      else if (squares[i].innerHTML == 144) squares[i].style.backgroundColor = '#d7d4f0'
      else if (squares[i].innerHTML == 233) squares[i].style.backgroundColor = '#d7d4f0'
      else if (squares[i].innerHTML == 377) squares[i].style.backgroundColor = '#d7d4f0'
      else if (squares[i].innerHTML == 610) squares[i].style.backgroundColor = '#d7d4f0'  
      else if (squares[i].innerHTML == 987) squares[i].style.backgroundColor = '#d7d4f0'
      
    }
}
addColours()

var myTimer = setInterval(addColours, 50)

})
