// ============================================================
// DeepSeek API 集成 v3 - 年级语气 + 书写类型
// ============================================================

import {
  toneLabels,
  gradeLevelLabels,
  gradeLevels,
} from '../config/options.js';

/**
 * 根据年级 category 返回语气指导
 */
function getToneGuide(category) {
  switch (category) {
    case 'kindergarten':
      return `## 语气要求
- 用温暖、亲切、可爱的口吻
- 把孩子称为"宝贝"，称呼家长用"XX妈妈/爸爸"
- 句子简短，多用感叹号和 emoji（🌟💪✨）
- 缺点是温柔提醒，比如"如果下次能...就更棒啦！"
- 多用"好棒""真厉害""老师好开心"等积极表达`;
    case 'elementary':
      return `## 语气要求
- 鼓励、亲切但不幼稚的口吻
- 像老师课后给家长发微信消息一样自然
- 肯定进步要具体，指出不足要温和给出改进方法
- 不用"宝贝"等幼儿词汇，称呼用"XX同学"或名字`;
    case 'junior':
      return `## 语气要求
- 平等、成熟的口吻，像朋友交流
- 不要用"宝贝""同学"等幼稚或生疏的词汇，直接说名字
- 语言简洁有力，不啰嗦
- 优点真诚肯定，缺点直接点出并给具体改进建议
- 语气像学长学姐分享经验，不说教`;
    case 'senior':
      return `## 语气要求
- 成人间的交流语气，客观专业
- 直接点出问题和改进方向
- 不啰嗦、不过度鼓励、不讲套话
- 评语精炼有料，像专业教练的反馈`;
    case 'adult':
      return `## 语气要求
- 尊重平等的成年人口吻
- 直接、专业、坦诚
- 不讲客套话，直击要点
- 可以更开放地讨论问题和进步空间`;
    default:
      return `## 语气要求
- 亲切但不幼稚的口吻
- 像老师给家长发微信消息一样自然`;
  }
}

/**
 * 构造发送给 DeepSeek 的 prompt
 */
function buildPrompt(form) {
  const name = form.studentName?.trim() || '同学';
  const greeting = `${name}${form.greetingSuffix || '妈妈'}`;
  const gradeLabel = gradeLevelLabels[form.gradeLevel] || '未知';
  const gradeInfo = gradeLevels.find(g => g.value === form.gradeLevel);
  const gradeCategory = gradeInfo?.category || 'elementary';
  const penType = form.penType === 'brush' ? '毛笔' : '硬笔';
  const lesson = form.lessonContent?.trim() || '书法练习';
  const date = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const tone = toneLabels[form.tone] || '自动';

  const strengthParts = [];
  if (form.selectedStrengths?.length > 0) strengthParts.push(form.selectedStrengths.join('、'));
  if (form.customStrength?.trim()) strengthParts.push(form.customStrength.trim());
  const strengths = strengthParts.join('；') || '无';

  const weaknessParts = [];
  if (form.selectedWeaknesses?.length > 0) weaknessParts.push(form.selectedWeaknesses.join('、'));
  if (form.customWeakness?.trim()) weaknessParts.push(form.customWeakness.trim());
  const weaknesses = weaknessParts.join('；') || '无';

  const toneGuide = getToneGuide(gradeCategory);

  return `你是一位经验丰富的${penType}书法老师，请根据以下信息，写一份给家长的课堂反馈评语。

【学生信息】
姓名：${name}
称呼：${greeting}
年级：${gradeLabel}
书写类型：${penType}
课程内容：${lesson}
日期：${date}

【课堂表现】
优点：${strengths}
需要改进：${weaknesses}

【评语要求】
- 总字数约${form.wordCount || 200}字
- 总体语气：${tone}
- 开头必须用"${greeting}您好！"
- 用自然的口吻，像老师课后给家长发微信消息一样
- 优点要具体表扬，缺点要温和表达并给出改进建议
- 结尾要有鼓励性的收尾
- 不要使用"尊敬的家长"等过于正式的书面语
- 直接输出评语内容，不要加任何前缀说明

${toneGuide}`;
}

/**
 * 调用 DeepSeek API 生成评语
 */
export async function generateWithAI(form, apiKey) {
  if (!apiKey) {
    throw new Error('请先设置 DeepSeek API Key');
  }

  const prompt = buildPrompt(form);

  const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content: `你是一位专业的${form.penType === 'brush' ? '毛笔' : '硬笔'}书法培训老师，擅长根据学生年龄段给家长写温暖、具体、有建设性的课堂反馈评语。`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: Math.min(form.wordCount * 4, 2048),
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const msg = errorData.error?.message || `API 请求失败 (${response.status})`;
    throw new Error(msg);
  }

  const data = await response.json();
  if (!data.choices || !data.choices[0]?.message?.content) {
    throw new Error('AI 返回数据异常，请稍后重试');
  }

  return data.choices[0].message.content.trim();
}

/**
 * 测试 API Key 是否有效
 */
export async function testConnection(apiKey) {
  try {
    const response = await fetch('https://api.deepseek.com/v1/models', {
      headers: { 'Authorization': `Bearer ${apiKey}` },
    });
    return response.ok;
  } catch {
    return false;
  }
}
