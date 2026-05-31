<template>
  <div class="section">
    <div class="section-title">
      {{ icon }} {{ title }}
      <span class="count-badge">{{ selected.length }} 已选</span>
    </div>

    <!-- 未选班级时提示 -->
    <div v-if="!classType" class="hint">请先选择班级类型</div>

    <!-- 选项列表 -->
    <div v-else class="option-list">
      <label
        v-for="item in filteredOptions"
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
        <span v-if="item.classType !== 'all'" class="tag">{{ classTag(item.classType) }}</span>
      </label>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  icon: { type: String, default: '✅' },
  title: { type: String, default: '选项' },
  options: { type: Array, required: true },
  selected: { type: Array, required: true },
  classType: { type: String, default: '' },
});

defineEmits(['toggle']);

const filteredOptions = computed(() => {
  if (!props.classType) return [];
  return props.options.filter(
    o => o.classType === 'all' || o.classType === props.classType
  );
});

function classTag(type) {
  const map = { toddler: '幼儿', hardpen: '硬笔', softpen: '软笔' };
  return map[type] || type;
}
</script>

<style scoped>
.tag {
  font-size: 10px;
  background: #ebf4ff;
  color: #4299e1;
  padding: 1px 6px;
  border-radius: 3px;
  margin-left: 4px;
  flex-shrink: 0;
}
</style>
