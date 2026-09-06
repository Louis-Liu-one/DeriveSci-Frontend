import { ref } from 'vue'

const mobile = ref(false)
let initialized = false

function init() {
  if (initialized) return
  initialized = true
  const update = () => {
    mobile.value = window.innerWidth < 768
  }
  update()
  window.addEventListener('resize', update)
}

export function useResponsive() {
  init()
  return { mobile }
}
