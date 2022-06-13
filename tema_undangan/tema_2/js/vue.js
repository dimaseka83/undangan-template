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
      ucapan: [],
      form: [{
        nama: '',
        ucapan: '',
      }],
      // formBalasan: [{
      //   nama: '',
      //   ucapan: '',
      // }],
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
      this.loading = true;
      setTimeout(() => {
        axios.get('https://merestui.com/api/vindirendra').then(response => {
        this.dataApi = response.data.data;
        this.loading = false;
      });
      }, 1000);
    },

    scrollPlay() {
      var audio = this.$refs.audioElm;
      audio.play();
      this.openInvitation = true;
    },
    kirimUcapan() {
      // this.ucapan.push({
      //   nama: this.form.nama,
      //   ucapan: this.form.ucapan,
      //   kehadiran: this.form.kehadiran,
      //   // reply: []
      // });
      axios.post('https://merestui.com/api/'+this.dataApi.order.url+'/comment/store',{
        ref_no: "1",
        name: this.form.nama,
        write_as: this.form.nama,
        sosmed: this.form.nama,
        comment: this.form.ucapan,
      })
      this.form = [{
        nama: '',
        ucapan: '',
        // reply: []
      }];
      this.loadData();
        },

    // kirimBalasan(id) {
    //   this.ucapan[id].reply.push({
    //     nama: this.formBalasan.nama,
    //     ucapan: this.formBalasan.ucapan,
    //   });
    //   this.formBalasan = [{
    //     nama: '',
    //     ucapan: '',
    //   }];
    // },

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

  mounted() {
    this.showRemaining();
  },

  computed: {
    totalUcapan() {
      if(this.loading == false){
        return this.dataApi.comments.length;
      }
    },
        displayDesktop() {
      return this.$vuetify.breakpoint.width >= 500
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