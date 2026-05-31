// ============================================================
// Pinia Store v3 — 年级语气 + 硬笔毛笔 + 分组优缺点
// ============================================================

import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import { defaults } from '../config/options.js';
import { saveForm, loadForm } from '../utils/storage.js';
import { generateWithAI, testConnection } from '../utils/aiService.js';

export const useReviewStore = defineStore('review', () => {
  const saved = loadForm();

  // ── 表单状态 ──
  const greetingSuffix = ref(saved.greetingSuffix || defaults.greetingSuffix);
  const penType = ref(saved.penType || defaults.penType);
  const gradeLevel = ref(saved.gradeLevel || defaults.gradeLevel);
  const studentName = ref('');
  const lessonContent = ref(saved.lessonContent || '');

  const selectedStrengths = ref(saved.selectedStrengths || []);
  const selectedWeaknesses = ref(saved.selectedWeaknesses || []);
  const customStrength = ref(saved.customStrength || '');
  const customWeakness = ref(saved.customWeakness || '');

  const wordCount = ref(saved.wordCount || defaults.wordCount);
  const tone = ref(saved.tone || defaults.tone);

  const apiKey = ref(saved.apiKey || '');
  const showApiKey = ref(false);

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

  // ── 方法 ──
  function toggleStrength(id) {
    const idx = selectedStrengths.value.indexOf(id);
    if (idx > -1) selectedStrengths.value.splice(idx, 1);
    else selectedStrengths.value.push(id);
  }

  function toggleWeakness(id) {
    const idx = selectedWeaknesses.value.indexOf(id);
    if (idx > -1) selectedWeaknesses.value.splice(idx, 1);
    else selectedWeaknesses.value.push(id);
  }

  async function doGenerate() {
    errorMessage.value = '';
    if (!studentName.value.trim()) { showToastMessage('请先填写学生姓名'); return; }
    if (!penType.value) { showToastMessage('请选择硬笔或毛笔'); return; }
    if (!apiKey.value.trim()) { showToastMessage('请先设置 DeepSeek API Key'); return; }

    const form = {
      greetingSuffix: greetingSuffix.value,
      penType: penType.value,
      gradeLevel: gradeLevel.value,
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
      generatedReview.value = await generateWithAI(form, apiKey.value.trim());
      showToastMessage('评语生成成功 ✅');
    } catch (err) {
      errorMessage.value = err.message || '生成失败，请稍后重试';
      showToastMessage('生成失败：' + errorMessage.value);
    } finally {
      isGenerating.value = false;
    }
  }

  async function doTestConnection() {
    if (!apiKey.value.trim()) { showToastMessage('请先输入 API Key'); return; }
    showToastMessage('正在测试连接...');
    const ok = await testConnection(apiKey.value.trim());
    showToastMessage(ok ? '连接成功 ✅' : '连接失败 ❌');
  }

  async function copyReview() {
    if (!generatedReview.value) { showToastMessage('请先生成评语'); return; }
    try {
      await navigator.clipboard.writeText(generatedReview.value);
      showToastMessage('已复制到剪贴板 ✅');
    } catch {
      const ta = document.createElement('textarea');
      ta.value = generatedReview.value;
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToastMessage('已复制到剪贴板 ✅');
    }
  }

  function showToastMessage(msg) {
    toastMessage.value = msg;
    showToast.value = true;
    setTimeout(() => { showToast.value = false; }, 2500);
  }

  // ── 持久化 ──
  watch(
    [greetingSuffix, penType, gradeLevel, lessonContent, selectedStrengths,
     selectedWeaknesses, customStrength, customWeakness, wordCount, tone, apiKey],
    () => {
      saveForm({
        greetingSuffix: greetingSuffix.value, penType: penType.value,
        gradeLevel: gradeLevel.value, lessonContent: lessonContent.value,
        selectedStrengths: selectedStrengths.value,
        selectedWeaknesses: selectedWeaknesses.value,
        customStrength: customStrength.value, customWeakness: customWeakness.value,
        wordCount: wordCount.value, tone: tone.value, apiKey: apiKey.value,
      });
    },
    { deep: true }
  );

  return {
    greetingSuffix, penType, gradeLevel, studentName, lessonContent,
    selectedStrengths, selectedWeaknesses, customStrength, customWeakness,
    wordCount, tone, apiKey, showApiKey,
    generatedReview, isGenerating, errorMessage, showToast, toastMessage,
    greetingPreview, todayDate,
    toggleStrength, toggleWeakness, doGenerate, doTestConnection, copyReview,
  };
});
