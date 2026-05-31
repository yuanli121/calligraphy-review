<template>
  <div class="section">
    <div class="section-title">📋 基本信息</div>

    <!-- 硬笔/毛笔切换 -->
    <div class="form-row">
      <label class="form-label">书写类型 <span class="required">*</span></label>
      <div class="pen-toggle">
        <button
          v-for="p in penTypes"
          :key="p.value"
          class="pen-btn"
          :class="{ active: store.penType === p.value }"
          @click="store.penType = p.value"
        >{{ p.label }}</button>
      </div>
    </div>

    <!-- 学生姓名 + 称呼后缀 -->
    <div class="form-row">
      <label class="form-label">学生姓名 <span class="required">*</span></label>
      <div class="name-row">
        <input
          v-model="store.studentName"
          type="text"
          class="form-input name-input"
          placeholder="请输入学生姓名"
        />
        <span class="name-prefix">的</span>
        <select v-model="store.greetingSuffix" class="form-select suffix-select">
          <option v-for="s in greetingSuffixes" :key="s.value" :value="s.value">{{ s.label }}</option>
        </select>
      </div>
      <div class="preview-hint" v-if="store.studentName.trim()">
        👉 评语中显示：<strong>{{ store.greetingPreview }}</strong>
      </div>
    </div>

    <!-- 年级 -->
    <div class="form-row">
      <label class="form-label">年级</label>
      <select v-model="store.gradeLevel" class="form-select">
        <option value="">-- 请选择 --</option>
        <optgroup label="🏫 幼儿园">
          <option v-for="g in kindergartenLevels" :key="g.value" :value="g.value">{{ g.label }}</option>
        </optgroup>
        <optgroup label="📚 小学">
          <option v-for="g in elementaryLevels" :key="g.value" :value="g.value">{{ g.label }}</option>
        </optgroup>
        <optgroup label="🎒 初中">
          <option v-for="g in juniorLevels" :key="g.value" :value="g.value">{{ g.label }}</option>
        </optgroup>
        <optgroup label="📖 高中">
          <option v-for="g in seniorLevels" :key="g.value" :value="g.value">{{ g.label }}</option>
        </optgroup>
        <optgroup label="🧑 成人">
          <option v-for="g in adultLevels" :key="g.value" :value="g.value">{{ g.label }}</option>
        </optgroup>
      </select>
    </div>

    <!-- 课程内容 -->
    <div class="form-row">
      <label class="form-label">本节课内容</label>
      <input
        v-model="store.lessonContent"
        type="text"
        class="form-input"
        placeholder="例如：基本笔画练习、古诗抄写..."
      />
    </div>

    <!-- 日期 -->
    <div class="form-row date-row">
      <span>📅 {{ store.todayDate }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useReviewStore } from '../store/review.js';
import { greetingSuffixes, penTypes, gradeLevels } from '../config/options.js';

const store = useReviewStore();

const kindergartenLevels = computed(() => gradeLevels.filter(g => g.category === 'kindergarten'));
const elementaryLevels  = computed(() => gradeLevels.filter(g => g.category === 'elementary'));
const juniorLevels      = computed(() => gradeLevels.filter(g => g.category === 'junior'));
const seniorLevels      = computed(() => gradeLevels.filter(g => g.category === 'senior'));
const adultLevels       = computed(() => gradeLevels.filter(g => g.category === 'adult'));
</script>

<style scoped>
.required { color: #e53e3e; }
.date-row { color: #718096; font-size: 13px; text-align: right; padding: 4px 0; }
.name-row { display: flex; align-items: center; gap: 6px; }
.name-input { flex: 1; }
.name-prefix { font-size: 13px; color: #718096; flex-shrink: 0; }
.suffix-select { width: 90px; flex-shrink: 0; }
.preview-hint { font-size: 12px; color: #667eea; margin-top: 4px; }

.pen-toggle {
  display: flex;
  gap: 8px;
}
.pen-btn {
  flex: 1;
  padding: 10px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  background: #f7fafc;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
}
.pen-btn.active {
  background: #667eea;
  color: #fff;
  border-color: #667eea;
}
</style>
