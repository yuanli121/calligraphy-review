// ============================================================
// 评语拼装引擎
// 输入：表单数据对象
// 输出：结构化评语文案
// ============================================================

import { strengths, weaknesses, quickRecords } from '../config/options.js';

/**
 * 根据 id 数组获取标签文本
 */
function getLabels(ids, pool) {
  return ids.map(id => {
    const item = pool.find(i => i.id === id);
    return item ? item.label : '';
  }).filter(Boolean);
}

/**
 * 根据 id 数组获取 quickRecord 文本
 */
function getRecordLabels(ids) {
  return ids.map(id => {
    const item = quickRecords.find(i => i.id === id);
    return item ? item.label : '';
  }).filter(Boolean);
}

/**
 * 主生成函数
 * @param {Object} form - 表单数据
 * @returns {string} 评语文案
 */
export function generateReview(form) {
  const {
    greeting = '妈妈',
    studentName = '同学',
    classType = '',
    lessonContent = '书法练习',
    customLesson = '',
    selectedStrengths = [],
    selectedWeaknesses = [],
    selectedRecords = [],
    wordCount = 200,
    tone = 'encourage',
  } = form;

  const name = studentName.trim() || '同学';
  const lesson = customLesson || lessonContent || '书法练习';
  const today = new Date();
  const dateStr = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;

  // 获取标签文本
  const strengthLabels = getLabels(selectedStrengths, strengths);
  const weaknessLabels = getLabels(selectedWeaknesses, weaknesses);
  const recordLabels = getRecordLabels(selectedRecords);

  // 根据字数决定展示条数
  const maxItems = wordCount === 100 ? 3 : (wordCount === 300 ? 99 : 99);
  const showStrengths = strengthLabels.slice(0, maxItems);
  const showWeaknesses = weaknessLabels.slice(0, maxItems);

  // ── 语气模板 ──
  const toneConfig = {
    encourage: {
      opening: `${greeting}您好！${dateStr}，${name}同学在今天的「${lesson}」课程中表现很不错！`,
      strengthPrefix: '',
      strengthSuffix: '，做得非常棒！',
      transition: showWeaknesses.length > 0 ? '同时，老师也注意到几个可以继续加油的地方：' : '',
      weaknessPrefix: '',
      weaknessSuffix: '，相信下次会有进步。',
      closing: '继续加油，老师对宝贝很有信心！🌟',
    },
    neutral: {
      opening: `${greeting}您好，以下是${name}同学${dateStr}「${lesson}」课程的学习反馈。`,
      strengthPrefix: '做得好的方面：',
      strengthSuffix: '。',
      transition: showWeaknesses.length > 0 ? '需要继续加强的方面：' : '',
      weaknessPrefix: '',
      weaknessSuffix: '，需要持续练习。',
      closing: '希望继续保持，稳步提升。',
    },
    gentle: {
      opening: `${greeting}您好，${name}同学${dateStr}在「${lesson}」课程中，老师观察到一些情况想和您沟通。`,
      strengthPrefix: '孩子的亮点：',
      strengthSuffix: '，值得肯定。',
      transition: showWeaknesses.length > 0 ? '不过，以下方面还需要我们一起关注和引导：' : '',
      weaknessPrefix: '',
      weaknessSuffix: '，希望家长在家也能多提醒。',
      closing: '家校配合，孩子的进步一定会更大。我们一起努力！💪',
    },
  };

  const t = toneConfig[tone] || toneConfig.encourage;

  // ── 拼装 ──
  const parts = [t.opening];

  // 优点段
  if (showStrengths.length > 0) {
    parts.push('');
    parts.push(t.strengthPrefix + showStrengths.map((s, i) => `${i + 1}. ${s}`).join('；') + t.strengthSuffix);
  }

  // 不足段
  if (showWeaknesses.length > 0) {
    parts.push('');
    parts.push(t.transition);
    parts.push(t.weaknessPrefix + showWeaknesses.map((w, i) => `${i + 1}. ${w}`).join('；') + t.weaknessSuffix);
  }

  // 真实记录
  if (recordLabels.length > 0) {
    parts.push('');
    parts.push('📝 课堂小记：' + recordLabels.join('；') + '。');
  }

  // 结尾
  parts.push('');
  parts.push(t.closing);

  let result = parts.filter(Boolean).join('\n');

  // 100字短评模式：精简输出
  if (wordCount === 100) {
    result = parts.filter(Boolean).join(' ');
  }

  // 300字详细模式：额外扩展
  if (wordCount === 300 && showWeaknesses.length > 0) {
    const extraTips = [];
    if (classType === 'toddler') {
      extraTips.push('建议：幼儿阶段重在培养兴趣和习惯，每天在家练习10-15分钟即可，以鼓励为主。');
    } else if (classType === 'hardpen') {
      extraTips.push('建议：硬笔书写重在坚持，建议每天练习20分钟，重点关注坐姿和握笔姿势的规范。');
    } else if (classType === 'softpen') {
      extraTips.push('建议：软笔练习需要耐心，建议每周至少练习3次，每次不少于30分钟，多观察字帖。');
    }
    result += '\n\n' + extraTips.join('\n');
  }

  return result.trim();
}

/**
 * 获取默认课程内容（根据班级类型）
 */
export function getDefaultLesson(classType) {
  if (classType === 'softpen') return '执笔运笔练习';
  if (classType === 'toddler') return '握笔坐姿纠正';
  return '基本笔画';
}
