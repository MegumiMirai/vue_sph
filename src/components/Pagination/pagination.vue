<template>
  <div class="pagination">
    <button :disabled="pageNo === 1" @click="pageHandler(pageNo - 1)">上一页</button>
    <button v-if="startNumAndEndNum.start > 1" @click="pageHandler(1)" :class="{active : pageNo === 1}">1</button>
    <button v-if="startNumAndEndNum.start > 2">···</button>

    <button @click="pageHandler(page)" v-for="(page, index) in startNumAndEndNum.end" :key="index" v-show="page >= startNumAndEndNum.start" :class="{ active : pageNo === page }">{{page}}</button>
    
    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button v-if="startNumAndEndNum.end < totalPage" @click="pageHandler(totalPage)"  :class="{active : pageNo === totalPage}">{{totalPage}}</button>
    <button :disabled="pageNo === totalPage" @click="pageHandler(pageNo + 1)">下一页</button>
    
    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
  export default {
    name: "MyPagination",
    props: ['pageNo', 'pageSize', 'total', 'continus'],
    computed:{
      totalPage(){
        // 计算一共有多少页
        return Math.ceil(this.total / this.pageSize)
      },
      startNumAndEndNum(){
        let {pageNo, totalPage, continus} = this
        let start = 0
        let end = 0

        if(continus > totalPage){
          // 如果连续的页数大于总页数，将全部页面都显示
          start = 1
          end = totalPage
        }else{
          start = pageNo - Math.floor(continus / 2)
          end = pageNo + Math.floor(continus / 2)
          if(start < 1){
            start = 1
            end = continus
          }
          if(end > totalPage){
            start = totalPage - continus + 1
            end = totalPage
          }
        }

        return {start, end}
      }
    },
    methods:{
      // 自定义事件，传输将要跳转的页面给父组件
      pageHandler(page){
        // console.log(page);
        if(page < 1){
          page = 1
        }
        if(page > this.totalPage){
          page = this.totalPage
        }
        this.$emit('getPage', page)
      }
    }
  }
</script>

<style lang="less" scoped>
  .pagination {
    text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>