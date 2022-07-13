import { ref, computed } from 'vue'

export const collapsed = ref(false)
export const toggleSidebar = () => (collapsed.value = !collapsed.value)

export const SIDEBAR_WIDTH = 'w-72'
export const SIDEBAR_WIDTH_COLLAPSED = 'w-24'
export const ROTATE_COLLAPSED = 'rotate-180'

export const sidebarWidth = computed (
	() => `${collapsed.value ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH}`
)

export const rotate = computed (
	() => `${collapsed.value ?  ROTATE_COLLAPSED : ''}`
)