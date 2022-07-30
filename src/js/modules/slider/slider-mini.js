import Slider from "./slider";

export default class MiniSlider extends Slider {
    constructor(container, prev, next, animate, activeClass, autoplay) {
        super(container, prev, next, animate, activeClass, autoplay);
        this.paused = false;
    }

    decorizeSlides() {
        this.slides.forEach(slide => {
            slide.classList.remove(this.activeClass);
            if (this.animate) {
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0';
            }
        });

        if (!this.slides[0].closest('button')) {
            this.slides[0].classList.add(this.activeClass);
        }

        if (this.animate) {
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }

    nextSlide() {
        if (this.prev.parentNode === this.container) {
            this.container.insertBefore(this.slides[0], this.prev);
        } else {
            this.container.appendChild(this.slides[0]);
        }
        this.decorizeSlides();
    }

    bindTriggers() {
        this.next.addEventListener('click', () => this.nextSlide());

        this.prev.addEventListener('click', () => {
            for (let i = this.slides.length - 1; i > 0; i--) {
                if (this.slides[i].tagName !== 'BUTTON') {
                    let active = this.slides[i];
                    this.container.insertBefore(active, this.slides[0]);
                    this.decorizeSlides();
                    break;
                }
            }
        });
    }

    activateAnimation() {
        [this.container, this.prev, this.next].forEach(item => {
            item.addEventListener('mouseleave', () => {
                this.deactivateAnimation();
            });
        });
    }

    deactivateAnimation() {
        this.paused = setInterval(() => this.nextSlide(), 5000);
        [this.container, this.prev, this.next].forEach(item => {
            item.addEventListener('mouseenter', () => {
                clearInterval(this.paused);
            });
        });
    }

    init() {
        try {
            this.container.style.cssText = `
                display: flex;
                flex-wrap:  wrap;
                overflow: hidden;
                align-items: flex-start;
            `;

            this.bindTriggers();
            this.decorizeSlides();

            if (this.autoplay) {
                this.activateAnimation();
                this.deactivateAnimation();
            }
        } catch(e){}
    }
}