import { darkTheme } from 'naive-ui'
import type { GlobalThemeOverrides } from 'naive-ui'

const sharedCommon = {
  borderRadius: '8px',
  fontFamily: '"Main Font", "Main Font SC", "Times New Roman", Times, serif',
  fontMain: '"Main Font", "Main Font SC", "Times New Roman", Times, serif',
  fontSans: '"Sans Font", "Sans Font SC", "Lucida Sans", Geneva, Verdana, sans-serif',
  fontMono: '"Mono Font", "Sans Font SC", "Courier New", Courier, monospace',
}

export const lightThemeOverrides: GlobalThemeOverrides = {
  common: {
    ...sharedCommon,

    primaryColor: '#34AAE0',
    primaryColorHover: '#5BBBE6',
    primaryColorPressed: '#2A8CB8',
    primaryColorSuppl: '#7ECBED',

    errorColor: '#F56C6C',
    successColor: '#67C23A',
    warningColor: '#E6A23C',
    infoColor: '#909399',

    textColorBase: '#1A1A1A',
    textColor1: '#303133',
    textColor2: '#606266',
    textColor3: '#909399',

    bodyColor: '#F2F6FA',
    cardColor: '#FFFFFF',
    borderColor: '#DCDFE6',

    scrollbarColor: '#C0C4CC',
    scrollbarColorHover: '#A6A9AD',
  },
}
export const darkThemeOverrides: GlobalThemeOverrides = {
  common: {
    ...sharedCommon,

    primaryColor: '#3BA7D8',
    primaryColorHover: '#58B8E3',
    primaryColorPressed: '#2781AD',
    primaryColorSuppl: '#6AC1E5',

    errorColor: '#E57373',
    successColor: '#73C991',
    warningColor: '#D9A441',
    infoColor: '#8B949E',

    textColorBase: '#C9D1D9',
    textColor1: '#B1BAC4',
    textColor2: '#8B949E',
    textColor3: '#6E7681',

    bodyColor: '#0D1117',
    cardColor: '#161B22',
    borderColor: '#30363D',

    scrollbarColor: '#30363D',
    scrollbarColorHover: '#484F58',
  },
}

export { darkTheme }
