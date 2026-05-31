// ============================================================
// 书法AI评语生成器 - 完整预设选项清单
// ============================================================

// 称呼选项
export const greetings = [
  { value: '妈妈', label: '妈妈' },
  { value: '爸爸', label: '爸爸' },
  { value: '家长', label: '家长' },
];

// 班级类型（联动后续选项）
export const classTypes = [
  { value: 'toddler', label: '幼儿启蒙（3-6岁）' },
  { value: 'hardpen', label: '少儿硬笔（7-12岁）' },
  { value: 'softpen', label: '少儿软笔（7-16岁）' },
];

// 课程内容（支持自定义）
export const lessonContents = [
  { value: '握笔坐姿纠正', label: '握笔坐姿纠正' },
  { value: '基本笔画', label: '基本笔画（横/竖/撇/捺/点）' },
  { value: '偏旁部首', label: '偏旁部首（口字旁/木字旁/三点水等）' },
  { value: '间架结构', label: '间架结构' },
  { value: '常用生字书写', label: '常用生字书写' },
  { value: '古诗抄写', label: '古诗抄写' },
  { value: '卷面书写训练', label: '卷面书写训练' },
  { value: '执笔运笔练习', label: '软笔：执笔运笔练习' },
  { value: '九成宫多宝塔临摹', label: '软笔：《九成宫》/《多宝塔》临摹' },
  { value: '作品章法练习', label: '软笔：作品章法练习' },
];

// ============================================================
// 课堂优点
// classType: 'all'=通用, 'toddler'=幼儿启蒙, 'hardpen'=少儿硬笔, 'softpen'=少儿软笔
// ============================================================

export const strengths = [
  // ─── 通用优点（所有班级都显示）───
  { id: 's1', label: '学习态度端正，书写很认真', classType: 'all' },
  { id: 's2', label: '上课专注力很好', classType: 'all' },
  { id: 's3', label: '课堂互动积极，敢于提问', classType: 'all' },
  { id: 's4', label: '模仿能力强，一点就通', classType: 'all' },
  { id: 's5', label: '进步非常明显', classType: 'all' },
  { id: 's6', label: '能主动改正错误', classType: 'all' },
  { id: 's7', label: '作业完成质量高', classType: 'all' },
  { id: 's8', label: '耐心比之前好很多', classType: 'all' },
  { id: 's9', label: '对书法很有兴趣', classType: 'all' },
  { id: 's10', label: '课堂练习全部完成', classType: 'all' },

  // ─── 幼儿专属优点（仅幼儿启蒙显示）───
  { id: 's11', label: '握笔姿势比上次进步很多', classType: 'toddler' },
  { id: 's12', label: '坐姿端正，不用老师频繁提醒', classType: 'toddler' },
  { id: 's13', label: '全程参与课堂，没有乱跑', classType: 'toddler' },
  { id: 's14', label: '主动帮老师整理文具', classType: 'toddler' },
  { id: 's15', label: '和小朋友相处很愉快', classType: 'toddler' },
  { id: 's16', label: '敢于上台展示自己的作品', classType: 'toddler' },

  // ─── 硬笔专属优点（仅少儿硬笔显示）───
  { id: 's17', label: '握笔姿势标准', classType: 'hardpen' },
  { id: 's18', label: '顿笔到位，笔画规范', classType: 'hardpen' },
  { id: 's19', label: '字的结构匀称', classType: 'hardpen' },
  { id: 's20', label: '占格准确', classType: 'hardpen' },
  { id: 's21', label: '卷面整洁，没有涂改', classType: 'hardpen' },
  { id: 's22', label: '书写速度适中', classType: 'hardpen' },

  // ─── 软笔专属优点（仅少儿软笔显示）───
  { id: 's23', label: '执笔姿势正确', classType: 'softpen' },
  { id: 's24', label: '中锋行笔稳定', classType: 'softpen' },
  { id: 's25', label: '起笔收笔有形态', classType: 'softpen' },
  { id: 's26', label: '墨色控制均匀', classType: 'softpen' },
  { id: 's27', label: '临摹相似度高', classType: 'softpen' },
  { id: 's28', label: '字间距行距合理', classType: 'softpen' },
];

// ============================================================
// 课堂不足
// ============================================================

export const weaknesses = [
  // ─── 通用不足（所有班级都显示）───
  { id: 'w1', label: '容易走神，坐不住', classType: 'all' },
  { id: 'w2', label: '耐心不足，写得比较急', classType: 'all' },
  { id: 'w3', label: '基础知识点容易忘', classType: 'all' },
  { id: 'w4', label: '课后练习不足', classType: 'all' },
  { id: 'w5', label: '书写速度太快/太慢', classType: 'all' },
  { id: 'w6', label: '需要老师手把手指导', classType: 'all' },

  // ─── 幼儿专属不足（仅幼儿启蒙显示）───
  { id: 'w7', label: '握笔姿势还需长期纠正', classType: 'toddler' },
  { id: 'w8', label: '坐姿容易歪，需要频繁提醒', classType: 'toddler' },
  { id: 'w9', label: '注意力只能集中15-20分钟', classType: 'toddler' },
  { id: 'w10', label: '偶尔会弄脏纸张/衣服', classType: 'toddler' },
  { id: 'w11', label: '不愿意多写，写几个就不想写了', classType: 'toddler' },

  // ─── 硬笔专属不足（仅少儿硬笔显示）───
  { id: 'w12', label: '握笔姿势不正确', classType: 'hardpen' },
  { id: 'w13', label: '坐姿含胸驼背', classType: 'hardpen' },
  { id: 'w14', label: '顿笔过重/过轻/没有顿笔', classType: 'hardpen' },
  { id: 'w15', label: '字写得太歪/太散/太挤', classType: 'hardpen' },
  { id: 'w16', label: '卷面有涂改', classType: 'hardpen' },
  { id: 'w17', label: '笔画写得太飘，不扎实', classType: 'hardpen' },

  // ─── 软笔专属不足（仅少儿软笔显示）───
  { id: 'w18', label: '执笔姿势不对', classType: 'softpen' },
  { id: 'w19', label: '运笔生硬，不会提按', classType: 'softpen' },
  { id: 'w20', label: '墨色忽浓忽淡', classType: 'softpen' },
  { id: 'w21', label: '字的结构偏差较大', classType: 'softpen' },
  { id: 'w22', label: '笔画写得太粗/太细', classType: 'softpen' },
  { id: 'w23', label: '章法布局混乱', classType: 'softpen' },
];

// ============================================================
// 一句话真实记录
// ============================================================

export const quickRecords = [
  { id: 'r1', label: '今天写"____"字特别好' },
  { id: 'r2', label: '最后10分钟有点坐不住了' },
  { id: 'r3', label: '握笔姿势纠正了很多' },
  { id: 'r4', label: '今天主动举手回答问题' },
  { id: 'r5', label: '比上次多写了两行，很棒' },
  { id: 'r6', label: '今天状态比上次好很多' },
  { id: 'r7', label: '写完主动帮老师收拾了桌面' },
];

// ============================================================
// 生成设置
// ============================================================

export const wordCounts = [
  { value: 100, label: '100字短评（适合日常快速反馈）' },
  { value: 200, label: '200字标准（最常用）' },
  { value: 300, label: '300字详细（适合阶段性反馈）' },
];

export const tones = [
  { value: 'encourage', label: '鼓励为主' },
  { value: 'neutral', label: '平和客观' },
  { value: 'gentle', label: '温和提醒' },
];

// 默认配置
export const defaults = {
  greeting: '妈妈',
  classType: '',
  studentName: '',
  lessonContent: '',
  selectedStrengths: [],
  selectedWeaknesses: [],
  selectedRecords: [],
  wordCount: 200,
  tone: 'encourage',
};
