<template>
  <div class="section">
    <div class="section-title">📝 一句话真实记录（可选）</div>

    <div class="option-list">
      <label
        v-for="item in quickRecords"
        :key="item.id"
        class="option-item"
        :class="{ checked: store.selectedRecords.includes(item.id) }"
      >
        <input
          type="checkbox"
          :checked="store.selectedRecords.includes(item.id)"
          @change="store.toggleRecord(item.id)"
          class="option-checkbox"
        />
        <span class="option-label">{{ item.label }}</span>
      </label>
    </div>
  </div>
</template>

<script setup>
import { useReviewStore } from '../store/review.js';
import { quickRecords } from '../config/options.js';

const store = useReviewStore();
</script>
