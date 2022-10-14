<template>
  <floor title="新人专享">
    <van-skeleton title :row="3" :loading="loading">
      <div class="content">
        <div class="left" @click="goDetail(newcomers.left)">
          <div class="name">{{ newcomers.left.name }}</div>
          <div class="imgWrap">
            <div style="min-height: 1px">
              <div class="img">
                <img :src="newcomers.left.img_url" />
              </div>
            </div>
            <div class="animate"></div>
          </div>
        </div>
        <div class="right">
          <div v-for="item in newcomers.right" :key="item.id" class="module" @click="goDetail(item)">
            <div class="m-activityItem">
              <div class="picWrap">
                <div class="pic">
                  <img :src="item.img_url" />
                </div>
                <div class="discount">
                  <div v-for="price in item.discount" :key="price" class="line">{{ price }}</div>
                </div>
              </div>
              <div class="cnt">
                <div class="title">{{ item.name }}</div>
                <div class="subTitle">{{ item.subTitle }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-skeleton>
  </floor>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Floor from 'components/floor/floor'

defineProps({
  newcomers: Object,
  loading: Boolean
})

const router = useRouter()

const goDetail = (item) => {
  router.push({
    name: 'categoryDetail',
    params: {
      key: item.name,
      id: item.id
    }
  })
}
</script>

<style lang="scss" scoped>
.floor-box {
  margin-top: 5px;
}
.content {
  display: flex;
  justify-content: center;
  padding: 8px 5px 0px;
  overflow: hidden;
  .left {
    display: block;
    width: 50%;
    height: 240px;
    background: #f9e9cf;
    border-radius: 2px;
    margin-right: 2px;
    color: #333;
    .name {
      font-family: PingFangSC-Medium;
      font-size: 18px;
      padding: 16px 0 0 16px;
    }
    .imgWrap {
      margin: 20px auto;
      width: 140px;
      height: 140px;
      position: relative;
      .img {
        width: 140px;
        height: 140px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .animate {
        position: absolute;
        width: 16.5px;
        height: 10px;
        bottom: 10px;
        right: 36px;
        background: url('https://yanxuan.nosdn.127.net/3f7e731c6650bc1770589c78bd5a18b7.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        -webkit-animation: carousel 1s linear infinite;
        animation: carousel 1s linear infinite;
      }
    }
  }
  .right {
    height: 240px;
    width: 50%;
    .module {
      background: #fbe2d3;
      border-radius: 4px;
      width: 100%;
      height: 119.5px;
      margin-bottom: 2px;
      .m-activityItem {
        height: 120px;
        position: relative;
        display: block;
        color: #333;
        width: 190px;
        height: 120px;
        float: left;
        border-radius: 2px;
        margin: 2px 2px 0;
        font-size: 13px;
        padding: 10px 0 0 16px;
        .picWrap {
          top: 8px;
          width: 120px;
          height: 120px;
          position: absolute;
          right: 0;
          top: 0;
          .pic {
            width: 110px;
            height: 110px;
            & > img {
              width: 100%;
              height: auto;
            }
          }
          .discount {
            position: absolute;
            top: 16px;
            right: 25px;
            width: 42px;
            height: 42px;
            opacity: 0.8;
            background: #f59524;
            border-radius: 50%;
            padding-top: 6px;
            color: #fff;
            text-align: center;
            .line {
              font-size: 13px;
            }
            div:nth-child(2) {
              text-decoration: line-through;
            }
          }
        }
        .cnt {
          position: relative;
          .title {
            font-family: PingFangSC-Medium;
            font-size: 18px;
          }
          .subTitle {
            color: #7f7f7f;
          }
        }
      }
    }
  }
}
</style>
