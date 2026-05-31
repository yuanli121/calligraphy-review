<template>
  <div class="section">
    <div class="section-title">
      {{ icon }} {{ title }}
      <span class="count-badge">{{ totalSelected }} 已选</span>
    </div>

    <!-- 分组显示 -->
    <div v-for="group in groupedOptions" :key="group.category" class="option-group">
      <div class="group-label">{{ group.label }}</div>
      <div class="option-list">
        <label
          v-for="item in group.items"
          :key="item.id"
          class="option-item"
          :class="{ checked: selected.includes(item.id) }"
        >
          <input
            type="checkbox"
            :checked="selected.includes(item.id)"
            @change="$emit('toggle', item.id)"
            class="option-checkbox"
          />
          <span class="option-label">{{ item.label }}</span>
        </label>
      </div>
    </div>

    <!-- 已选标签预览 -->
    <div v-if="selectedLabels.length > 0" class="selected-tags">
      <span v-for="label in selectedLabels" :key="label" class="tag-chip">{{ label }}</span>
    </div>

    <!-- 自定义补充 -->
    <div class="custom-row">
      <label class="form-label">✏️ 自定义补充（可选）</label>
      <textarea
        :value="customText"
        @input="$emit('update:customText', $event.target.value)"
        class="form-textarea"
        :placeholder="placeholder"
        rows="2"
      ></textarea>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  icon: { type: String, default: '✅' },
  title: { type: String, default: '选项' },
  presets: { type: Array, required: true },
  selected: { type: Array, required: true },
  customText: { type: String, default: '' },
});

defineEmits(['toggle', 'update:customText']);

const placeholder = computed(() =>
  props.title.includes('优点')
    ? '例如：今天写"永"字特别好、主动帮同学...'
    : '例如：最后10分钟有点坐不住了...'
);

// 按 category 分组
const groupedOptions = computed(() => {
  const generalItems = props.presets.filter(p => p.category === 'general');
  const calligraphyItems = props.presets.filter(p => p.category === 'calligraphy');
  return [
    { category: 'general', label: '📌 通用基础类', items: generalItems },
    { category: 'calligraphy', label: '🖊 书法专业类', items: calligraphyItems },
  ];
});

const totalSelected = computed(() => props.selected.length);

const selectedLabels = computed(() =>
  props.selected.map(id => {
    const item = props.presets.find(p => p.id === id);
    return item ? item.label : '';
  }).filter(Boolean)
);
</script>

<style scoped>
.option-group {
  margin-bottom: 8px;
}
.group-label {
  font-size: 12px;
  font-weight: 700;
  color: #667eea;
  padding: 4px 0;
  border-bottom: 1px solid #ebf4ff;
  margin-bottom: 6px;
}
.selected-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 8px;
  margin-bottom: 4px;
}
.tag-chip {
  font-size: 11px;
  background: #ebf4ff;
  color: #4299e1;
  padding: 2px 8px;
  border-radius: 10px;
}
.custom-row {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px dashed #e2e8f0;
}
.form-label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 4px;
}
.form-textarea {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 13px;
  color: #2d3748;
  background: #fff;
  resize: vertical;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s;
}
.form-textarea:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}
</style>
