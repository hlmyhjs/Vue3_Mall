<template>
  <div class="viewList">
    <a v-for="item in recommendData" :key="item.goods_id" class="item" @click="goToDetail(item.id)">
      <img v-lazy="item.goods_img" class="item-img" />
      <div class="item-con">
        <h3>{{ item.goods_name }}</h3>
        <div class="attr">
          <span v-for="tag in tagList(item.tag)" :key="tag" class="word">{{ tag }}</span>
        </div>
        <div class="item-price">
          <sub>¥</sub>{{ item.price }}
          <del><sub>¥</sub>{{ item.old_price }}</del>
        </div>
        <div class="item-count">
          <span>已售{{ item.sales }}</span>
        </div>
      </div>
    </a>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

defineProps({
  recommendData: Array
})

const router = useRouter()
const goToDetail = (id) => {
  router.push({
    path: '/detail',
    query: {
      id
    }
  })
}

const tagList = (data) => data?.split(',')
</script>

<style lang="scss" scoped>
.viewList {
  padding: 0 8px;
  .item {
    display: flex;
    padding: 8px 0;
    padding-right: 8px;
    min-height: 140px;
    position: relative;
    background: #fff;
    align-items: center;

    &:after {
      content: '';
      display: block;
      position: absolute;
      border-bottom: 1px solid rgba(0, 0, 0, 0.15);
      left: 0;
      bottom: 0;
      transform-origin: 0 bottom;
      width: 100%;
      transform: scaleY(0.8);
    }

    &:nth-last-child(1)::after {
      border-bottom: none;
    }

    .item-img {
      width: 125px;
      height: 125px;
      position: relative;
    }
    .item-con {
      text-align: left;
      margin-left: 13px;
      h3 {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.87);
        line-height: 21px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        font-weight: 400;
      }
      .item-desc {
        font-size: 11px;
        line-height: 15px;
        color: rgba(0, 0, 0, 0.54);
        margin-top: 1.35px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }

      .item-price {
        color: $primary;
        font-size: 16px;
        line-height: 1;
        margin-top: 12px;
        sub {
          font-size: 12px;
          margin-right: 3px;
        }
        del {
          margin-left: 3px;
          color: rgba(0, 0, 0, 0.54);
          font-size: 12px;
          line-height: 24px;
          sub {
            top: -0.48px;
            vertical-align: baseline;
          }
        }
      }
      .item-count {
        color: rgba(0, 0, 0, 0.54);
        font-size: 12.5px;
        line-height: 15px;
        margin-top: 6px;
      }
    }
  }
}

.attr {
  margin: 3px 0 1px;
  height: 15px;
  overflow: hidden;
  span {
    float: left;
    padding: 0 5px;
    border-radius: 1px;
    font-size: 10px;
    height: 15px;
    line-height: 15px;
    color: #999;
    background-color: #f2f2f7;
    &:not(:last-child) {
      margin-right: 5px;
    }
  }
}
</style>
