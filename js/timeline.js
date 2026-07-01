/*
==========================================================
    TIMELINE MODULE
    Future Doctor Journey
==========================================================
*/

export class Timeline {

    constructor() {

        this.section = document.getElementById("doctorJourney");

        this.items = document.querySelectorAll(".timeline-item");

        this.nextSection = document.getElementById("letterSection");

        this.animated = false;

    }

    init() {

        if (!this.section) return;

        this.prepare();

        this.observe();

        this.hoverEffects();

    }

    prepare() {

        this.items.forEach(item => {

            item.style.opacity = "0";

            item.style.transform = "translateY(80px)";

        });

    }

    observe() {

        const observer = new IntersectionObserver(

            (entries) => {

                entries.forEach(entry => {

                    if (

                        entry.isIntersecting &&

                        !this.animated

                    ) {

                        this.animated = true;

                        this.animateTimeline();
                        observer.disconnect();

                    }

                });

            },

            {

                threshold:0.25

            }

        );

        observer.observe(this.section);

    }

    animateTimeline() {

        if(window.gsap){

            gsap.to(this.items,{

                opacity:1,

                y:0,

                duration:1,

                ease:"power3.out",

                stagger:0.45

            });

        }

        else{

            this.items.forEach(item => {

    item.style.opacity = "1";

    item.style.transform = "translateY(0) scale(1)";

});
        }

        this.glowIcons();

        setTimeout(()=>{

            this.unlockLetter();

        },3000);

    }

    glowIcons(){

        const icons=document.querySelectorAll(".timeline-icon");

        if(!window.gsap) return;

        icons.forEach((icon,index)=>{

            gsap.to(icon,{

                scale:1.12,

                boxShadow:

                "0 0 35px rgba(255,79,163,.6)",

                repeat:-1,

                yoyo:true,

                duration:1.4,

                delay:index*.25

            });

        });

    }

    unlockLetter() {

    if (!this.nextSection) return;

    this.nextSection.classList.remove("hidden");
    this.nextSection.classList.add("active");

    if (window.gsap) {

        gsap.to(window, {

            duration: 1.5,

            scrollTo: this.nextSection,

            ease: "power2.inOut"

        });
        document.dispatchEvent(

    new CustomEvent("timelineCompleted")

);

    }

}

    hoverEffects(){

        this.items.forEach(item=>{

            item.addEventListener("mouseenter",()=>{

                if(window.gsap){

                    gsap.to(item,{

                        y:-10,

                        scale:1.02,

                        duration:.3

                    });

                }

            });

            item.addEventListener("mouseleave",()=>{

                if(window.gsap){

                    gsap.to(item,{

                        y:0,

                        scale:1,

                        duration:.3

                    });

                }

            });

        });

    }

}