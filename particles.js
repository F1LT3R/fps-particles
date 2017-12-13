var width = canvas.offsetWidth
var height = canvas.offsetHeight

canvas.width = width
canvas.height = height

var ctx = canvas.getContext('2d')

function getQueryParams (qs) {
    qs = qs.split('+').join(' ')

    var params = {}
    var tokens
	var re = /[?&]?([^=]+)=([^&]*)/g

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2])
    }

    return params
}

var params = getQueryParams(document.location.search)
console.log(params)

var particleCount = 100000

if (params.hasOwnProperty('particle-count')) {
	particleCount = params['particle-count']
}

pc.innerHTML = ' / ' + particleCount + ' particles'

try {
	history.replaceState({}, '', 'index.html?particle-count=' + particleCount)
} catch (e) {}

function getTime () {
	return Number(new Date())
}

var frameCount = 0
var startTime = getTime()

var draw = function () {
	frameCount += 1

	ctx.clearRect(0, 0, width, height)

	for (var i = 0; i < particleCount; i += 1) {
		var x = Math.random() * width
		var y = Math.random() * height
		ctx.fillRect(x, y, 1, 1)
	}

	var timeNow = getTime()

	var secondsElapsed = (timeNow - startTime) / 1000
	var fpsRate = (frameCount / secondsElapsed)
	fps.innerHTML = fpsRate.toFixed(2) + ' fps'
	window.requestAnimationFrame(draw)
}

// var interval = setInterval(draw, 0)

window.requestAnimationFrame(draw)