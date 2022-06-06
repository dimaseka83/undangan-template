new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data() {
        return {
            arrow: false,
        }
    },
    methods: {
        scrollPlay() {
            var audio = this.$refs.audioElm;
            audio.play();
            this.arrow = true;
        }
    },

    mounted() {
        document.getElementsByClassName('bg-page-cover')[0].style.backgroundImage = "url('https://cdn.undanganweb.com/hi/2022/03/IMG_5830.jpg')";
        document.getElementsByClassName('bg-page1')[0].style.backgroundImage = "url('./img/black_image.png'), url('https://cdn.undanganweb.com/hi/2022/03/IMG_5871.jpg')";
        document.getElementsByClassName('bg-page4')[0].style.backgroundImage = "url('https://cdn.undanganweb.com/hi/2022/03/IMG_5870-480x720-1.jpg')";
        document.getElementsByClassName('bg-page5')[0].style.backgroundImage = "url('./img/black_image2.png'), url('https://cdn.undanganweb.com/hi/2022/03/IMG_5846.jpg')";

    }
})