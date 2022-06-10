new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  data() {
    return {
      dataApi: [],
      loading: true,
      value: 'home',
      openInvitation: false,
      ucapan: [],
      form: [{
        nama: '',
        ucapan: '',
        kehadiran: '',
      }],
      kehadiran: ['Hadir', 'Tidak Hadir'],
      displayDays: 0,
      displayHours: 0,
      displayMinutes: 0,
      displaySeconds: 0,
    }
  },

  methods: {
    kirimUcapan() {
      this.ucapan.push({
        nama: this.form.nama,
        ucapan: this.form.ucapan,
        kehadiran: this.form.kehadiran,
        // reply: []
      });
      // axios.post('https://merestui.com/api/'+this.dataApi.order.url+'/comment/store',{
      //   ref_no: "1",
      //   name: this.form.nama,
      //   write_as: this.form.nama,
      //   sosmed: this.form.nama,
      //   comment: this.form.ucapan,
      // })
      this.form = [{
        nama: '',
        ucapan: '',
        kehadiran: '',
        // reply: []
      }];
    },
    loadData() {
      axios.get('https://merestui.com/api/vindirendra').then(response => {
        this.dataApi = response.data.data;
        this.loading = false;
      });
    },
    scrollPlay() {
      var audio = this.$refs.audioElm;
      audio.play();
      this.openInvitation = true;
    },
    background() {
      document.getElementsByClassName('bg-page1')[0].style.backgroundImage = "url('./img/black_image.png'), url('https://merestui.com/" + this.dataApi.wedding.gallery_1 + "')";
    },
    openUrl(url) {
      window.open(url, '_blank');
    },

    copy1() {
      this.selectText(this.$refs.rekening1);
      document.execCommand('copy');
    },

    copy2() {
      this.selectText(this.$refs.rekening2);
      document.execCommand('copy');
    },

    selectText(element) {
      var range;
      if (document.selection) {
        // IE
        range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
      } else if (window.getSelection) {
        range = document.createRange();
        range.selectNode(element);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
      }
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

  mounted() {
    this.showRemaining();
  },

  updated() {
    this.background();
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
    },
    getDayOnlyAkad() {
      if (this.loading == false) {
        return this.dataApi.wedding.tanggal_akad.split(' ')[0];
      }
    },
    getTanggalAkad() {
      if (this.loading == false) {
        return this.dataApi.wedding.tanggal_akad.split(",")[1];
      }
    },
    getDayOnlyResepsi() {
      if (this.loading == false) {
        return this.dataApi.wedding.tanggal_resepsi.split(' ')[0];
      }
    },
    getTanggalResepsi() {
      if (this.loading == false) {
        return this.dataApi.wedding.tanggal_resepsi.split(",")[1];
      }
    },
    namaRekening1() {
      if (this.loading == false) {
        return this.dataApi.wedding.rek_1.split('-')[2];
      }
    },
    nomorRekening1() {
      if (this.loading == false) {
        return this.dataApi.wedding.rek_1.split('-')[1];
      }
    },
    namaRekening2() {
      if (this.loading == false) {
        return this.dataApi.wedding.rek_2.split('-')[2];
      }
    },
    nomorRekening2() {
      if (this.loading == false) {
        return this.dataApi.wedding.rek_2.split('-')[1];
      }
    }
  }
});