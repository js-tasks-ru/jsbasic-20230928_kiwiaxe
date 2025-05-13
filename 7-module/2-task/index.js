import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.elem = this.render();
    this.body = document.body;
  }
  // создать верстку елемента модал
  render = () => {
    let modal = createElement(`
		<div class="modal">
      <div class="modal__overlay"></div>
  
      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>

			<h3 class="modal__title"></h3>
        </div>

		  <div class="modal__body"></div>
		`);

    modal.querySelector(".modal__close").addEventListener("click", (event) => {
		let btn = event.target.closest('.modal__close');
		if (!btn) return;
		if (btn) {
			this.close();
		}
	 });
	 document.addEventListener('keydown', (event) => {
		if (event.code === 'Escape') {
			this.close();
		}
	 });

    return modal
  }
  // метод setTitle с аргументом
  setTitle = (title) => {
    //добавить элемент с классом modal__title
    this.elem.querySelector(".modal__title").textContent = title;
  }

  // метод setBody с аргументом верстки
  setBody = (html) => {
    // добавить элемент с классом modal__body
   let modalBody = this.elem.querySelector('.modal__body');
	modalBody.textContent = '';
   modalBody.append(html);
  }

  //метод закрытия окна
  //close
  close = () => {
		this.elem.remove();
   	this.body.classList.remove("is-modal-open");
  }

	open = () => {
		this.body.classList.add("is-modal-open");
		this.body.append(this.elem);
	}
}
