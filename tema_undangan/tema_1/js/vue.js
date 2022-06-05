new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  data: {
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
    daysCountdown: [
      {
        day: '',
        hour: '',
        minute: '',
        second: '',
      }
    ],
  },
  methods: {
    loadData() {
      axios.get('https://merestui.com/api/vindirendra').then(response => {
        this.dataApi = response.data.data;
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
    }
  },

  created() {
    this.loadData();
  },

  mounted() {
    this.countdown();
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
        countdown() {
      
          setTimeout(() => {
        var date = new Date();
      var time = date.getTime();
      var countDownDate = new Date(this.dataApi.wedding.countdown_readable).getTime();
      var distance = countDownDate - time;
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      this.daysCountdown.day = days;
      this.daysCountdown.hour = hours;
      this.daysCountdown.minute = minutes;
          this.daysCountdown.second = seconds;        
      }, 1000);
    }
  },
});