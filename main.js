/*CURSOR*/
let cursor = document.querySelector('.cursor')
document.addEventListener('mousemove', e => {
	cursor.setAttribute("style", "top:" + e.pageY + "px; left:" + e.pageX + "px;")
})

document.addEventListener('click', e => {
	cursor.classList.add('click')

	setTimeout(() => {
		cursor.classList.remove('click')
	}, 500)
})

/*MAP ANIMATION*/

let t1 = new TimelineMax({
	paused: true
})

t1.to('.info, .text', 0.1, {
	autoAlpha: 0
})
t1.to('.left-far', 1.5, {
	rotationY: 180,
	transformOrigin: 'left',
})

t1.to('.right-far', 1.5, {
	rotationY: 180,
	transformOrigin: 'right' 
}, 0)

t1.to('.left-far', 0.5, {
	x: '-100%'
})

t1.to('.right-far', 0.5, {
	x: '100%'
}, 1.5)

t1.from('.right-near, .left-near', 0.5, {
	autoAlpha: 0
}, 1.5)

t1.to('.top-side', 0.5, {
	rotationX: 180,
	transformOrigin: "top left"
})

t1.to('.bottom-side', 0.5, {
	rotationX: 180,
	transformOrigin: "bottom left"
}, "-=0.5")



/*LETTER ANIMATION*/


let t2 = new TimelineMax({
	repeat: -1,
	yoyo: true
})

let t3 = new TimelineMax({})


Array.from(document.querySelector('.text').children, (line)=> {
	let letters = line.innerHTML.split("")
	let blockLetters = []
	letters.forEach((letter) => {
		if(letter === " ")
			blockLetters.push("<div class=\"letter\"> &nbsp; </div>")
		else
			blockLetters.push("<div class=\"letter\">" + letter + "</div>")
	})
	line.innerHTML = blockLetters.join("")
})

t3.staggerFrom('.letter', 0.5, {
	autoAlpha: 0
}, 0.1)

t3.from('.info', 0.5, {
	scale: 1.5,
	autoAlpha: 0
})

t2.staggerTo(".letter", 0.5, {
	scale: 1.2
}, 0.1)

t2.staggerTo(".letter", 0.5, {
	scale: 1
}, 0.1, 0)


/*EVENTS*/
let folded = true

let fold = () => {
	console.log("working")
	if(folded) {
		t2.paused(true)
		t1.restart()
		folded = false
	}
	else {
		t1.reverse()
		t2.paused(false)
		folded = true
	}
}