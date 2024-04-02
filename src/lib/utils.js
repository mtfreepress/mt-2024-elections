import { format } from 'd3-format'
import { timeFormat } from 'd3-time-format'

export const formatDate = timeFormat('%b %-d, %Y')
export const formatTimeLong = timeFormat('%-I:%M %p %b %-d, %Y')