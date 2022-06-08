new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data() {
        return {
            value: 1,
            items: [
                {
                  src: 'https://digition.id/wp-content/uploads/2022/01/107077483-305398767491171-1941002224051595105-n-054ec2eac32ec6ec0469281ae9d35311-1.jpg',
                },
                {
                  src: 'https://digition.id/wp-content/uploads/2022/01/107827249-446177529598899-739618938078378725-n-e154248ba002e139fef7d60d374e9d9d.jpg',
                },
                {
                  src: 'https://digition.id/wp-content/uploads/2022/01/107378535-390608995231751-2801653375802710009-n-1ec00e7d9d4aa7cf58dc825091bbeb33.jpg',
                },
              ],
              kehadiran: ['Hadir', 'Tidak Hadir'],
        }
    },

    methods: {
        copy(){
            this.selectText(this.$refs.rekening);
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
          }
    },
})