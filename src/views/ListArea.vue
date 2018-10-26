<template>
  <transition name="fade">
  <div class="col" v-show="visable">
    <div class="search bar6">
      <form class="searchform">
        <input class="searchinput" type="text" placeholder="请输入..." name="inputdata"  v-model="inputdata">
        <button class="searchbutton" type="submit"></button>
      </form>
    </div>
    <ul>
      <li v-for="(k,v) in showData" v-on:click="selItem($event)" :valuekey="v" >{{k}}</li>
    </ul>
  </div>
  </transition>
</template>
<style scoped>
  .searchform {
    position: relative;
    margin: 0 auto;
    height: 100%;
  }

  .searchinput :focus{
    color: #b2ff1a;
  }

  .searchinput {
    width: 86%;
    height: 89%;
    padding-left: 13px;
    margin: 0 4%;
    color: #ffffff;
  }

  .searchbutton {
    height: 40px;
    width: 42px;
    cursor: pointer;
    position: absolute;
  }
  .col{
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 7;
  }
  /*搜索框6*/

  .bar6 input {
    border:2px solid #4a8bb7;
    background:transparent;
    top:0;
    right:0;
  }
  .bar6 button {
    background: #4a8bb7;
    top: 0;
    right: 4%;
  }
  .bar6 button:before {
    content:"搜索";
    font-size:13px;
    color:#F9F0DA;
  }
  ul{
    width: 80%;
    height: 70%;
    overflow-y: scroll;
    color: white;
  }
 </style>
<script>
  // import $ from 'jquery'
  import '@/assets/css/show.css'
  export default {
    data: function () {
      return {
        inputdata: '',
        visable: false,
        showData: {},
        data: {},
        sel: undefined
      }
    },
    watch: {
      inputdata: function (curVal, oldVal) {
        this.filter(curVal)
      }
    },
    props: {
      selCallback: undefined
    },
    methods: {
      show () {
        this.visable = true
      },
      hide () {
        this.visable = false
      },
      selItem (e) {
        this.sel = e.currentTarget.getAttribute('valuekey')
        if (this.selCallback) {
          this.selCallback(this.sel)
        }
      },
      updateShow (array) {
        this.showData = array
      },
      add (key, value) {
        this.data[key] = value
        this.updateShow(this.data)
      },
      remove (key) {
        delete this.data[key]
      },
      filter (key) {
        let newObj = {}
        for (let k in this.data) {
          let val = this.data[k]
          if (val.startsWith(key)) {
            newObj[k] = val
          }
        }
        this.updateShow(newObj)
      },
      get (key) {
        return this.data[key]
      },
      clear () {
        this.data = {}
        this.updateShow(this.data)
      },
      getSel () {
        return this.sel
      }
    }
  }
</script>
