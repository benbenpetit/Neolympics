export function estimateRefreshRate() {
  return new Promise(function (resolve) {
    var frameTimes = []
    var startTime = performance.now()

    function checkFrame(timestamp) {
      var currentTime = performance.now()
      var elapsedTime = currentTime - startTime
      frameTimes.push(elapsedTime)

      if (frameTimes.length < 60) {
        window.requestAnimationFrame(checkFrame)
      } else {
        var averageTime =
          frameTimes.reduce(function (a, b) {
            return a + b
          }) / frameTimes.length
        var refreshRate = Math.round(1000 / averageTime)
        resolve(refreshRate)
      }
    }

    window.requestAnimationFrame(checkFrame)
  })
}

// Utilisation de la fonction pour estimer le taux de rafraîchissement
estimateRefreshRate().then(function (fps) {
  console.log('Estimation du taux de rafraîchissement : ' + fps + ' FPS')
})
