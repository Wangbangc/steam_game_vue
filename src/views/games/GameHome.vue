<template>
  <div class="chat-container">
    <div class="message-area">
      <div
        v-for="(message, index) in messages"
        :key="index"
        :class="{
          'user-message': message.role === 'user',
          'assistant-message': message.role === 'assistant',
          'loading-message': message.role === 'loading',
        }"
      >
        <span v-if="message.role === 'loading'">思考中...</span>
        <span v-else>{{ message.content }}</span>
      </div>
    </div>

    <div class="chat-input-container">
      <div class="input-wrapper">
        <el-input
          v-model="message"
          placeholder="给DeepSeek发送消息"
          @keyup.enter="sendMessage"
          class="chat-input"
        />
        <el-button class="attach-button" type="primary">
          <el-icon><Paperclip /></el-icon>
        </el-button>
        <el-button class="send-button" type="primary" @click="sendMessage('text')">
          发送
        </el-button>
      </div>

      <div class="bottom-icons">
        <button class="custom-button" @click="sendMessage('deep-thought')">
          深度思考
        </button>
        <button class="custom-button" @click="sendMessage('network-search')">
          联网搜索
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import axios from "axios";
import { ElIcon, Paperclip } from "@element-plus/icons-vue";

export default {
  components: {
    ElIcon,
    
    Paperclip,
  },
  data() {
    return {
      message: "",
      messages: [],
      apiKey: "sk-99e25bca8ffc4e1083970a7fd3e54852",
      baseURL: "https://api.deepseek.com",
    };
  },
  methods: {
    async sendMessage(mode) {
      let currentMessage = this.message;
      this.message = "";

      // 添加用户发送的消息
      this.messages.push({ role: "user", content: currentMessage });

      // 添加 loading 消息
      this.messages.push({ role: "loading", content: null });
      const loadingIndex = this.messages.length - 1;

      console.log("sendMessage called");
      try {
        let requestBody = {
          messages: [{ role: "user", content: currentMessage }],
          model: "deepseek-chat",
        };

        if (mode === "deep-thought") {
          // 添加 "深度思考" 特有的参数
        } else if (mode === "network-search") {
          // 添加 "联网搜索" 特有的参数
        } else if (mode === "text") {
          // 默认发送
        }

        const response = await axios.post(
          `${this.baseURL}/v1/chat/completions`,
          requestBody,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.apiKey}`,
            },
          }
        );

        if (
          response.data &&
          response.data.choices &&
          response.data.choices.length > 0 &&
          response.data.choices[0].message &&
          response.data.choices[0].message.content
        ) {
          const responseContent = response.data.choices[0].message.content;
          console.log("DeepSeek Response:", responseContent);

          // 移除 loading 消息, 添加 AI 响应的消息
          this.messages.splice(loadingIndex, 1, {
            role: "assistant",
            content: responseContent,
          });
        } else {
          console.warn("DeepSeek API returned unexpected response format.");
          ElMessage.warning(
            "DeepSeek API returned an unexpected response format. Check the console for details."
          );
          this.messages.splice(loadingIndex, 1);
        }
      } catch (error) {
        console.error("DeepSeek API Error:", error);
        ElMessage.error({
          message: `Error: ${error.message || "Unknown error"}`,
          duration: 5000,
        });

        if (error.response) {
          console.error(
            "DeepSeek API Error (Response):",
            error.response.status,
            error.response.data
          );
          ElMessage.error({
            message: `API Error: ${error.response.status} - ${JSON.stringify(
              error.response.data
            )}`,
            duration: 5000,
          });
        }
        this.messages.splice(loadingIndex, 1);
      }
    },
  },
};
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.message-area {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}

.chat-input-container {
  background-color: #f7f7f7;
  padding: 10px;
  border-radius: 8px;
  width: 60%;
  max-width: 600px;
  box-sizing: border-box;
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}

.input-wrapper {
  display: flex;
  align-items: center;
}

.chat-input {
  flex: 1;
  border-radius: 4px;
}

.send-button,
.attach-button {
  background-color: #5cb85c;
  border: none;
  padding: 8px 12px;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 5px;
}

.send-button:hover,
.attach-button:hover {
  background-color: #4cae4c;
}

.bottom-icons {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
}

.custom-button {
  background-color: #409eff;
  color: white;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 14px;
}

.custom-button:hover {
  background-color: #66b1ff;
}

.user-message {
  text-align: right;
  background-color: #dcf8c6;
  padding: 8px;
  border-radius: 8px;
  margin-bottom: 4px;
}

.assistant-message {
  text-align: left;
  background-color: #ece5dd;
  padding: 8px;
  border-radius: 8px;
  margin-bottom: 4px;
}

.loading-message {
  text-align: left;
  color: #999;
}
</style>