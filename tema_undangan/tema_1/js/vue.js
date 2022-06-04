new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: {
      arrow: false,
      openInvitation: false,
      ucapan: [],
      form: [
        {
          nama: '',
          ucapan: '',
        }
      ],
      formBalasan: [
        {
          nama: '',
          ucapan: '',
        }
      ],
      dialog: false,
    },
    methods: {
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
    
  computed: {
    totalUcapan() {
      return this.ucapan.length;
    },
    displayMobile() {
      return window.innerWidth < 768;
    }
  }
  })