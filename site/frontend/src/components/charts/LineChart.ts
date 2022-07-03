import { defineComponent, h, PropType } from 'vue'
import { Line } from 'vue-chartjs'
import {
	Chart as ChartJS,
	Title,
	Tooltip,
	Legend,
	LineElement,
	LinearScale,
	PointElement,
	CategoryScale,
	Plugin
} from 'chart.js'

ChartJS.register(
	Title,
	Tooltip,
	Legend,
	LineElement,
	LinearScale,
	PointElement,
	CategoryScale
)

export default defineComponent({
	name: 'LineChart',
	components: {
		Line
	},
	props: {
		chartId: {
			type: String,
			default: 'line-chart'
		},
		chartData: {
			type: Array || Object,
			default: null
		},
		chartLabels: {
			type: Array,
			default: null
		},
		chartOptions: {
      type: Object,
      default: () => {}
    },
		label: {
			default: '',
			type: String
		},
		borderColor: {
			type: String,
			default: ''
		},
		pointBorderColor: {
			type: String,
			default: ''
		},
		backgroundColor: {
			type: String,
			default: ''
		},
		width: {
			type: Number,
			default: 400
		},
		height: {
			type: Number,
			default: 400
		},
		cssClasses: {
			default: '',
			type: String
		},
		styles: {
			type: Object as PropType<Partial<CSSStyleDeclaration>>,
			default: () => {}
		},
		plugins: {
			type: Array as PropType<Plugin<'line'>[]>,
			default: () => []
		}
	},
	setup(props) {
		const chartData = {
			labels: props.chartLabels,
			datasets: [
				{
					label: props.label,
					backgroundColor: props.backgroundColor,
					borderColor: props.borderColor,
					borderWidth: 2,
					pointBorderColor: props.pointBorderColor,
					data: props.chartData
				}
			]
		}

		const chartOptions = props.chartOptions

		return () => h(Line, {
				chartData,
				chartOptions,
				chartId: props.chartId,
				width: props.width,
				height: props.height,
				cssClasses: props.cssClasses,
				styles: props.styles,
				plugins: props.plugins
		})
	}
})
