// ============================================================
// 表单本地持久化工具（除学生姓名外全部保存）
// ============================================================

const STORAGE_KEY = 'calligraphy_review_form';

export function saveForm(formData) {
  try {
    const { studentName, ...rest } = formData;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rest));
  } catch (e) {
    // localStorage 不可用时静默失败
  }
}

export function loadForm() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}
