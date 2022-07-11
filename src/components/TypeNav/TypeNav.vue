<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseenter="enterShow" @mouseleave="leaveShow">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                @mouseenter="changeIndex(index)"
                @mouseleave="changeIndex(-1)"
              >
                <h3 :class="{ cur: currentIndex === index }">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex === index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
// 按需导入lodash的节流
import throttle from 'lodash/throttle'
import { mapState } from 'vuex'
export default {
  name: 'TypeNav',
  data() {
    return {
      currentIndex: -1,
      // 控制TypeNav组件的显示与隐藏
      show: true
    }
  },
  methods: {
    // changeIndex(i){
    //   this.currentIndex = i
    // }
    changeIndex: throttle(function (i) {
      this.currentIndex = i
    }),
    // 点击链接路由跳转前往search页面
    // 采用事件委派+编程式导航
    // 存在的问题：怎么确定点击的是a标签
    goSearch(e) {
      let element = e.target
      // 解决问题，给a标签添加data-属性，其余节点没有
      let { categoryname, category1id, category2id, category3id } = element.dataset
      let location = { name: 'search' }
      // console.log(categoryname, category1id, category2id, category3id)
      if (categoryname) {
        const query = { categoryName: categoryname }
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else {
          query.category3Id = category3id
        }
        // console.log(query);
        // this.$router.push({name: 'search', query})
        location.query = query

        if(this.$route.params){
          location.params = this.$route.params
        }

        this.$router.push(location)
      }
    },
    // 鼠标移入，展示三级联动
    enterShow(){
      this.show = true
    },
    // 当鼠标移开，让三级联动隐藏
    leaveShow(){
      // 如果当前路由不是home才隐藏
      if(this.$route.path !== '/home'){
        this.show = false
      }
    }
  },
  mounted() {
    // 根据路由判断，如果不是home组件，就让三级联动隐藏
    if(this.$route.path !== '/home'){
      this.show = false
    }else{
      this.show = true
    }
  },
  computed: {
    ...mapState('home', ['categoryList']),
  },
}
</script>

<style scoped lang="less">
.cur {
  background-color: pink;
}
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
      }
    }

    // 过渡动画的样式
    // 过渡动画开始状态（进入）
    .sort-enter{
      height: 0;
      opacity: 0;
    }

    .sort-enter-to{
      height: 461px;
      opacity: 1;
    }

    .sort-enter-active{
      transition: .2s all linear;
    }
  }
}
</style>
