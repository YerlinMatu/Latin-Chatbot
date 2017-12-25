const app = new Vue({
  
  el: '#app',
  data: {
    user: 'Yerlin Matu',
    msg: '',
    state: 'Leído',
    msgDB: [`Hola, solo sé hablar en latín.`],
  },
  methods: {
    sendMsg() {
      if (this.msg !== '') {
      if (this.msgDB.length > 2) { 
           let tempMsg = this.msgDB.pop();
           this.msgDB = [];
           this.msgDB.push(tempMsg);
      }
      this.msgDB.push(this.msg);
      this.msg = '';
      setTimeout(() => { this.state = 'Escribiendo...' }, 1000);
      setTimeout(() => {
        const endpoint = 'https://jsonplaceholder.typicode.com/posts?id=';
        const random_num = this.randomNumber(100, 1)
        axios.get(endpoint.concat(random_num))
          .then((comment) => {
          this.msgDB.push(comment.data[0].title); 
          this.notification();
          this.state = 'Leído';
        })
      }, this.randomNumber(6, 1) * 1000)
    }
  },
    notification() {
      let sound = new Audio();
      sound.src = 'http://www.sonidosmp3gratis.com/sounds/mejilla_2';
      sound.load(); sound.play();
    },
    randomNumber(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
  }
});

Vue.filter('capitalize', (value) => {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})