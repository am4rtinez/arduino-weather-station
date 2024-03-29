import { ref, computed } from 'vue'

export const collapsed = ref(false)
export const toggleSidebar = () => (collapsed.value = !collapsed.value)

export const SIDEBAR_WIDTH = '220'
export const SIDEBAR_WIDTH_COLLAPSED = '85'
export const ROTATE_COLLAPSED = 'rotate-180'

export const sidebarWidth = computed (
	() => `${collapsed.value ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH}px`
)

export const rotate = computed (
	() => `${collapsed.value ?  ROTATE_COLLAPSED : ''}`
)