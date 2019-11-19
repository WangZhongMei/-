<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea data-v-4ed6dd4f="" placeholder="请输入要BB的内容（做多吐槽120字）" maxlength="120" v-model="msg"></textarea>
        <button class="mint-button mint-button--primary mint-button--large" @click="publish">
            <label class="mint-button-text">发表评论</label>
        </button>
        <div class="cmt-list" v-for="(item, index) in comments" :key="index">
            <div  data-v-4ed6dd4f="" class="cmt-item">
                <div  data-v-4ed6dd4f="" class="cmt-title">第{{index+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time | dateFormat}}</div>
                <div class="cmt-body">{{item.content===''?'此用户很懒,什么都没说':item.content}}</div>
            </div>
        </div>
        <button class="mint-button mint-button--danger mint-button--large is-plain" @click="getMore">
            <label class="mint-button-text">加载更多</label>
        </button>
    </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      pageIndex: 1,
      comments:[],
      msg:""
    };
  },
  created() {
    this.getComments()
  },
  methods: {
    getComments() {
        this.$http.get('api/getcomments/'+this.id+'?pageindex='+ this.pageIndex).then(result => {
          if (result.body.status === 0) {
            //this.comments = result.body.message;
            this.comments = this.comments.concat(result.body.message);
          } else {
            Toast("新闻评论信息加载失败");
          }
      });
      
    },
    getMore(){
          var num=this.pageIndex++;
          // console.log(num);
          this.$http.get('api/getcomments/'+this.id+'?pageindex='+ (num+1)).then(result => {
              console.log(this.pageIndex);
              if (result.body.message.length > 0) {
                this.getComments();
              } else {
                Toast("没有更多数据");
              }
          });

        // pageIndex++;
        // this.getComments();
    },
    publish(){
        if (this.msg.trim().length===0) {
            return Toast("评论内容不能为空")
        }
      this.$http.post("api/postcomment/" + this.$route.params.id, {
          content: this.msg.trim()
        }).then(response => {
          if (response.body.status === 0) {
              var comment={
                user_name:'匿名用户',
                add_time:Date.now(),
                content:this.msg.trim()
              }
              this.comments.unshift(comment)
              this.msg=""
          } else {
              console.log("add error")
          }
      })
    }
  },
  props:["id"]
};
</script>

<style lang="scss" scoped>
  .cmt-container h3{
    font-size: 18px;
    line-height: 1;
    margin-top: 5px;
    margin-bottom: 5px;
    display: block;
    font-weight: bold;
    font-family: 'Helvetica Neue', Helvetica, sans-serif;
  }

  textarea[data-v-4ed6dd4f] {
    font-size: 14px;
    height: 85px;
    margin: 0;
}
 textarea {
    height: auto;
    resize: none;
}
.cmt-list .cmt-item .cmt-title[data-v-4ed6dd4f] {
    line-height: 30px;
    background-color: #ccc;
}
.cmt-list .cmt-item[data-v-4ed6dd4f] {
    font-size: 13px;
}
.cmt-body{
  line-height: 35px;
    text-indent: 2em;
    font-size: 13px;
}
</style>