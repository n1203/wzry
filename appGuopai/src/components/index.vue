<template>
  <div>
    <x-header :left-options="{showBack: false}">景院裹派助手</x-header>
    <tab>
      <tab-item selected @on-item-click="onItemClick">未接订单</tab-item>
      <tab-item @on-item-click="onItemClick">已接订单</tab-item>
      <tab-item @on-item-click="onItemClick">派送中</tab-item>
    </tab>
    <div v-if="selectIndex==0">
      <tab>
        <tab-item
          :selected="i===0"
          @on-item-click="selectPostInc(item.name)"
          v-for="(item,i) in postInc"
          :key="i"
        >{{item.name}}</tab-item>
      </tab>
    </div>
    <div v-if="selectIndex==0">
      <div v-for="(item,i) in items" :key="i">
        <div class="orderItem">
          <badge :text="i+1<10?'0'+(i+1):i+1"></badge>
          {{item.name}}
          {{item.user.phone}}
          {{item.address}}
          {{item.time}}
          <x-button
            mini
            plain
            type="primary"
            @click.native="getOrders(item._id,item.postInc.name)"
          >接单</x-button>
        </div>
      </div>
    </div>

    <div v-if="selectIndex==1">
      <tab>
        <tab-item
          :selected="i===0"
          @on-item-click="doneOrders(item.name)"
          v-for="(item,i) in postInc"
          :key="i"
        >{{item.name}}</tab-item>
      </tab>
    </div>
    <div v-if="selectIndex==1">
      <div v-for="(item,i) in items" :key="i">
        <div class="orderItem">
          <badge :text="i+1<10?'0'+(i+1):i+1"></badge>
          {{item.name}}
          {{item.user.phone}}
          {{item.address}}
          {{item.time}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Tab, TabItem, XButton, XHeader, Panel, Badge } from "vux";

export default {
  components: {
    Tab,
    XButton,
    TabItem,
    XHeader,
    Panel,
    Badge
  },
  methods: {
    onItemClick(index) {
      this.selectIndex = index;
      this.selectPostInc(name);
    },
    selectPostInc(index) {
      this.$http.get("/getOrderCount").then(({ data }) => {
        this.items = data.filter(item => {
          return item.postInc.name == index;
        });
      });
    },
    getOrders(id, name) {
      console.log(id);
      this.$http
        .post("/setOrderCount", {
          params: {
            orderId: id,
            condition: 1
          }
        })
        .then(({ data }) => {
          this.selectPostInc(name);
        });
    },
    doneOrders(index) {
      this.$http.post("/getOrderCount").then(({ data }) => {
        this.items = data.filter(item => {
          return item.postInc.name == index;
        });
      });
    }
  },
  data() {
    return {
      postInc: [],
      items: [],
      selectIndex: 0,
      childSelectIndex: 0
    };
  },
  created() {
    this.$http.get("/postInc").then(({ data }) => {
      this.postInc = data;
      this.selectPostInc(this.postInc[0].name);
    });
  }
};
</script>