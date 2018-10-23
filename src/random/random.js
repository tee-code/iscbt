export class Random{
  random = function() {
      const alpha = 'abcdefghijklmnopqrstuvwxyz'
      let randomID = ''

      let check = false
      if (this.randomBool()) {
          randomID += this.randomAlpha(alpha).toUpperCase()
          check = true
      } else {
          randomID += this.randomAlpha(alpha)
      }
      randomID += '-'
      randomID += this.randomNum() + '-'
      if (check) {
          randomID += this.randomAlpha(alpha)
      } else {
          randomID += this.randomAlpha(alpha).toUpperCase()
      }
      return randomID
  }
  randomAlpha = function(strings) {
      let alpha = ''
      for (let i = 0; i < 5; i++) {
          let index = Math.floor(Math.random() * (26))
          alpha += strings[index]
      }
      return alpha
  }

  randomNum = function() {
      let numbers = ''
      for (let i = 0; i < 5; i++) {
          numbers += Math.floor(Math.random() * 10)
      }
      return numbers
  }

  randomBool = function() {
      let randomNum = Math.floor(Math.random() * 2)
      if (randomNum <= 0) {
          return false;
      } else {
          return true;
      }
  }
}
