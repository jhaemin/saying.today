import { NextApiRequest } from 'next'
export { NextApiResponse } from 'next'

export interface NextApiRequest extends NextApiRequest {
  method?: 'GET' | 'POST' | 'DELETE' | 'PATCH'
}
