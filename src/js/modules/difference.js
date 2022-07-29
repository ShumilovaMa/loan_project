export default class Difference {
    constructor(officer, items) {
        this.officer = document.querySelector(officer);
        this.items = this.officer.querySelectorAll(items);
        this.counter = 0;
    }

    bindTriggers(container, items, counter) {
        container.querySelector('.plus').addEventListener('click', () => {
            items[counter].style.display = 'flex';//показываем карточку
            items[counter].classList.add('fadeIn');
            if (counter !== items.length - 2) {
                counter++;
            } else {//если мы дошли до последней карточки, которую нужно показать, то:
                items[items.length - 1].remove();//удаляем последний блок 
            }
        });
    }

    hideItems(items) {
        items.forEach((item, i, arr) => {
            if (i !== arr.length - 1) {//проверяем, что элемент массива(его номер п/п) не последний в коллекции
                item.style.display = 'none';//скрываем все элементы, кроме последнего
                item.classList.add('animated');
            }
        });
    }    

    init() {
        this.hideItems(this.items);
        this.bindTriggers(this.officer, this.items, this.counter);
    }
}