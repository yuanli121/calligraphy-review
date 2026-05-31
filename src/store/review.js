// ============================================================
// Pinia Store - 评语生成器状态管理
// ============================================================

import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import { strengths, weaknesses, quickRecords, defaults } from '../config/options.js';
import { saveForm, loadForm } from '../utils/storage.js';
import { generateReview, getDefaultLesson } from '../utils/generator.js';

export const useReviewStore = defineStore('review', () => {
  // ── 表单状态 ──
  const saved = loadForm();

  const greeting = ref(saved.greeting || defaults.greeting);
  const classType = ref(saved.classType || defaults.classType);
  const studentName = ref(''); // 不留存姓名
  const lessonContent = ref(saved.lessonContent || defaults.lessonContent);
  const customLesson = ref(saved.customLesson || '');
  const selectedStrengths = ref(saved.selectedStrengths || []);
  const selectedWeaknesses = ref(saved.selectedWeaknesses || []);
  const selectedRecords = ref(saved.selectedRecords || []);
  const wordCount = ref(saved.wordCount || defaults.wordCount);
  const tone = ref(saved.tone || defaults.tone);

  const generatedReview = ref('');
  const showToast = ref(false);
  const toastMessage = ref('');

  // ── 计算属性：班级联动过滤 ──
  const filteredStrengths = computed(() => {
    if (!classType.value) return [];
    return strengths.filter(
      s => s.classType === 'all' || s.classType === classType.value
    );
  });

  const filteredWeaknesses = computed(() => {
    if (!classType.value) return [];
    return weaknesses.filter(
      w => w.classType === 'all' || w.classType === classType.value
    );
  });

  // 当前日期
  const todayDate = computed(() => {
    const d = new Date();
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
  });

  // ── 操作 ──

  /** 切换班级类型时，清除旧专属选项 */
  function setClassType(value) {
    if (classType.value === value) return;

    // 保存旧班级的通用勾选
    const generalStrengths = selectedStrengths.value.filter(id => {
      const item = strengths.find(s => s.id === id);
      return item && item.classType === 'all';
    });
    const generalWeaknesses = selectedWeaknesses.value.filter(id => {
      const item = weaknesses.find(w => w.id === id);
      return item && item.classType === 'all';
    });

    classType.value = value;

    // 恢复通用勾选，清除专属勾选
    selectedStrengths.value = generalStrengths;
    selectedWeaknesses.value = generalWeaknesses;

    // 自动设置推荐课程
    lessonContent.value = getDefaultLesson(value);
    customLesson.value = '';
  }

  /** 切换勾选 */
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

  function toggleRecord(id) {
    const idx = selectedRecords.value.indexOf(id);
    if (idx > -1) {
      selectedRecords.value.splice(idx, 1);
    } else {
      selectedRecords.value.push(id);
    }
  }

  /** 生成评语 */
  function doGenerate() {
    if (!studentName.value.trim()) {
      showToastMessage('请先填写学生姓名');
      return;
    }
    if (!classType.value) {
      showToastMessage('请先选择班级类型');
      return;
    }

    const form = {
      greeting: greeting.value,
      studentName: studentName.value,
      classType: classType.value,
      lessonContent: lessonContent.value,
      customLesson: customLesson.value,
      selectedStrengths: selectedStrengths.value,
      selectedWeaknesses: selectedWeaknesses.value,
      selectedRecords: selectedRecords.value,
      wordCount: wordCount.value,
      tone: tone.value,
    };

    generatedReview.value = generateReview(form);
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
      // 降级方案
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
    setTimeout(() => {
      showToast.value = false;
    }, 2000);
  }

  // ── 自动保存（除学生姓名）──
  watch(
    [greeting, classType, lessonContent, customLesson, selectedStrengths,
     selectedWeaknesses, selectedRecords, wordCount, tone],
    () => {
      saveForm({
        greeting: greeting.value,
        classType: classType.value,
        lessonContent: lessonContent.value,
        customLesson: customLesson.value,
        selectedStrengths: selectedStrengths.value,
        selectedWeaknesses: selectedWeaknesses.value,
        selectedRecords: selectedRecords.value,
        wordCount: wordCount.value,
        tone: tone.value,
      });
    },
    { deep: true }
  );

  return {
    // state
    greeting,
    classType,
    studentName,
    lessonContent,
    customLesson,
    selectedStrengths,
    selectedWeaknesses,
    selectedRecords,
    wordCount,
    tone,
    generatedReview,
    showToast,
    toastMessage,
    // computed
    filteredStrengths,
    filteredWeaknesses,
    todayDate,
    // actions
    setClassType,
    toggleStrength,
    toggleWeakness,
    toggleRecord,
    doGenerate,
    copyReview,
  };
});
