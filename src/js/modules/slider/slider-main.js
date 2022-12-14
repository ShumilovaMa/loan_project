import Slider from "./slider";

export default class MainSlider extends Slider {
    constructor(btns) {
        super(btns);
        this.prevBtn = document.querySelectorAll('.prevmodule');
        this.nextBtn = document.querySelectorAll('.nextmodule');
    }

    showSlides(n) {
        if (n > this.slides.length) {
            this.slideIndex = 1;
        }

        if (n < 1) {
            this.slideIndex = this.slides.length;
        }

        try {
            this.hanson.style.opacity = '0';

            if (n === 3) {
                this.hanson.classList.add('animated');
                setTimeout(() => {
                    this.hanson.style.opacity = '1';
                    this.hanson.classList.add('slideInUp');
                }, 3000);
            } else {
                this.hanson.classList.remove('slideInUp');
            }
        } catch(e){}

        this.slides.forEach(slide => {
            slide.style.display = "none";
            slide.classList.remove('animated');
        });

        this.slides[this.slideIndex - 1].style.display = "block";
        this.slides[this.slideIndex - 1].classList.add('animated', 'fadeIn');
    }

    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }

    toggleBtn(btns, n) {
        btns.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.plusSlides(n);
            });
        });
    }

    bindTriggers() {
        this.btns.forEach(btn => {
            btn.parentNode.previousElementSibling.addEventListener('click', (e) => {
                e.preventDefault();
                this.slideIndex = 1;
                this.showSlides(this.slideIndex);
            });
        });
    }

    render() {
        if (this.container) {
            try {
                this.hanson = document.querySelector('.hanson');
            } catch(e){}
    
            this.showSlides(this.slideIndex);
            this.bindTriggers();
            this.toggleBtn(this.btns, 1);
            this.toggleBtn(this.prevBtn, -1);
            this.toggleBtn(this.nextBtn, 1);
        } 
    }
}