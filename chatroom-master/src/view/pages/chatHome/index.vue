<template>
  <div class="chatHome">
    <div class="chatLeft">
      <div class="title">

      </div>
      <div class="online-person">
        <span class="onlin-text">聊天列表</span>

        <div class="person-cards-wrapper">
          <div class="addChatCard">
            <div class="chat-group">
              <div class="input-group">
                <input type="text" v-model="chatName" placeholder="输入聊天名称" />
                <input type="number" v-model="personLimit" placeholder="输入人数限制" />
              </div>
              <button @click="createChatCard">创建聊天卡片</button>
            </div>
          </div>
          <div class="addChatCard">
            <div class="chat-group">
              <div class="input-group">
                <input type="number" v-model="chatId" placeholder="输入聊天室id" />
              </div>
              <button @click="inChatCard">添加聊天卡片</button>
            </div>
          </div>
          <div class="personList" v-for="personInfo in personList" :key="personInfo.chatCardId"
            @click="clickPerson(personInfo)">
            <PersonCard :personInfo="personInfo" :pcCurrent="pcCurrent"></PersonCard>
          </div>

        </div>
      </div>
    </div>
    <div class="chatRight">
      <!-- <router-view></router-view> -->
      <div v-if="showChatWindow">
        <ChatWindow :frinedInfo="chatWindowInfo" @personCardSort="personCardSort"></ChatWindow>
      </div>
      <div class="showIcon" v-else>
        <span class="iconfont icon-snapchat"></span>
        <!-- <img src="@/assets/img/snapchat.png" alt="" /> -->
      </div>
    </div>
    <!-- <el-col :span="4"><div class="grid-content bg-purple"></div></el-col> -->
  </div>
</template>

<script>
import PersonCard from "@/components/PersonCard.vue";
import ChatWindow from "./chatwindow.vue";
import { decoded } from "@/api/getData"
import { getFriend } from "@/api/getData";
import axios from "axios";
export default {
  name: "App",
  components: {
    PersonCard,
    ChatWindow,
  },
  data() {
    return {
      chatId: '',  //聊天室id
      chatName: '', // 聊天名称
      personLimit: '', // 人数限制
      pcCurrent: "",
      personList: [],
      showChatWindow: false,
      chatWindowInfo: {},
    };
  },
  mounted() {
    axios.post("http://127.0.0.1:9025/friend/friendList", { "email": decoded.email }).then(res => {
      this.$message({
        showClose: true,
        message: "聊天列表加载完毕",
        type: res.data.code == 200 ? 'success' : 'error'
      })
      console.log("message:" + res.data.message);
      this.personList = res.data.message;
    }).catch(err => {
      console.log(err.response.data.message)
    });
  },
  methods: {
    clickPerson(info) {
      this.showChatWindow = true;
      this.chatWindowInfo = info;
      this.personInfo = info;
      this.pcCurrent = info.id;
    },
    personCardSort(id) {
      if (id !== this.personList[0].id) {
        console.log(id);
        let nowPersonInfo;
        for (let i = 0; i < this.personList.length; i++) {
          if (this.personList[i].id == id) {
            nowPersonInfo = this.personList[i];
            this.personList.splice(i, 1);
            break;
          }
        }
        this.personList.unshift(nowPersonInfo);
      }
    },
    createChatCard() {
      // 获取chatId和personLimit的值
      const chatName = this.chatName;
      const personLimit = this.personLimit;
      // 构造请求数据
      const ChatCardDate = {
        creatUserId: decoded.sub,
        chatName: chatName,
        personLimit: personLimit,
      };
      console.log("creadUserId:"+decoded.sub)
      // 进行相应的处理
      axios.post('http://localhost:9025/friend/creatChatRoom', ChatCardDate)
        .then(response => {
          if (response.data.code == null) {
            this.$message({
              showClose: true,
              message: response.data.message,
              type: 'error'
            })
          } else {
           
            this.$message({
              showClose: true,
              message: '你的聊天室id为：' + response.data.message,
              type: 'success'
            })
          }

        })

    },
    inChatCard() {
      
      const chatId=this.chatId   // 构造请求数据
      const JoinChatData = {
        userId: decoded.sub,
        chatCardId: chatId,
      
      };
        axios.post("/friend/JoinChatCard",JoinChatData).then(res=>{
            this.$message({
              showClose: true,
              message: res.data.message,
              type:  res.data.code==null ?'error':'succrss'
            })
        }).catch( err=>{
         
      console.log(err.response.data.message)
    

        })
    }

  },
};
</script>

<style lang="scss" scoped>
.chatHome {
  // margin-top: 20px;
  display: flex;

  .chatLeft {
    width: 280px;

    .title {
      color: #fff;
      padding-left: 10px;
    }

    .online-person {
      margin-top: 0px;

      .onlin-text {
        padding-left: 10px;
        color: rgb(176, 178, 189);
      }

      .person-cards-wrapper {
        padding-left: 10px;
        height: 65vh;
        margin-top: 20px;
        overflow: hidden;
        overflow-y: scroll;
        box-sizing: border-box;

        .addChatCard {
          width: 250px;
          height: 80px;
          border-radius: 10px;
          background-color: rgb(224, 227, 239);
          position: relative;
          margin: 25px 0;
          cursor: pointer;

          .chat-group {
            padding-left: 2px;
            padding-top: 7px;
            position: absolute;
            left: 50%;
            top: 50%;
            width: 90%;
            transform: translate(-50%, -50%);
            overflow: hidden;
            display: flex;
          }

        }

        &::-webkit-scrollbar {
          width: 0;
          /* Safari,Chrome 隐藏滚动条 */
          height: 0;
          /* Safari,Chrome 隐藏滚动条 */
          display: none;
          /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
        }

      }
    }
  }

  .chatRight {
    flex: 1;
    padding-right: 30px;

    .showIcon {
      position: absolute;
      top: calc(50% - 150px);
      /*垂直居中 */
      left: calc(50% - 50px);

      /*水平居中 */
      .icon-snapchat {
        width: 300px;
        height: 300px;
        font-size: 300px;
        // color: rgb(28, 30, 44);
      }
    }
  }
}
</style>