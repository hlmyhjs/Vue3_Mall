<template>
  <div class="comment-list">
    <div class="comment-header">
      <div class="comment-header-left">评价(2000+)</div>
      <div class="comment-header-right">查看全部<span class="arrow"></span></div>
    </div>
    <div class="list">
      <div v-for="(item, index) in commentList" :key="index" class="comment-item">
        <div class="comment-header">
          <img :src="item.avatar" class="comment-avatar" />
          <div class="comment-user">
            <p class="comment-name">{{ item.name }}</p>
            <p class="comment-time">{{ item.time }}</p>
          </div>
        </div>
        <div class="comment-content">
          <p class="comment-text">
            {{ item.content }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const commentList = reactive([
  {
    id: 1,
    name: '游客***',
    avatar: 'https://img.gejiba.com/images/77fd22e5aca8a7e659eb8bbc88cd0514.jpg',
    content: '质量好，做工也不错，尺码合适，款式简单大方，穿上很好看，满意',
    time: '2022-2-21'
  },
  {
    id: 2,
    name: 'baiyuda',
    avatar:
      'https://img11.360buyimg.com/jdphoto/s40x40_jfs/t1/25255/18/10701/1678/5c89f892E78c04688/684d63c0d68e39b1.png',
    content: '质量很好，冰冰凉凉的，款式容易搭配，尺码合适，面料真的很舒服，价格合理，',
    time: '2021-12-18'
  }
])
</script>

<style lang="scss" scoped>
.comment-list {
  background-color: #fff;
  padding: 10px 15px;
  width: 100%;
  box-sizing: border-box; // 解决上方右内边距无效问题
  .comment-header {
    align-items: center;
    display: flex;
    justify-content: space-between;
    .comment-header-left {
      color: #222;
      font-size: 15px;
      font-weight: 600;
      &:before {
        background-color: $primary;
        color: $primary;
        content: 'l';
        margin-right: 5px;
      }
    }
    .comment-header-right {
      align-items: center;
      color: $primary;
      display: flex;
      font-size: 15px;
      margin-right: 7.5px;
      padding: 5px;
      .arrow {
        border-right: 1px solid $primary;
        border-top: 1px solid $primary;
        height: 6.5px;
        position: relative;
        transform: rotate(45deg);
        width: 6.5px;
      }
    }
  }
  .list {
    width: 100%;
    .comment-item:first-child {
      margin-top: 12.5px;
    }
    .comment-item {
      margin-top: 30px;
      position: relative;
      width: 100%;
      .comment-header {
        display: flex;
        height: 40px;
        justify-content: left;
        align-items: center;
        .comment-avatar {
          border-radius: 500px;
          height: 35px;
          width: 35px;
        }
        .comment-user {
          display: flex;
          flex: 1 1;
          flex-direction: column;
          height: 100%;
          justify-content: space-between;
          margin-left: 5px;
          .comment-name {
            color: #222;
            font-size: 15px;
          }
          .comment-time {
            color: #999;
            font-size: 12.5px;
          }
        }
      }
      .comment-content {
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        color: #222;
        display: -webkit-box;
        font-size: 15px;
        line-height: 1.4;
        margin-top: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
        word-break: break-all;
      }
    }
  }
}
</style>
