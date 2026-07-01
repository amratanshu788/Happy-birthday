/*
==========================================================
    CAKE MODULE
==========================================================
*/

export class Cake {

    constructor() {

        this.section = document.getElementById("cakeSection");

        this.lightButton = document.getElementById("lightCandles");

        this.blowButton = document.getElementById("blowCandles");

        this.flames = document.querySelectorAll(".flame");

        this.nextSection = document.getElementById("celebrationSection");

        this.candlesLit = false;

        this.finished = false;
        this.observer = null;

    }

    init() {

        if (!this.section) return;

        this.observe();

this.events();
    
    }
observe(){

    this.observer = new IntersectionObserver(

        entries=>{

            entries.forEach(entry=>{

                if(entry.isIntersecting){

                    this.prepare();

                    this.observer.disconnect();

                }

            });

        },

        {

            threshold:.25

        }

    );

    this.observer.observe(this.section);

}


    prepare() {

        this.flames.forEach(flame => {

            flame.classList.remove("active");

            flame.classList.add("off");

        });

    }

    events() {

        this.lightButton?.addEventListener("click", () => {

            this.lightCandles();

        });

        this.blowButton?.addEventListener("click", () => {

            this.blowCandles();

        });

    }

    lightCandles() {

        if (this.candlesLit) return;

        this.candlesLit = true;
        if (this.lightButton) {

    this.lightButton.disabled = true;

}

        this.flames.forEach((flame, index) => {

            setTimeout(() => {

                flame.classList.remove("off");

                flame.classList.add("active");

            }, index * 180);

        });

        if (window.gsap) {

            gsap.fromTo(

                ".cake",

                {

                    scale: 0.9

                },

                {

                    scale: 1,

                    duration: .6,

                    ease: "back.out(1.7)"

                }

            );

        }

    }

    blowCandles() {

        if (!this.candlesLit || this.finished) return;

        this.finished = true;
        if (this.blowButton) {

    this.blowButton.disabled = true;

}

        this.flames.forEach((flame, index) => {

            setTimeout(() => {

                flame.classList.remove("active");

                flame.classList.add("off");

            }, index * 120);

        });

        if (window.gsap) {

            gsap.to(".cake", {

                scale: 1.05,

                duration: .4,

                yoyo: true,

                repeat: 1

            });

        }

        setTimeout(() => {

            this.showWish();

        }, 1000);

    }

    showWish() {

        const wish = document.createElement("div");

        wish.className = "wish-message";

        wish.innerHTML = `
            <h2>🌟 Make A Wish 🌟</h2>
            <p>May all your dreams come true, Future Doctor ❤️</p>
        `;

        document.body.appendChild(wish);

        if (window.gsap) {

            gsap.fromTo(

                wish,

                {

                    opacity: 0,

                    scale: .8

                },

                {

                    opacity: 1,

                    scale: 1,

                    duration: .8

                }

            );

        }

        setTimeout(() => {

            if (window.gsap) {

                gsap.to(wish, {

                    opacity: 0,

                    duration: .8,

                    onComplete: () => {

                        wish.remove();

                    }

                });

            } else {

                wish.remove();

            }

            this.showCelebration();

        }, 3500);

    }

 showCelebration() {

    if (!this.nextSection) return;

    this.nextSection.classList.remove("hidden");

    this.nextSection.classList.add("active");

    if (window.gsap) {

        gsap.to(window, {

            duration: 1.5,

            scrollTo: this.nextSection,

            ease: "power2.inOut"

        });

    }

    else {

        this.nextSection.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    }

    document.dispatchEvent(

        new CustomEvent("birthdayCelebration")

    );

    document.dispatchEvent(

        new CustomEvent("websiteCompleted")

    );

}}