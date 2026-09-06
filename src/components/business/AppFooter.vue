<template>
  <n-layout-footer class="footer" bordered>
    <n-flex vertical align="center" justify="center" :size="2">
      <n-text class="footer__text-above">© 2026 DeriveSci. All rights reserved.</n-text>
      <n-text class="footer__text-below">
        <n-a href="https://beian.miit.gov.cn/" rel="noreferrer" target="_blank">
          粤ICP备2026116144号-1
        </n-a>
        <n-a
          class="footer__text-below__link-right"
          href="https://beian.mps.gov.cn/#/query/webSearch?code=44030002016012"
          rel="noreferrer"
          target="_blank"
        >
          <n-image
            width="13"
            height="13"
            preview-disabled
            src="/beian-icon.png"
            alt="备案图标"
          />粤公网安备44030002016012号
        </n-a>
      </n-text>
    </n-flex>
  </n-layout-footer>
</template>

<script setup lang="ts">
import { NLayoutFooter, NFlex, NText, NImage, NA } from 'naive-ui'
</script>

<style scoped>
.footer {
  height: 56px;
  padding-top: 5px;
}

.footer__text-above {
  font-size: 13px;
}

.footer__text-below {
  font-size: 13px;
  font-family: var(--font-sans);
  display: flex;
  gap: 10px;
}

.footer__text-below__link-right {
  display: flex;
  place-items: center;
}
</style>
