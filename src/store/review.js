// ============================================================
// Pinia Store v2 — AI 驱动的评语生成器
// ============================================================

import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import { defaults } from '../config/options.js';
import { saveForm, loadForm } from '../utils/storage.js';
import { generateWithAI, testConnection } from '../utils/aiService.js';

export const useReviewStore = defineStore('review', () => {
  // ── 加载持久化数据 ──
  const saved = loadForm();

  // ── 表单状态 ──
  const greetingSuffix = ref(saved.greetingSuffix || defaults.greetingSuffix);
  const ageGrade = ref(saved.ageGrade || defaults.ageGrade);
  const studentName = ref(''); // 不留存
  const lessonContent = ref(saved.lessonContent || '');

  const selectedStrengths = ref(saved.selectedStrengths || []);
  const selectedWeaknesses = ref(saved.selectedWeaknesses || []);
  const customStrength = ref(saved.customStrength || '');
  const customWeakness = ref(saved.customWeakness || '');

  const wordCount = ref(saved.wordCount || defaults.wordCount);
  const tone = ref(saved.tone || defaults.tone);

  // API Key
  const apiKey = ref(saved.apiKey || '');
  const showApiKey = ref(false);

  // 生成状态
  const generatedReview = ref('');
  const isGenerating = ref(false);
  const errorMessage = ref('');
  const showToast = ref(false);
  const toastMessage = ref('');

  // ── 计算属性 ──
  const greetingPreview = computed(() => {
    const name = studentName.value.trim();
    return name ? `${name}${greetingSuffix.value}` : `某某${greetingSuffix.value}`;
  });

  const todayDate = computed(() => {
    const d = new Date();
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
  });

  // ── 操作方法 ──
  function toggleStrength(id) {
    const idx = selectedStrengths.value.indexOf(id);
    if (idx > -1) {
      selectedStrengths.value.splice(idx, 1);
    } else {
      selectedStrengths.value.push(id);
    }
  }

  function toggleWeakness(id) {
    const idx = selectedWeaknesses.value.indexOf(id);
    if (idx > -1) {
      selectedWeaknesses.value.splice(idx, 1);
    } else {
      selectedWeaknesses.value.push(id);
    }
  }

  /** AI 生成评语 */
  async function doGenerate() {
    errorMessage.value = '';

    if (!studentName.value.trim()) {
      showToastMessage('请先填写学生姓名');
      return;
    }
    if (!apiKey.value.trim()) {
      showToastMessage('请先设置 DeepSeek API Key');
      return;
    }

    // 组装表单数据
    const form = {
      greetingSuffix: greetingSuffix.value,
      ageGrade: ageGrade.value,
      studentName: studentName.value,
      lessonContent: lessonContent.value,
      selectedStrengths: selectedStrengths.value,
      selectedWeaknesses: selectedWeaknesses.value,
      customStrength: customStrength.value,
      customWeakness: customWeakness.value,
      wordCount: wordCount.value,
      tone: tone.value,
    };

    isGenerating.value = true;
    generatedReview.value = '';

    try {
      const result = await generateWithAI(form, apiKey.value.trim());
      generatedReview.value = result;
      showToastMessage('评语生成成功 ✅');
    } catch (err) {
      errorMessage.value = err.message || '生成失败，请稍后重试';
      showToastMessage('生成失败：' + errorMessage.value);
    } finally {
      isGenerating.value = false;
    }
  }

  /** 测试 API 连接 */
  async function doTestConnection() {
    if (!apiKey.value.trim()) {
      showToastMessage('请先输入 API Key');
      return;
    }
    showToastMessage('正在测试连接...');
    const ok = await testConnection(apiKey.value.trim());
    if (ok) {
      showToastMessage('连接成功 ✅ API Key 有效');
    } else {
      showToastMessage('连接失败 ❌ 请检查 API Key');
    }
  }

  /** 复制评语 */
  async function copyReview() {
    if (!generatedReview.value) {
      showToastMessage('请先生成评语');
      return;
    }
    try {
      await navigator.clipboard.writeText(generatedReview.value);
      showToastMessage('已复制到剪贴板 ✅');
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = generatedReview.value;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      showToastMessage('已复制到剪贴板 ✅');
    }
  }

  function showToastMessage(msg) {
    toastMessage.value = msg;
    showToast.value = true;
    setTimeout(() => { showToast.value = false; }, 2500);
  }

  // ── 自动保存 ──
  watch(
    [greetingSuffix, ageGrade, lessonContent, selectedStrengths,
     selectedWeaknesses, customStrength, customWeakness, wordCount, tone, apiKey],
    () => {
      saveForm({
        greetingSuffix: greetingSuffix.value,
        ageGrade: ageGrade.value,
        lessonContent: lessonContent.value,
        selectedStrengths: selectedStrengths.value,
        selectedWeaknesses: selectedWeaknesses.value,
        customStrength: customStrength.value,
        customWeakness: customWeakness.value,
        wordCount: wordCount.value,
        tone: tone.value,
        apiKey: apiKey.value,
      });
    },
    { deep: true }
  );

  return {
    // state
    greetingSuffix, ageGrade, studentName, lessonContent,
    selectedStrengths, selectedWeaknesses, customStrength, customWeakness,
    wordCount, tone,
    apiKey, showApiKey,
    generatedReview, isGenerating, errorMessage,
    showToast, toastMessage,
    // computed
    greetingPreview, todayDate,
    // actions
    toggleStrength, toggleWeakness, doGenerate, doTestConnection, copyReview,
  };
});
