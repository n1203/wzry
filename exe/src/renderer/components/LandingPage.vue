<template>
  <div id="wrapper">
    <img id="logo" src="~@/assets/logo.png" alt="electron-vue" />
    <main>
      <span class="title">Welcome to KDprint</span>
      <br />
      <i-button type="info" @click.native="open">开启系统</i-button>
	  <input type="text" value="url" @change="down(url)">
    </main>
  </div>
</template>

<script>
import SystemInformation from "./LandingPage/SystemInformation";
import axios from "axios";
export default {
  name: "landing-page",
  components: { SystemInformation },
  data:{
	  url:''
  },
  methods: {
    open() {
      setInterval(() =>{
        axios
          .get("http://localhost:3000/print/al/monitor")
          .then((response)=> { 
			
			console.log(response.data[0].url);
          });
      }, 3000);
    },
	down(url){
		console.log(url)
	}
  }
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Source Sans Pro", sans-serif;
}

#wrapper {
  text-align: center;
  padding: 100px 0;
}

#logo {
  height: auto;
  margin-bottom: 20px;
  width: 200px;
}

main {
  display: flex;
  justify-content: space-between;
}

main > div {
  flex-basis: 50%;
}

.left-side {
  display: flex;
  flex-direction: column;
}

.welcome {
  color: #555;
  font-size: 23px;
  margin-bottom: 10px;
}

.title {
  color: #2c3e50;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 6px;
}

.title.alt {
  font-size: 18px;
  margin-bottom: 10px;
}

.doc p {
  color: black;
  margin-bottom: 10px;
}

.doc button {
  font-size: 0.8em;
  cursor: pointer;
  outline: none;
  padding: 0.75em 2em;
  border-radius: 2em;
  display: inline-block;
  color: #fff;
  background-color: #4fc08d;
  transition: all 0.15s ease;
  box-sizing: border-box;
  border: 1px solid #4fc08d;
}

.doc button.alt {
  color: #42b983;
  background-color: transparent;
}
</style>
