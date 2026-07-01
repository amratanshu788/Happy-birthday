/*
==========================================================
    MUSIC MODULE
==========================================================
*/

export class MusicPlayer {

    constructor() {

        this.audio = document.getElementById("bgMusic");

        this.button = document.getElementById("playMusic");

        this.volume = document.getElementById("volumeSlider");

        this.musicButton = document.getElementById("musicButton");

        this.isPlaying = false;

        this.fadeSpeed = 0.02;

        this.targetVolume = 0.7;
        this.fadeInterval = null;

    }

    init() {

        if (!this.audio) return;

        this.audio.volume = this.targetVolume;

        if (this.volume) {

    this.volume.value = this.targetVolume * 100;

}

        this.registerEvents();

    }

    registerEvents() {

        document.addEventListener(
    "click",
    () => {

        if (!this.isPlaying) {

            this.play();

        }

    },
    { once: true }
);
        this.button?.addEventListener("click", () => {

            this.toggle();

        });

        this.musicButton?.addEventListener("click", () => {

            this.toggle();

        });

        this.volume?.addEventListener("input", (e) => {

            this.targetVolume = e.target.value / 100;

            this.audio.volume = this.targetVolume;

        });

        document.addEventListener("visibilitychange", () => {

            if (document.hidden) {

                if (this.isPlaying) {

                    this.audio.pause();

                }

            } else {

                if (this.isPlaying) {

                    this.audio.play();

                }

            }

        });

    }

    async play() {

        try {

            await this.audio.play();

            this.isPlaying = true;

            this.startPulse();

        }

        catch (err) {

            console.warn("Music couldn't start automatically.");

        }

    }

    pause() {

        this.audio.pause();

        this.isPlaying = false;

        this.stopPulse();

    }

    toggle() {

        if (this.isPlaying) {

            this.fadeOut();

        }

        else {

            this.fadeIn();

        }

    }

    fadeIn() {
        clearInterval(this.fadeInterval);

        this.audio.volume = 0;

        this.play();

        this.fadeInterval = setInterval(() => {

            if (this.audio.volume < this.targetVolume) {

                this.audio.volume = Math.min(

                    this.audio.volume + this.fadeSpeed,

                    this.targetVolume

                );

            }

            else {

                clearInterval(this.fadeInterval);

            }

        }, 100);

    }

    fadeOut() {

        clearInterval(this.fadeInterval);
        this.fadeInterval = setInterval(() => {
            if (this.audio.volume > 0.02) {

                this.audio.volume -= this.fadeSpeed;

            }

            else {

                clearInterval(this.fadeInterval);

                this.pause();

                this.audio.volume = this.targetVolume;

            }

        },100);

    }

    startPulse() {

    this.button?.classList.add("playing");

    this.musicButton?.classList.add("playing");

    if (this.button) {

        this.button.innerHTML =
            '<i class="fa-solid fa-pause"></i>';

    }

}

stopPulse() {

    this.button?.classList.remove("playing");

    this.musicButton?.classList.remove("playing");

    if (this.button) {

        this.button.innerHTML =
            '<i class="fa-solid fa-play"></i>';

    }

}

destroy() {

    clearInterval(this.fadeInterval);

    this.audio?.pause();

}

}