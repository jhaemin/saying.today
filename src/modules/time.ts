import { format } from 'date-fns'

/**
 * Return current date as the form of 'yyyy-MM-dd'
 */
export const yyyyMMdd = () => format(new Date(), 'yyyy-MM-dd')
