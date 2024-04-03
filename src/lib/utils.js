import { format } from 'd3-format'
import { timeFormat } from 'd3-time-format'

export const urlize = str => str.toLowerCase().replaceAll(/\s/g, '-')

export const formatDate = timeFormat('%b %-d, %Y')
export const formatTimeLong = timeFormat('%-I:%M %p %b %-d, %Y')


export const pluralize = (text, value) => value === 1 ? text : `${text}s`