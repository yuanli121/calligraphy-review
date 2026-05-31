<template>
  <div class="app-container">
    <!-- 顶部导航 -->
    <header class="app-header">
      <h1>🖊 书法AI评语生成器</h1>
      <p class="subtitle">勾选选项，一键生成个性化课堂评语</p>
    </header>

    <!-- 滚动区域 -->
    <div class="scroll-area">
      <!-- 基础信息 -->
      <StudentInfo />

      <!-- 课堂优点 -->
      <OptionGroup
        icon="✅"
        title="课堂优点"
        :options="strengths"
        :selected="store.selectedStrengths"
        :classType="store.classType"
        @toggle="store.toggleStrength"
      />

      <!-- 需要改进 -->
      <OptionGroup
        icon="❌"
        title="需要改进"
        :options="weaknesses"
        :selected="store.selectedWeaknesses"
        :classType="store.classType"
        @toggle="store.toggleWeakness"
      />

      <!-- 一句话记录 -->
      <QuickRecords />

      <!-- 生成设置 -->
      <GenSettings />

      <!-- 生成按钮 & 输出 -->
      <ReviewOutput />
    </div>
  </div>
</template>

<script setup>
import { useReviewStore } from './store/review.js';
import { strengths, weaknesses } from './config/options.js';
import StudentInfo from './components/StudentInfo.vue';
import OptionGroup from './components/OptionGroup.vue';
import QuickRecords from './components/QuickRecords.vue';
import GenSettings from './components/GenSettings.vue';
import ReviewOutput from './components/ReviewOutput.vue';

const store = useReviewStore();
</script>
