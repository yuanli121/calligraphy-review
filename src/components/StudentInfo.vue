<template>
  <div class="section">
    <div class="section-title">📋 基本信息</div>

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
        👉 评语中将显示：<strong>{{ store.greetingPreview }}</strong>
      </div>
    </div>

    <!-- 年龄/年级 -->
    <div class="form-row">
      <label class="form-label">年龄/年级</label>
      <select v-model="store.ageGrade" class="form-select">
        <option value="">-- 请选择 --</option>
        <option v-for="a in ageGrades" :key="a.value" :value="a.value">{{ a.label }}</option>
      </select>
    </div>

    <!-- 课程内容：纯文本自由填写 -->
    <div class="form-row">
      <label class="form-label">本节课内容</label>
      <input
        v-model="store.lessonContent"
        type="text"
        class="form-input"
        placeholder="例如：基本笔画练习、古诗抄写..."
      />
    </div>

    <!-- 日期（自动） -->
    <div class="form-row date-row">
      <span>📅 {{ store.todayDate }}</span>
    </div>
  </div>
</template>

<script setup>
import { useReviewStore } from '../store/review.js';
import { greetingSuffixes, ageGrades } from '../config/options.js';

const store = useReviewStore();
</script>

<style scoped>
.required { color: #e53e3e; }
.date-row { color: #718096; font-size: 13px; text-align: right; padding: 4px 0; }

.name-row {
  display: flex;
  align-items: center;
  gap: 6px;
}
.name-input { flex: 1; }
.name-prefix { font-size: 13px; color: #718096; flex-shrink: 0; }
.suffix-select {
  width: 90px;
  flex-shrink: 0;
}
.preview-hint {
  font-size: 12px;
  color: #667eea;
  margin-top: 4px;
}
</style>
