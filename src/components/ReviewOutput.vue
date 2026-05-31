<template>
  <!-- 生成按钮 -->
  <button class="btn-generate" @click="store.doGenerate()">
    🪄 生成评语
  </button>

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
  display: block;
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
  transition: transform 0.1s, box-shadow 0.2s;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}
.btn-generate:active {
  transform: scale(0.97);
}

.output-section {
  margin-top: 16px;
}
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
.btn-copy:active {
  transform: scale(0.97);
}

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

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
