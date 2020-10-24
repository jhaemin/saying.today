import { format } from 'date-fns'

/**
 * Return current date as the form of 'yyyy-MM-dd'
 */
export const currentDateString = () => format(new Date(), 'yyyy-MM-dd')
