new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data() {
        return {
            arrow: false,
            items: [
          {
            src: 'https://cdn.undanganweb.com/hi/2022/03/IMG_5846.jpg',
          },
          {
            src: 'https://cdn.undanganweb.com/hi/2022/03/WhatsApp-Image-2021-02-19-at-17.21.43.jpeg',
          },
          {
            src: 'https://cdn.undanganweb.com/hi/2022/03/WhatsApp-Image-2021-02-19-at-17.21.45.jpeg',
          },
            ],
            timeline: [
                {
                    tahun: '2015',
                    judul: 'Awal perkenalan',
                    subtitle: 'Awal perkenalan, kami satu grup basket di line. Ravi mengirimkan personal chat karena tahu kalau kami berasal dari kota yang sama. Dari situ kami saling mengenal satu sama lain.'
                },
                {
                    tahun: '2016',
                    judul: 'Awal pertemuan',
                    subtitle: 'Awal pertemuan kami saat adanya rektor cup di kampus kami. Disitu kami mulai bertambah akrab.'
                },
                {
                    tahun: '2017',
                    judul: 'Proses Ketuk Pintu',
                    subtitle: 'Keluarga Ravi dan Ravi datang ke rumah untuk menyampaikan bahwa ingin menjalin hubungan kejenjang yang lebih serius.'
                },
                {
                    tahun: '2021',
                    judul: 'Momen Spesial',
                    subtitle: 'Momen spesial kami akan dimulai setelah 5 tahun kami menjalin hubungan, dimana kami akan membangun keluarga kecil kami. Semoga Allah SWT memberikan keberkahan untuk pernikahan kami.'
                }
            ],
                ucapan: [],
    form: [{
      nama: '',
      ucapan: '',
    }],
    formBalasan: [{
      nama: '',
      ucapan: '',
    }],
    dialog: false,
                    
        }
    },
    methods: {
        scrollPlay() {
            var audio = this.$refs.audioElm;
            audio.play();
            this.arrow = true;
        },
        kirimUcapan() {
      this.ucapan.push({
        nama: this.form.nama,
        ucapan: this.form.ucapan,
        reply: []
      });
      this.form = [{
        nama: '',
        ucapan: '',
        reply: []
      }];
        },
        
            kirimBalasan(id) {
      this.ucapan[id].reply.push({
        nama: this.formBalasan.nama,
        ucapan: this.formBalasan.ucapan,
      });
      this.formBalasan = [{
        nama: '',
        ucapan: '',
      }];
    },
    },

    mounted() {
        document.getElementsByClassName('bg-page-cover')[0].style.backgroundImage = "url('https://cdn.undanganweb.com/hi/2022/03/IMG_5830.jpg')";
        document.getElementsByClassName('bg-page1')[0].style.backgroundImage = "url('./img/black_image.png'), url('https://cdn.undanganweb.com/hi/2022/03/IMG_5871.jpg')";
        document.getElementsByClassName('bg-page4')[0].style.backgroundImage = "url('https://cdn.undanganweb.com/hi/2022/03/IMG_5870-480x720-1.jpg')";
        document.getElementsByClassName('bg-page5')[0].style.backgroundImage = "url('./img/black_image2.png'), url('https://cdn.undanganweb.com/hi/2022/03/IMG_5846.jpg')";
        document.getElementsByClassName('bg-page9')[0].style.backgroundImage = "url('./img/black_image.png'), url('https://cdn.undanganweb.com/hi/2022/03/IMG_5869.jpg')";

    }
})