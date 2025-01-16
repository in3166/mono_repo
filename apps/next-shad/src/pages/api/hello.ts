import { sayHello } from '@ijyu-3166/core-lib'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handleApiHelloRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.send(sayHello('world loaded from /api/hello'))
}
