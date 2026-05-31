<template>
  <!-- 生成按钮 -->
  <button
    class="btn-generate"
    :class="{ loading: store.isGenerating }"
    :disabled="store.isGenerating"
    @click="store.doGenerate()"
  >
    <span v-if="store.isGenerating" class="spinner"></span>
    {{ store.isGenerating ? '🤖 AI 正在生成评语...' : '🤖 AI 生成评语' }}
  </button>

  <!-- 错误提示 -->
  <div v-if="store.errorMessage && !store.generatedReview" class="error-box">
    ❌ {{ store.errorMessage }}
  </div>

  <!-- 评语输出 -->
  <div v-if="store.generatedReview" class="section output-section">
    <div class="section-title">📄 生成结果</div>
    <div class="review-text">{{ store.generatedReview }}</div>
    <button class="btn-copy" @click="store.copyReview()">
      📋 一键复制
    </button>
  </div>

  <!-- Toast -->
  <transition name="fade">
    <div v-if="store.showToast" class="toast">{{ store.toastMessage }}</div>
  </transition>
</template>

<script setup>
import { useReviewStore } from '../store/review.js';

const store = useReviewStore();
</script>

<style scoped>
.btn-generate {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  margin: 16px 0;
  padding: 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.1s, box-shadow 0.2s, opacity 0.2s;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}
.btn-generate:active:not(:disabled) {
  transform: scale(0.97);
}
.btn-generate:disabled {
  opacity: 0.8;
  cursor: not-allowed;
}
.btn-generate.loading {
  background: linear-gradient(135deg, #a0aec0 0%, #718096 100%);
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-box {
  background: #fff5f5;
  border: 1px solid #fc8181;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 13px;
  color: #c53030;
  margin-bottom: 8px;
}

.output-section { margin-top: 16px; }
.review-text {
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 16px;
  font-size: 15px;
  line-height: 1.8;
  white-space: pre-line;
  color: #2d3748;
  user-select: all;
}

.btn-copy {
  display: block;
  width: 100%;
  margin-top: 12px;
  padding: 12px;
  background: #48bb78;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.1s;
}
.btn-copy:active { transform: scale(0.97); }

.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  z-index: 999;
  pointer-events: none;
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
