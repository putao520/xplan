<template>
  <div ref="container" class="container">
    <div class="context">选择地区</div>
    <div class="row">
        <list-area ref="flist" v-on:fSel = "fSel" :selCallback="fSel"></list-area>
        <list-area ref ="slist" v-on:sSel = "sSel" :selCallback="sSel"></list-area>
        <!--
        <select v-model="f.cc" v-show="county.length>0" @change="result">
          <option :value="i" v-for="(v,i) in county" :key="v.id">{{v.name}}</option>
        </select>
        -->
    </div>
  </div>
</template>
<style scoped>
  .container{
    z-index: 10;
    display: none;
    position: absolute;
    width: 80%;
    height: 80%;
    /* overflow: scroll; */
    left: 10%;
    top: 10%;
    background-color: rgba(0,0,0,0.8);
    box-shadow: 0 0 18px #53a7de;
  }
  .context{
    text-align: center;
    color: #53a7de;
    font-size: 18px;
    margin: 10px;
  }
  .row{
    position: absolute;
    height: 100%;
    width: 100%;
  }
</style>

<script>
  // import data from './data'
  import $ from 'jquery'
  import ListArea from '@/views/ListArea'
export default {
    components: {
      'list-area': ListArea
    },

    data: function () {
      return {
        data: {},
        // 每一列已选择数据
        sels: [undefined, undefined, undefined],
        clickCallback: [undefined, undefined, undefined]
      }
    },
    props: {
    },
    created: function () {
    },
    methods: {
      // 记录第一级值
      fSel (val) {
        this.sels[0] = val
        // 判断是否显示第二级
        if (this.data[val].hasOwnProperty('child')) {  // 包含子节点
          // 填充第二级数据
          let secList = this.$refs.slist
          secList.clear()
          let childNode = this.data[val].child
          for (let k in childNode) {
            let v = childNode[k]
            secList.add(k, v)
          }
          if (this.clickCallback[0]) {
            this.clickCallback[0](val)
          }
          // 动画方式载入第二级list
          let curList = this.$refs.flist
          curList.hide()
          secList.show()
        } else { // 没有下一级
          if (this.clickCallback[1]) {
            this.clickCallback[1](this.sels[0], undefined)
          }
        }
      },
      // 记录第二级值
      sSel (val) {
        this.sels[1] = val
        if (this.clickCallback[1]) {
          this.clickCallback[1](this.sels[0], this.sels[1])
        }
      },
      // 返回结果值
      result () {
        return this.sels
      },
      hide () {
        $(this.$refs.container).fadeOut()
      },
      show () {
        $(this.$refs.container).fadeIn()
      },
      addClickCallback (idx, fn) {
        this.clickCallback[idx] = fn
      },
      // 导入tree数据,载入第一级数据
      /**
      {
        key: {
         value:
         child:
        }
        }
      * */
      importJson (json) {
        this.data = json
        let fList = this.$refs.flist
        fList.show()
        for (let k in json) {
          let v = json[k]
          fList.add(k, v.value)
        }
      }
    }
  }
</script>
