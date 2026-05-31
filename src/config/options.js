// ============================================================
// 书法AI评语生成器 v2 - 精简预设选项
// ============================================================

// 称呼后缀（拼接到学生姓名后面，如"小明妈妈"）
export const greetingSuffixes = [
  { value: '妈妈', label: '妈妈' },
  { value: '爸爸', label: '爸爸' },
  { value: '家长', label: '家长' },
];

// 年龄/年级
export const ageGrades = [
  { value: 'age5', label: '5岁' },
  { value: 'age6', label: '6岁' },
  { value: 'age7', label: '7岁' },
  { value: 'age8', label: '8岁' },
  { value: 'age9', label: '9岁' },
  { value: 'grade1', label: '一年级' },
  { value: 'grade2', label: '二年级' },
  { value: 'grade3', label: '三年级' },
  { value: 'grade4', label: '四年级' },
  { value: 'grade5', label: '五年级' },
  { value: 'grade6', label: '六年级' },
  { value: 'grade7', label: '七年级（初一）' },
  { value: 'grade8', label: '八年级（初二）' },
  { value: 'grade9', label: '九年级（初三）' },
];

// 课堂优点预设（精简为最常用 6 条）
export const strengthPresets = [
  { id: 'sp1', label: '学习态度端正，书写很认真' },
  { id: 'sp2', label: '上课专注力很好' },
  { id: 'sp3', label: '课堂互动积极，敢于提问' },
  { id: 'sp4', label: '进步非常明显' },
  { id: 'sp5', label: '作业完成质量高' },
  { id: 'sp6', label: '对书法很有兴趣' },
];

// 需要改进预设（精简为最常用 5 条）
export const weaknessPresets = [
  { id: 'wp1', label: '容易走神，坐不住' },
  { id: 'wp2', label: '耐心不足，写得比较急' },
  { id: 'wp3', label: '基础知识点容易忘' },
  { id: 'wp4', label: '课后练习不足' },
  { id: 'wp5', label: '书写速度太快/太慢' },
];

// 字数设置
export const wordCounts = [
  { value: 100, label: '100字短评（日常快速反馈）' },
  { value: 200, label: '200字标准（最常用）' },
  { value: 300, label: '300字详细（阶段性反馈）' },
];

// 语气设置
export const tones = [
  { value: 'encourage', label: '鼓励为主' },
  { value: 'neutral', label: '平和客观' },
  { value: 'gentle', label: '温和提醒' },
];

// 语气中文映射
export const toneLabels = {
  encourage: '鼓励为主',
  neutral: '平和客观',
  gentle: '温和提醒',
};

// 年龄年级中文映射
export const ageGradeLabels = {};
ageGrades.forEach(a => { ageGradeLabels[a.value] = a.label; });

// 默认配置
export const defaults = {
  greetingSuffix: '妈妈',
  ageGrade: '',
  studentName: '',
  lessonContent: '',
  selectedStrengths: [],
  selectedWeaknesses: [],
  customStrength: '',
  customWeakness: '',
  wordCount: 200,
  tone: 'encourage',
};
