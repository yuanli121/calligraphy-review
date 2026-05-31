// ============================================================
// DeepSeek API 集成 - AI 评语生成
// ============================================================

import { toneLabels, ageGradeLabels } from '../config/options.js';

/**
 * 构造发送给 DeepSeek 的 prompt
 */
function buildPrompt(form) {
  const name = form.studentName?.trim() || '同学';
  const greeting = `${name}${form.greetingSuffix || '妈妈'}`;
  const ageGrade = ageGradeLabels[form.ageGrade] || form.ageGrade || '未知';
  const lesson = form.lessonContent?.trim() || '书法练习';
  const date = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const tone = toneLabels[form.tone] || form.tone || '鼓励为主';

  const strengthParts = [];
  if (form.selectedStrengths?.length > 0) strengthParts.push(form.selectedStrengths.join('、'));
  if (form.customStrength?.trim()) strengthParts.push(form.customStrength.trim());
  const strengths = strengthParts.join('；') || '无';

  const weaknessParts = [];
  if (form.selectedWeaknesses?.length > 0) weaknessParts.push(form.selectedWeaknesses.join('、'));
  if (form.customWeakness?.trim()) weaknessParts.push(form.customWeakness.trim());
  const weaknesses = weaknessParts.join('；') || '无';

  return `你是一位经验丰富的书法老师，请根据以下信息，写一份给家长的课堂反馈评语。

【学生信息】
姓名：${name}
称呼：${greeting}
年龄/年级：${ageGrade}
课程内容：${lesson}
日期：${date}

【课堂表现】
优点：${strengths}
需要改进：${weaknesses}

【评语要求】
- 总字数约${form.wordCount || 200}字
- 语气：${tone}
- 开头必须用"${greeting}您好！"
- 用自然的口吻，像老师课后给家长发微信消息一样
- 优点要具体表扬，缺点要温和表达、给出改进建议
- 结尾要有鼓励性的收尾
- 不要使用"尊敬的家长"等过于正式的书面语
- 直接输出评语内容，不要加任何前缀说明`;
}

/**
 * 调用 DeepSeek API 生成评语
 * @param {Object} form - 表单数据
 * @param {string} apiKey - DeepSeek API Key
 * @returns {Promise<string>} 生成的评语
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
          content: '你是一位专业的书法培训老师，擅长给家长写温暖、具体、有建设性的课堂反馈评语。',
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
 * @param {string} apiKey
 * @returns {Promise<boolean>}
 */
export async function testConnection(apiKey) {
  try {
    const response = await fetch('https://api.deepseek.com/v1/models', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });
    return response.ok;
  } catch {
    return false;
  }
}
