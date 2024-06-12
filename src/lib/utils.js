import { format } from 'd3-format'
import { timeFormat } from 'd3-time-format'

export const urlize = str => str.toLowerCase().replaceAll(/\s/g, '-')

export const numberFormat = format(',.0f')
export const percentFormat = format('.1%')

export const formatDate = timeFormat('%b %-d, %Y')
export const formatTimeLong = timeFormat('%-I:%M %p %b %-d, %Y')


export const pluralize = (text, value) => value === 1 ? text : `${text}s`


export const getDistrictNumber = (key) => {
    return +key.replace('-', '').replace('SD', '').replace('HD', '')
}
export const getCorrespondingHouseDistrictNumbers = (sd) => {
    const number = getDistrictNumber(sd)
    return [number * 2 - 1, number * 2]
}

export const getCorrespondingSenateDistrictNumber = (hd) => {
    const number = getDistrictNumber(hd)
    return Math.ceil(number / 2)
}

export const dollarFormatResponsive = num => {
    if (Math.abs(num) < 1000) return format('$,.0f')(num)
    if (Math.abs(num) >= 1000 && (Math.abs(num) < 10_000)) return format('$,.1s')(num)
    if (Math.abs(num) >= 10_000 && (Math.abs(num) < 100_000)) return format('$,.2s')(num)
    if (Math.abs(num) >= 100_000 && (Math.abs(num) < 1_000_000)) return format('$,.3s')(num)
    if (Math.abs(num) >= 1_000_000 && (Math.abs(num) < 10_000_000)) return format('$,.2s')(num)
    if (Math.abs(num) >= 10_000_000 && (Math.abs(num) < 100_000_000)) return format('$,.3s')(num)
    else return 'ERR'
}