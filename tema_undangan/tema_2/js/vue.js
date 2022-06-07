new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  data() {
    return {
      arrow: false,
      dataApi: [],
      loading: true,
      openInvitation: false,
      items: [{
          src: 'https://cdn.undanganweb.com/hi/2022/03/IMG_5846.jpg',
        },
        {
          src: 'https://cdn.undanganweb.com/hi/2022/03/WhatsApp-Image-2021-02-19-at-17.21.43.jpeg',
        },
        {
          src: 'https://cdn.undanganweb.com/hi/2022/03/WhatsApp-Image-2021-02-19-at-17.21.45.jpeg',
        },
      ],
      timeline: [],
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
      dialog2: false,
      dialog3: false,
      dialog4: false,
      displayDays: 0,
      displayHours: 0,
      displayMinutes: 0,
      displaySeconds: 0,
    }
  },
  methods: {
    loadData() {
      axios.get('https://merestui.com/api/vindirendra').then(response => {
        this.dataApi = response.data.data;
        this.loading = false;
      });
    },
    background(){
      if (this.loading == false) {
      document.getElementsByClassName('bg-page-cover')[0].style.backgroundImage = "url('./img/black_image.png'), url('https://merestui.com/"+ this.dataApi.wedding.gallery_1 +"')";
      document.getElementsByClassName('bg-page1')[0].style.backgroundImage = "url('./img/black_image.png'), url('https://merestui.com/"+ this.dataApi.wedding.gallery_2 +"')";
      document.getElementsByClassName('bg-page4')[0].style.backgroundImage = "url('./img/black_image.png'), url('https://merestui.com/"+ this.dataApi.wedding.gallery_3 +"')";
      document.getElementsByClassName('bg-page5')[0].style.backgroundImage = "url('./img/black_image.png'), url('https://merestui.com/"+ this.dataApi.wedding.gallery_4 +"')";
      document.getElementsByClassName('bg-page9')[0].style.backgroundImage = "url('./img/black_image.png'), url('https://merestui.com/"+ this.dataApi.wedding.gallery_5 +"')";
      }      
      this.timeline = this.dataApi.stories;
    },
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

    showRemaining() {
      const timer = setInterval(() => {
        const now = new Date();
        const tanggal = new Date(this.dataApi.wedding.countdown_readable).toString('yyyy-MM-dd');
        const end = new Date(tanggal);
        const distance = end.getTime() - now.getTime();

        if (distance < 0) {
          clearInterval(timer);
          return;
        }

        const days = Math.floor(distance / this._days);
        const hours = Math.floor((distance % this._days) / this._hours);
        const minutes = Math.floor((distance % this._hours) / this._minutes);
        const seconds = Math.floor((distance % this._minutes) / this._seconds);
        this.displayMinutes = minutes < 10 ? '0' + minutes : minutes;
        this.displaySeconds = seconds < 10 ? '0' + seconds : seconds;
        this.displayHours = hours < 10 ? '0' + hours : hours;
        this.displayDays = days < 10 ? '0' + days : days;
      }, 1000);
    }
  },

  created() {
    this.loadData();
  },

  updated(){
    this.background();
  },

  mounted() {
    this.showRemaining();
  },

  computed: {
    totalUcapan() {
      return this.ucapan.length;
    },
    _seconds: () => 1000,
    _minutes() {
      return this._seconds * 60;
    },
    _hours() {
      return this._minutes * 60;
    },
    _days() {
      return this._hours * 24;
    }
  }
})