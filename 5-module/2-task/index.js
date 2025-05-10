function toggleText() {
  let btn = document.querySelector(".toggle-text-button");
  btn.addEventListener('click', event => {
	let hiddenText = document.querySelector('#text');
	hiddenText.hidden = !hiddenText.hidden;
  })
}
