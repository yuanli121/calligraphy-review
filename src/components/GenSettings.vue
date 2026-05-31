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
          <input
            type="radio"
            :value="w.value"
            v-model="store.wordCount"
            class="radio-input"
          />
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
          <input
            type="radio"
            :value="t.value"
            v-model="store.tone"
            class="radio-input"
          />
          <span>{{ t.label }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useReviewStore } from '../store/review.js';
import { wordCounts, tones } from '../config/options.js';

const store = useReviewStore();
</script>
