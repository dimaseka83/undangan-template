new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  data: {
    loading: true,
    arrow: false,
    openInvitation: false,
    dataApi: [],
    ucapan: [],
    dialog: false,
    dialog1: false,
    form: [{
      nama: '',
      ucapan: '',
      write_as: '',
      sosmed: '',
    }],
    formBalasan: [{
      nama: '',
      ucapan: '',
    }],
    dialog: false,
    displayDays: 0,
    displayHours: 0,
    displayMinutes: 0,
    displaySeconds: 0,
      asc: false,
      desc: false,
      isPlay: true,
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
      axios.post('https://merestui.com/api/' + this.dataApi.order.url + '/comment/store', {
        ref_no: "1",
        name: this.form.nama,
        write_as: this.form.write_as,
        sosmed: this.form.sosmed,
        comment: this.form.ucapan,
      })
      this.form = [{
        nama: '',
        ucapan: '',
        write_as: '',
        sosmed: '',
        // reply: []
      }];
      this.loadData();
                  setTimeout(() => {
                this.scrollPlay();
                document.getElementById('guestBook').scrollIntoView();
            }, 2000);
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

        console.log(tanggal);
        console.log(end)

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
    },

    playMe(){
      this.isPlay = !this.isPlay;
      let audio = this.$refs.audioElm;
      if(this.isPlay){
        audio.play();
      }else{
        audio.pause();
      }
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
      if (this.loading == false) {
        return this.dataApi.comments.length;
      }
    },
    displayDesktop() {
      return this.$vuetify.breakpoint.width >= 500
    },
    buttonGift() {
      if (this.displayDesktop) {
        return '';
      } else {
        return 'mb-5';
      }
    },

    comments() {
      if (this.displayDesktop) {
        return 'ml-16';
      } else {
        return 'ml-2';
      }
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
    },
        sorted() {
      if (this.asc) {
          return _.orderBy(this.dataApi.comments, 'created_at', 'asc');

      } else if (this.desc) {
                  return _.orderBy(this.dataApi.comments, 'created_at', 'desc');
      }
      return this.dataApi.comments;
    },
  },

  watch: {
    asc(newVal) {
      if (this.newest.desc && newVal) {
        this.newest.desc = false;
      }
    },

    desc(newVal) {
      if (this.newest.asc && newVal) {
        this.newest.asc = false;
      }
    }
  }
});