<template>
  <div class="section">
    <div class="section-title">⚙️ 生成设置</div>

    <!-- 字数 -->
    <div class="form-row">
      <label class="form-label">字数</label>
      <div class="radio-group">
        <label
          v-for="w in wordCounts"
          :key="w.value"
          class="radio-item"
          :class="{ active: store.wordCount === w.value }"
        >
          <input type="radio" :value="w.value" v-model="store.wordCount" class="radio-input" />
          <span>{{ w.label }}</span>
        </label>
      </div>
    </div>

    <!-- 语气 -->
    <div class="form-row">
      <label class="form-label">语气</label>
      <div class="radio-group">
        <label
          v-for="t in tones"
          :key="t.value"
          class="radio-item"
          :class="{ active: store.tone === t.value }"
        >
          <input type="radio" :value="t.value" v-model="store.tone" class="radio-input" />
          <span>{{ t.label }}</span>
        </label>
      </div>
    </div>

    <!-- API Key -->
    <div class="api-key-row">
      <label class="form-label">🔑 DeepSeek API Key</label>
      <div class="key-input-row">
        <input
          :type="store.showApiKey ? 'text' : 'password'"
          v-model="store.apiKey"
          class="form-input key-input"
          placeholder="sk-xxxxxxxxxxxxxxxx"
        />
        <button class="btn-eye" @click="store.showApiKey = !store.showApiKey">
          {{ store.showApiKey ? '🙈' : '👁' }}
        </button>
      </div>
      <div class="key-actions">
        <a href="https://platform.deepseek.com/api_keys" target="_blank" class="link-hint">
          💡 获取 API Key（DeepSeek 官网）
        </a>
        <button class="btn-test" @click="store.doTestConnection()">测试连接</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useReviewStore } from '../store/review.js';
import { wordCounts, tones } from '../config/options.js';

const store = useReviewStore();
</script>

<style scoped>
.api-key-row {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px dashed #e2e8f0;
}
.key-input-row {
  display: flex;
  gap: 4px;
}
.key-input { flex: 1; }
.btn-eye {
  width: 40px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #f7fafc;
  cursor: pointer;
  font-size: 16px;
}
.key-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 6px;
}
.link-hint {
  font-size: 12px;
  color: #667eea;
  text-decoration: none;
}
.btn-test {
  padding: 5px 12px;
  font-size: 12px;
  background: #edf2f7;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  color: #4a5568;
  cursor: pointer;
}
.btn-test:hover {
  background: #e2e8f0;
}
</style>
