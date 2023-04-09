const btnPlay = document.querySelector(".play")
const btnPause = document.querySelector(".pause")
const btnStop = document.querySelector(".stop")
const btnAddMinutes = document.querySelector(".add-minutes")
const btnDecreaseMinutes = document.querySelector(".decrease-minutes")
const btnForest = document.querySelector("#forest")
const btnRain = document.querySelector("#rain")
const btnCoffeeShop = document.querySelector("#coffeeshop")
const btnFirePlace = document.querySelector("#fireplace")
const btnToggleThemeDark = document.querySelector(".moon")
const btnToggleThemeLight = document.querySelector(".sun")
const forestVolume = document.querySelector('#forestVolume')
const rainVolume = document.querySelector('#rainVolume')
const coffeeVolume = document.querySelector('#coffeeVolume')
const fireVolume = document.querySelector('#fireVolume')
const forestRange = document.querySelector('#forestRange')
const rainRange = document.querySelector('#rainRange')
const coffeeRange = document.querySelector('#coffeeRange')
const fireRange = document.querySelector('#fireRange')
const html = document.querySelector('html')

const songForest = new Audio("./sounds/forest.wav")
const songRain = new Audio("./sounds/rain.wav")
const songCoffeeShop = new Audio("./sounds/coffeeshop.wav")
const songFirePlace = new Audio("./sounds/fireplace.wav")
const buttonPressAudio = new Audio("https://github.com/maykbrito/automatic-video-creator/blob/master/audios/button-press.wav?raw=true")
const kitchenTimer = new Audio("https://github.com/maykbrito/automatic-video-creator/blob/master/audios/kichen-timer.mp3?raw=true")

let displayMinutes = document.querySelector(".minutes")
let displaySeconds = document.querySelector(".seconds")
let minutesInital = Number(displayMinutes.textContent)
let timerOut

btnPlay.addEventListener("click", () => {
  btnPlay.classList.add('hide')
  btnPause.classList.remove('hide')
  countDown()
  buttonPressAudio.play()
})

btnPause.addEventListener("click", () => {
  resetControls()
  holdTimer()
  buttonPressAudio.play()
})

btnStop.addEventListener("click", () => {
  resetControls()
  updateDisplay(minutesInital, 0)
  holdTimer()
  buttonPressAudio.play()
})

btnAddMinutes.addEventListener("click", () => {
  addMinutes()
  buttonPressAudio.play()
})

btnDecreaseMinutes.addEventListener("click", () => {
  decreaseMinutes()
  buttonPressAudio.play()
})

btnForest.addEventListener("click", () => {
  btnRain.checked = false
  btnCoffeeShop.checked = false
  btnFirePlace.checked = false
  buttonPressAudio.play()

  songRain.pause()
  songCoffeeShop.pause()
  songFirePlace.pause()

  if(btnForest.checked == true) {
    songForest.play()
    songForest.loop = true
  } else {
    songForest.pause()
  }
})

btnRain.addEventListener("click", () => {
  btnForest.checked = false
  btnCoffeeShop.checked = false
  btnFirePlace.checked = false
  buttonPressAudio.play()

  songForest.pause()
  songCoffeeShop.pause()
  songFirePlace.pause()

  if(btnRain.checked == true) {
    songRain.play()
    songRain.loop = true
  } else {
    songRain.pause()
  }
})

btnCoffeeShop.addEventListener("click", () => {
  btnRain.checked = false
  btnForest.checked = false
  btnFirePlace.checked = false
  buttonPressAudio.play()

  songRain.pause()
  songForest.pause()
  songFirePlace.pause()

  if(btnCoffeeShop.checked == true) {
    songCoffeeShop.play()
    songCoffeeShop.loop = true
  } else {
    songCoffeeShop.pause()
  }
})

btnFirePlace.addEventListener("click", () => {
  btnRain.checked = false
  btnForest.checked = false
  btnCoffeeShop.checked = false
  buttonPressAudio.play()

  songRain.pause()
  songForest.pause()
  songCoffeeShop.pause()

  if(btnFirePlace.checked == true) {
    songFirePlace.play()
    songFirePlace.loop = true
  } else {
    songFirePlace.pause()
  }
})

btnToggleThemeDark.addEventListener('click', () => {
  html.classList.add('dark')
  btnToggleThemeDark.classList.add('hide')
  btnToggleThemeLight.classList.remove('hide')
  buttonPressAudio.play()
})

btnToggleThemeLight.addEventListener('click', () => {
  html.classList.remove('dark')
  btnToggleThemeDark.classList.remove('hide')
  btnToggleThemeLight.classList.add('hide')
  buttonPressAudio.play()
})

forestVolume.addEventListener('input', () => {
  let volume = forestVolume.value
  songVolume(songForest, volume, forestRange)
})

rainVolume.addEventListener('input', () => {
  let volume = rainVolume.value
  songVolume(songRain, volume, rainRange)
})

coffeeVolume.addEventListener('input', () => {
  let volume = coffeeVolume.value
  songVolume(songCoffeeShop, volume, coffeeRange)
})

fireVolume.addEventListener('input', () => {
  let volume = fireVolume.value
  songVolume(songFirePlace, volume, fireRange)
})

function countDown() {
  timerOut = setTimeout( () => {
    let minutes = Number(displayMinutes.textContent)
    let seconds = Number(displaySeconds.textContent)
    let isFinished = minutes == 0 && seconds == 0
    updateDisplay(minutes, 0)
    
    if(isFinished){
      updateDisplay(minutesInital, 0)
      resetControls()
      kitchenTimer.play()
      return 
    }

    if(seconds == 0) {
      seconds = 10
      --minutes
    }

    updateDisplay(minutes, seconds - 1)
    countDown()
  }, 1000)
}

function updateDisplay(newMinutes, seconds) {
  newMinutes = newMinutes === undefined ? minutes : newMinutes
  seconds = seconds === undefined ? 0 : seconds
  newMinutes = newMinutes < 0 ? 0 : newMinutes
  displayMinutes.textContent = String(newMinutes).padStart(2, "0")
  displaySeconds.textContent = String(seconds).padStart(2, "0")
}

function resetControls() {
  btnPlay.classList.remove('hide')
  btnPause.classList.add("hide")
}

function holdTimer() {
  clearTimeout(timerOut)
}

function addMinutes() {
  let newMinutes = Number(displayMinutes.textContent) + 5
  updateDisplay(newMinutes, displaySeconds.textContent)
}

function decreaseMinutes() {
  let newMinutes = Number(displayMinutes.textContent) - 5
  updateDisplay(newMinutes, displaySeconds.textContent)
}

function songVolume(song, value, nameRange){
  song.volume = (value / 100 ).toFixed(1)
  nameRange.textContent = value + '%'
}

