// ============================================================
// 书法AI评语生成器 v3 - 预设选项
// ============================================================

// 称呼后缀
export const greetingSuffixes = [
  { value: '妈妈', label: '妈妈' },
  { value: '爸爸', label: '爸爸' },
  { value: '家长', label: '家长' },
];

// 硬笔/毛笔
export const penTypes = [
  { value: 'hardpen', label: '硬笔' },
  { value: 'brush', label: '毛笔' },
];

// 年级（含分类，用于 AI 调整语气）
export const gradeLevels = [
  { value: 'preschool_small', label: '小班', category: 'kindergarten' },
  { value: 'preschool_mid',   label: '中班', category: 'kindergarten' },
  { value: 'preschool_large', label: '大班', category: 'kindergarten' },
  { value: 'grade1',  label: '一年级', category: 'elementary' },
  { value: 'grade2',  label: '二年级', category: 'elementary' },
  { value: 'grade3',  label: '三年级', category: 'elementary' },
  { value: 'grade4',  label: '四年级', category: 'elementary' },
  { value: 'grade5',  label: '五年级', category: 'elementary' },
  { value: 'grade6',  label: '六年级', category: 'elementary' },
  { value: 'grade7',  label: '初一',   category: 'junior' },
  { value: 'grade8',  label: '初二',   category: 'junior' },
  { value: 'grade9',  label: '初三',   category: 'junior' },
  { value: 'grade10', label: '高一',   category: 'senior' },
  { value: 'grade11', label: '高二',   category: 'senior' },
  { value: 'grade12', label: '高三',   category: 'senior' },
  { value: 'adult',   label: '成人',   category: 'adult' },
];

// 年级中文映射
export const gradeLevelLabels = {};
gradeLevels.forEach(g => { gradeLevelLabels[g.value] = g.label; });

// 年级分类中文映射
export const gradeCategoryLabels = {
  kindergarten: '幼儿园',
  elementary: '小学',
  junior: '初中',
  senior: '高中',
  adult: '成人',
};

// ─── 课堂优点 ───
export const strengthPresets = [
  // 通用基础类
  { id: 'sg1', label: '学习态度端正，书写特别认真', category: 'general' },
  { id: 'sg2', label: '上课专注力很好，全程不走神', category: 'general' },
  { id: 'sg3', label: '进步非常明显，比上次好很多', category: 'general' },
  { id: 'sg4', label: '课堂互动积极，敢于提问', category: 'general' },
  { id: 'sg5', label: '作业完成质量高，卷面整洁', category: 'general' },
  { id: 'sg6', label: '对书法很有兴趣，主动练习', category: 'general' },
  // 书法专业类
  { id: 'sc1', label: '笔画掌握扎实，起收笔规范', category: 'calligraphy' },
  { id: 'sc2', label: '结构把握准确，字形很端正', category: 'calligraphy' },
  { id: 'sc3', label: '临摹能力强，还原度很高', category: 'calligraphy' },
  { id: 'sc4', label: '横/竖/撇/捺等基础笔画写得好', category: 'calligraphy' },
  { id: 'sc5', label: '能写出笔画的粗细变化', category: 'calligraphy' },
  { id: 'sc6', label: '字的大小均匀，排版整齐', category: 'calligraphy' },
];

// ─── 需要改进 ───
export const weaknessPresets = [
  // 通用基础类
  { id: 'wg1', label: '容易走神，坐不住', category: 'general' },
  { id: 'wg2', label: '耐心不足，写得比较急', category: 'general' },
  { id: 'wg3', label: '书写速度偏慢，反复修改多', category: 'general' },
  { id: 'wg4', label: '书写速度过快，笔画潦草', category: 'general' },
  { id: 'wg5', label: '课后练习不足，完成度不高', category: 'general' },
  { id: 'wg6', label: '基础知识点容易忘', category: 'general' },
  // 书法专业类
  { id: 'wc1', label: '握笔姿势不正确（过紧/过低）', category: 'calligraphy' },
  { id: 'wc2', label: '坐姿不端正（歪头/趴桌）', category: 'calligraphy' },
  { id: 'wc3', label: '起收笔不规范，太随意', category: 'calligraphy' },
  { id: 'wc4', label: '笔画粗细没有变化', category: 'calligraphy' },
  { id: 'wc5', label: '结构松散，比例失调', category: 'calligraphy' },
  { id: 'wc6', label: '字的大小不一，排版乱', category: 'calligraphy' },
  { id: 'wc7', label: '临摹时观察不仔细，细节不到位', category: 'calligraphy' },
];

// 字数
export const wordCounts = [
  { value: 100, label: '100字短评（日常快速反馈）' },
  { value: 200, label: '200字标准（最常用）' },
  { value: 300, label: '300字详细（阶段性反馈）' },
];

// 语气（手动覆盖，年级已有自动语气）
export const tones = [
  { value: 'auto', label: '自动（根据年级）' },
  { value: 'encourage', label: '鼓励为主' },
  { value: 'neutral', label: '平和客观' },
  { value: 'gentle', label: '温和提醒' },
];

export const toneLabels = {
  auto: '自动',
  encourage: '鼓励为主',
  neutral: '平和客观',
  gentle: '温和提醒',
};

// 默认配置
export const defaults = {
  greetingSuffix: '妈妈',
  penType: '',
  gradeLevel: '',
  studentName: '',
  lessonContent: '',
  selectedStrengths: [],
  selectedWeaknesses: [],
  customStrength: '',
  customWeakness: '',
  wordCount: 200,
  tone: 'auto',
};
