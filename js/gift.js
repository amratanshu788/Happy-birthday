/*
==========================================================
    GIFT MODULE
==========================================================
*/

export class Gift {

    constructor(musicPlayer) {

        this.musicPlayer = musicPlayer;

        this.gift = document.getElementById("giftBox");

        this.button = document.getElementById("openGift");

        this.hero = document.getElementById("hero");

        this.giftSection = document.getElementById("giftSection");

        this.storySection = document.getElementById("storySection");

        this.hearts = document.getElementById("floatingHearts");

        this.flowers = document.getElementById("floatingFlowers");

        this.opened = false;

    }

init() {

    if (!this.button) return;

    if (localStorage.getItem("giftOpened") === "true") {

        this.opened = true;

        this.button.innerHTML = "Gift Opened ❤️";

        this.button.disabled = true;

    }

    this.button.addEventListener("click", () => {

        if (this.opened) return;

        this.openGift();

    });

}

    openGift() {

        this.opened = true;
        localStorage.setItem("giftOpened", "true");

        this.button.disabled = true;

        this.button.innerHTML = "Opening...";



    if (this.gift) {

    this.gift.classList.add("open");

}



        if (window.gsap) {

            gsap.to(this.gift, {

                duration: 1,

                scale: 1.15,

                ease: "back.out(2)"

            });

        }

        this.releaseMagic();

        this.musicPlayer?.play();

        setTimeout(() => {

            this.button.innerHTML = "Gift Opened ❤️";

        },1200);

        setTimeout(() => {

            this.showStory();

        },2500);

    }

    releaseMagic() {

        for(let i=0;i<40;i++){

            this.spawnHeart();

        }

        for(let i=0;i<35;i++){

            this.spawnFlower();

        }

    }

    spawnHeart(){

        const icons=[

            "❤",

            "💖",

            "💕",

            "💗",

            "💝"

        ];

        const heart=document.createElement("div");

        heart.className="heart";

        heart.innerHTML=

            icons[Math.floor(Math.random()*icons.length)];

        heart.style.left=

            45+Math.random()*10+"%";

        heart.style.top="55%";

        heart.style.fontSize=

            18+Math.random()*20+"px";

        heart.style.animationDuration=

            4+Math.random()*4+"s";

        if (!this.hearts) return;



this.hearts.appendChild(heart);

        setTimeout(()=>{

            heart.remove();

        },8000);

    }

    spawnFlower(){

        const flowers=[

            "🌸",

            "🌺",

            "🌼",

            "🌷"

        ];

        const flower=document.createElement("div");

        flower.className="flower";

        flower.innerHTML=

            flowers[Math.floor(Math.random()*flowers.length)];

        flower.style.left=

            45+Math.random()*10+"%";

        flower.style.top="50%";

        flower.style.fontSize=

            18+Math.random()*18+"px";

        flower.style.animationDuration=

            5+Math.random()*5+"s";

        if (!this.flowers) return;



this.flowers.appendChild(flower);

        setTimeout(()=>{

            flower.remove();

        },9000);

    }

    showStory(){

        if (!this.storySection) return;

this.storySection.classList.remove("hidden");
this.storySection.classList.add("active");


        if(window.gsap){

            gsap.to(window,{

                duration:2,

                scrollTo:this.storySection,

                ease:"power2.inOut"

            });

            gsap.from(this.storySection,{

                duration:1.2,

                opacity:0,

                y:100

            });

        }

    }

}
