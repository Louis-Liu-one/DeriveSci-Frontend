<template>
  <n-select :options="options" />
</template>

<script setup lang="ts">
import { NSelect } from 'naive-ui'
import type { SelectMixedOption } from 'naive-ui/es/select/src/interface'

const options: SelectMixedOption[] = [
  { label: '男性 Mars', value: 1 },
  { label: '女性 Venus', value: 2 },
  { label: '双性 Mars and Venus', value: 3 },
  { label: '无性 Genderless', value: 4 },
  { label: '中性 Neuter', value: 5 },
  { label: '流动性别 Mercury', value: 6 },
  { label: '变性 Transgender', value: 7 },
  { label: '非二元性别 Non-binary', value: 8 },
]
</script>
