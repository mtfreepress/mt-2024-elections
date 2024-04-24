import { format } from 'd3-format'
import { timeFormat } from 'd3-time-format'

export const urlize = str => str.toLowerCase().replaceAll(/\s/g, '-')

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