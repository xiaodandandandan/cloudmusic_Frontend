import SvgIcon from '@/components/SvgIcon/index.vue'
const svgRequired = import.meta.glob('./svg/*.svg')
Object.keys(svgRequired).forEach((item : any) => svgRequired[item])

export default (app : any) => {
  app.component('svg-icon', SvgIcon)
}