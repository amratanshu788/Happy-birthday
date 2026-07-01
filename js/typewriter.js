/*
==========================================================
    TYPEWRITER MODULE
==========================================================
*/

import { CONFIG } from "./config.js";

export class Typewriter {

    constructor() {

        this.section = document.getElementById("letterSection");

        this.container = document.getElementById("typewriter");

        this.nextSection = document.getElementById("cakeSection");

        this.lines = CONFIG.letter;

        this.currentLine = 0;

        this.currentChar = 0;

        this.typing = false;

        this.cursor = null;
        this.typeSound = document.getElementById("typingSound");

    }

    init() {

        if (!this.container) return;

        this.container.innerHTML = "";

        this.observe();

    }

    observe() {

        const observer = new IntersectionObserver(

            (entries)=>{

                entries.forEach(entry=>{

                    if(entry.isIntersecting && !this.typing){

                        this.typing = true;

                        this.start();
                        observer.disconnect();

                    }

                });

            },

            {

                threshold:.30

            }

        );

        observer.observe(this.section);

    }

    start(){

        this.cursor = document.createElement("span");

        this.cursor.className = "typewriter-cursor";

        this.cursor.textContent = "|";
        this.cursor.classList.add("blink");

        this.typeNextLine();

    }

    typeNextLine(){

        if(this.currentLine >= this.lines.length){

            this.finish();

            return;

        }

        const paragraph = document.createElement("p");

        this.container.appendChild(paragraph);

        this.typeCharacters(paragraph);

    }

    typeCharacters(paragraph){

        const text = this.lines[this.currentLine];

        if(this.currentChar < text.length){

            paragraph.textContent += text[this.currentChar];
            if (this.typeSound && this.currentChar % 3 === 0) {

    this.typeSound.currentTime = 0;

    this.typeSound.play().catch(() => {});

}


            this.currentChar++;

            paragraph.appendChild(this.cursor);

            this.container.scrollTop = this.container.scrollHeight;

            let delay = 28 + Math.random()*40;

            const character = text[this.currentChar-1];

            if(character === ".")

                delay = 280;

            if(character === ",")

                delay = 170;

            if(character === "!")

                delay = 320;

            if(character === "?")

                delay = 320;

            setTimeout(()=>{

                this.typeCharacters(paragraph);

            },delay);

        }

        else{

            this.currentLine++;

            this.currentChar = 0;

            if (paragraph.contains(this.cursor)) {

    paragraph.removeChild(this.cursor);

}

            setTimeout(()=>{

                this.typeNextLine();

            },450);

        }

    }

    finish(){

        if(window.gsap){

            gsap.fromTo(

                ".letter-sign",

                {

                    opacity:0,

                    y:40

                },

                {

                    opacity:1,

                    y:0,

                    duration:1

                }

            );

        }

        setTimeout(()=>{

            this.unlockCake();

        },1500);

    }

    unlockCake(){

    if(!this.nextSection) return;

    this.nextSection.classList.remove("hidden");

    this.nextSection.classList.add("active");

    if(window.gsap){

        gsap.to(window,{

            duration:1.5,

            scrollTo:this.nextSection,

            ease:"power2.inOut"

        });

    }

    document.dispatchEvent(

        new CustomEvent("letterCompleted")

    );

}

}