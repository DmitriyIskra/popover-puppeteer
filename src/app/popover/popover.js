import './style.css';

export default class Popover2 {
  constructor(container) {
    this.container = container;

    this.onClick = this.onClick.bind(this);
  }

  static getPopoverButton() {
    const button = document.createElement('button');
    button.classList.add('popover-button');
    button.textContent = 'Click to toggle popover';

    return button;
  }

  static getPopoverPopUp() {
    const wraperPopUp = document.createElement('div');
    wraperPopUp.classList.add('popover__wr-popup');

    const headerPopUp = document.createElement('div');
    headerPopUp.classList.add('popover__header');

    const titlePopUp = document.createElement('h2');
    titlePopUp.classList.add('popover__title');
    titlePopUp.textContent = 'Popover title';

    const contentPopUp = document.createElement('p');
    contentPopUp.classList.add('popover__content');
    contentPopUp.textContent = "And here's some amazing content. It's very engaging. Right?";

    const triangle = document.createElement('div');
    triangle.classList.add('popover__triangle');

    headerPopUp.append(titlePopUp);
    wraperPopUp.append(headerPopUp);
    wraperPopUp.append(contentPopUp);
    wraperPopUp.append(triangle);

    return wraperPopUp;
  }

  onClick(e) {
    e.preventDefault();

    if (e.target.matches('.popover-button')) {
      this.popUpPopover.classList.toggle('active');
      this.popUpPopover.style.top = `${e.target.offsetTop - this.popUpPopover.offsetHeight - this.buttonPopover.offsetHeight / 2 - 8}px`;
      this.popUpPopover.style.left = `${e.target.offsetLeft - this.popUpPopover.offsetWidth / 2}px`;
    }
  }

  bindToDom() {
    this.buttonPopover = Popover2.getPopoverButton();
    this.popUpPopover = Popover2.getPopoverPopUp();

    this.container.append(this.buttonPopover);

    this.container.append(this.popUpPopover);

    this.buttonPopover.addEventListener('click', this.onClick);
  }
}
