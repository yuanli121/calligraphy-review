<template>
  <div class="section">
    <div class="section-title">📋 基础信息</div>

    <!-- 称呼 -->
    <div class="form-row">
      <label class="form-label">称呼</label>
      <select v-model="store.greeting" class="form-select">
        <option v-for="g in greetings" :key="g.value" :value="g.value">{{ g.label }}</option>
      </select>
    </div>

    <!-- 班级类型（联动） -->
    <div class="form-row">
      <label class="form-label">班级类型 <span class="required">*</span></label>
      <select
        :value="store.classType"
        @change="onClassChange($event.target.value)"
        class="form-select"
      >
        <option value="">-- 请选择班级类型 --</option>
        <option v-for="c in classTypes" :key="c.value" :value="c.value">{{ c.label }}</option>
      </select>
    </div>

    <!-- 学生姓名 -->
    <div class="form-row">
      <label class="form-label">学生姓名 <span class="required">*</span></label>
      <input
        v-model="store.studentName"
        type="text"
        class="form-input"
        placeholder="请输入学生姓名"
      />
    </div>

    <!-- 课程内容：下拉 + 自定义 -->
    <div class="form-row">
      <label class="form-label">本节课内容</label>
      <select
        :value="store.lessonContent"
        @change="onLessonChange($event.target.value)"
        class="form-select"
      >
        <option value="">-- 请选择课程内容 --</option>
        <option v-for="l in lessonContents" :key="l.value" :value="l.value">{{ l.label }}</option>
      </select>
    </div>
    <div class="form-row" v-if="store.lessonContent === '__custom__' || store.lessonContent === ''">
      <label class="form-label">自定义内容</label>
      <input
        v-model="store.customLesson"
        type="text"
        class="form-input"
        placeholder="输入自定义课程内容"
      />
    </div>

    <!-- 日期（自动） -->
    <div class="form-row date-row">
      <span class="form-label">📅 {{ store.todayDate }}</span>
    </div>
  </div>
</template>

<script setup>
import { useReviewStore } from '../store/review.js';
import { greetings, classTypes, lessonContents } from '../config/options.js';

const store = useReviewStore();

function onClassChange(value) {
  store.setClassType(value);
}

function onLessonChange(value) {
  store.lessonContent = value;
  store.customLesson = '';
}
</script>

<style scoped>
.required { color: #e53e3e; }
.date-row { color: #718096; font-size: 13px; text-align: right; padding: 4px 0; }
</style>
