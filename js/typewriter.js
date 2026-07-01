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

typeCharacters(paragraph) {

    const text = this.lines[this.currentLine];

    if (this.currentChar < text.length) {

        // Remove cursor
        if (this.cursor.parentNode) {
            this.cursor.remove();
        }

        // Append only the next character
        paragraph.append(
            document.createTextNode(text[this.currentChar])
        );

        this.currentChar++;

        // Put cursor back
        paragraph.appendChild(this.cursor);

        this.container.scrollTop = this.container.scrollHeight;

        let delay = 35;

        const ch = text[this.currentChar - 1];

        if (ch === "." || ch === "!" || ch === "?") delay = 250;
        if (ch === ",") delay = 150;

        setTimeout(() => {

            this.typeCharacters(paragraph);

        }, delay);

    } else {

        if (this.cursor.parentNode) {
            this.cursor.remove();
        }

        this.currentLine++;
        this.currentChar = 0;

        setTimeout(() => {

            this.typeNextLine();

        }, 400);

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
