new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  data: {
    loading: true,
    arrow: false,
    openInvitation: false,
    dataApi: [],
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
    displayDays: 0,
    displayHours: 0,
    displayMinutes: 0,
    displaySeconds: 0,
  },
  methods: {
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
      return this.ucapan.length;
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
    buttonLoad() {
      if (this.displayDesktop) {
        return '';
      } else {
        return 'mt-10';
      }
    },

    _seconds: () => 1000,
    _minutes(){
      return this._seconds * 60;
    },
    _hours(){
      return this._minutes * 60;
    },
    _days(){
      return this._hours * 24;
    }
    
  },
});