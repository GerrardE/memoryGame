	//First, I got the deck,
	const deck = document.getElementById("deck");

	//Then I stored all the required images in my cards,
	const cards = ["fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-anchor","fa-leaf","fa-bicycle","fa-diamond","fa-bomb","fa-leaf","fa-bomb","fa-bolt","fa-bicycle","fa-paper-plane-o", "fa-cube"];

	//Here, i collect the move ID and track it on call function recordMoves,
	let record = document.getElementById('moves');
	let moves = 0;
	var recordMoves = function (){
			moves++;    
			record.innerHTML = moves;
		}
	
	//Here, I set up all the star elements and add it when the recordMatch function is called
	var stars = document.getElementById('stars');
	let rating = document.getElementById('rating');
	let rating1 = document.getElementById('rating1');
	let matches = document.getElementById('matched');
	let match = 0;

	var recordMatch =	function (){
			match++; 
				//control how the stars are awarded out of five, one being the highest
				//each for the live view, congratulations/gameOver modal
				if(match === 2){
					stars.removeChild(stars.childNodes[0]);
					rating.removeChild(rating.childNodes[0]);
					rating1.removeChild(rating1.childNodes[0]);
				} else if (match === 4) {
					stars.removeChild(stars.childNodes[1]);
					rating.removeChild(rating.childNodes[1]);
					rating1.removeChild(rating1.childNodes[1]);
				} else if (match === 6) {
					stars.removeChild(stars.childNodes[2]);
					rating.removeChild(rating.childNodes[2]);
					rating1.removeChild(rating1.childNodes[2]);
				} else if (match === 8) {
					stars.removeChild(stars.childNodes[3]);
					rating.removeChild(rating.childNodes[3]);
					rating1.removeChild(rating1.childNodes[3]);
				}
		
				//This If statement kicks when the matches are complete. Congratulations!
				if (match === 8) {
				let final = document.getElementById('timer');
				final.removeAttribute('id', 'timer');
					
				let modal = document.getElementById('modal');
				modal.style.display = 'block';
					
				let close = document.getElementById('close');
					close.onclick = function(){
					modal.style.display = 'none';
					newGame();
				}
			} 
		}
		
				//End this game under certain conditions specified by the timer;
				var gameOver = function (){
						let gameO = document.getElementById('gameOver');
						gameO.style.display = 'block';
					
						let gclose = document.getElementById('close-g');
						gclose.onclick = function(){
						gameO.style.display = 'none';
						}
						let removeTimer = document.getElementById('timer');
						removeTimer.style.display = 'none';
				}
		
		//This is the shuffle function recommemnded by Udacity, I call it to shuffle the images on the cards
		function shuffle () {
				var currentIndex = cards.length, temporaryValue, randomIndex;

				while (currentIndex !== 0) {
						randomIndex = Math.floor(Math.random() * currentIndex);
						currentIndex -= 1;
						temporaryValue = cards[currentIndex];
						cards[currentIndex] = cards[randomIndex];
						cards[randomIndex] = temporaryValue;
				}
				return cards;
	} shuffle(cards);

	//Here, I call each image in the card, create an li, create an i element, append the image to the 'i' //and then the 'li'
	for(const card of cards){
			const li = document.createElement('li');
			li.setAttribute('class', 'card');
			deck.appendChild(li);

			const i = document.createElement('i');
			i.classList.add('fa', card);
		
			li.appendChild(i);
	}
	
			//Here, I collect all the cards in a box,
			let boxes = document.getElementsByClassName('card');
			//Here, I collect all matched cards in a box too,
			let boxMatches = document.getElementsByClassName('match');		
		
			//This for-loop loops through the boxes and adds classes/removes classes on them
			for (const box of boxes){
				 var displayCard = function () {
					box.classList.add('open');
					box.classList.toggle('show');
					box.classList.toggle('disabled');
				}
	
				box.addEventListener('click', displayCard);
				box.addEventListener('click', openBox);
				var openBoxes = [];
			
					//This function pushes open cards to the openBox variable declared above,
					function openBox() {
						openBoxes.push(box);
							if(openBoxes.length === 2){
								recordMoves();
								//checks that the inner html of the box match or not then call respective functions,
									if(openBoxes[1].innerHTML === openBoxes[0].innerHTML){
													matched(); 
												} else {
													unmatched();
									}
							};
						
						//This function is called from the openBox function
						function matched() {
							openBoxes[0].classList.add("match");
							openBoxes[1].classList.add("match");
							openBoxes[0].classList.remove("show", "open");
							openBoxes[1].classList.remove("show", "open");
							openBoxes = [];
							recordMatch();
						}
						
						//This function is called from the openBox function
						function unmatched() {
							openBoxes[0].classList.add("unmatched");
							openBoxes[1].classList.add("unmatched");
							disable();
							
							setTimeout(function(){
								openBoxes[0].classList.remove("show", "open", "unmatched");
								openBoxes[1].classList.remove("show", "open", "unmatched");
								enable();
								openBoxes = [];
							},800);
						}
						
						//I learned this function from Sandra at https://sandraisrael.github.io/Memory-Game-fend/#
						//Essentially saw that call here gives us a way to "borrow" a method from one object to use //for another.
						function disable(){
								Array.prototype.filter.call(boxes, function(box){
										//the disabled class makes the pointer disabled for a while
										box.classList.add('disabled');
								});
						}
					
						function enable(){
								Array.prototype.filter.call(boxes, function(box){
										box.classList.remove('disabled');
										//loop through the mathed boxes and add disabled class to them
										for(const boxMatch of boxMatches){
												boxMatch.classList.add('disabled');
										}
								});
						}
					};				
		};// End of this for-loop loops through the boxes and adds classes/removes classes on them

			//Timer function by https://codepen.io/ishanbakshi/pen/pgzNMv;
				document.getElementById('timer').innerHTML =
					05 + ":" + 00;
					startTimer();

				function startTimer() {
					var presentTime = document.getElementById('timer').innerHTML;
					var timeArray = presentTime.split(/[:]+/);
					var m = timeArray[0];
					var s = checkSecond((timeArray[1] - 1));
					if(s==59){
						m=m-1
					}
						if((m == 0 && s == 0) && moves === 0) {
							gameOver();
						//document.getElementById('timer').innerHTML =
						//00 + ":" + 00;
						} else if((m == 0 && s == 0) && ((moves > 0) && (match < 1))) {
						gameOver();
						//document.getElementById('timer').innerHTML =
						//00 + ":" + 00;
						} else if((m == 0 && s == 0) && ((moves > 0) && (match < 8))) {
						gameOver();
						//document.getElementById('timer').innerHTML =
						//00 + ":" + 00;
						} else {
							document.getElementById('timer').innerHTML =
							m + ":" + s;
							setTimeout(startTimer, 200);
						}
				}

				function checkSecond(sec) {
					if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
					if (sec < 0) {sec = "59"};
					return sec;
				}
			//Timer function by https://codepen.io/ishanbakshi/pen/pgzNMv ends here;

		//Onclick restart button, this function ensures the game is restarted
		function newGame(){
				window.location.reload();
				startTimer();
		}