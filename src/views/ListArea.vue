<template>
  <transition name="fade">
  <div class="col" v-show="visable">
    <!--
    <div class="search bar6">
      <form>
        <input type="text" placeholder="请输入..." name="inputdata"  v-model="inputdata" readonly="readonly" >
        <button type="submit"></button>
      </form>
    </div>
    -->
    <ul>
      <li v-for="(k,v) in data" v-on:click="selItem($event)" :valuekey="v" >{{k}}</li>
    </ul>
  </div>
  </transition>
</template>
<style scoped>
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
    overflow: scroll;
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
        data: {},
        sel: undefined
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
      add (key, value) {
        this.data[key] = value
      },
      remove (key) {
        delete this.data[key]
      },
      get (key) {
        return this.data[key]
      },
      clear () {
        this.data = {}
      },
      getSel () {
        return this.sel
      }
    }
  }
</script>
