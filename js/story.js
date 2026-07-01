/*
==========================================================
    STORY MODULE
==========================================================
*/

export class Story {

    constructor() {

        this.section = document.getElementById("storySection");

        this.cards = document.querySelectorAll(".story-card");

        this.nextSection = document.getElementById("qualities");

        this.hasAnimated = false;

    }

    init() {

        if (!this.section) return;

        this.observeSection();

        this.enableHoverEffects();

    }

    observeSection() {

        const observer = new IntersectionObserver(

            (entries) => {

                entries.forEach(entry => {

                    if (

                        entry.isIntersecting &&

                        !this.hasAnimated

                    ) {

                        this.hasAnimated = true;

                        this.animateCards();
                        observer.disconnect();

                    }

                });

            },

            {

                threshold:0.3

            }

        );

        observer.observe(this.section);

    }

    animateCards() {

        if(!window.gsap){

            this.cards.forEach(card => {

    card.style.opacity = "1";

    card.style.transform = "translateY(0) scale(1)";

});

            return;

        }

        gsap.fromTo(

            this.cards,

            {

                opacity:0,

                y:80,

                scale:.9

            },

            {

                opacity:1,

                y:0,

                scale:1,

                duration:1,

                stagger:.35,

                ease:"power3.out"

            }

        );

        setTimeout(()=>{

            this.showNextSection();

        },3500);

    }

showNextSection() {

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

}
}