import { HttpInternalServerError, HttpNotFound } from '@httpx/exception'
import type { PrismaClientDbMain } from '@ijyu-3166/db-main-prisma'
import { assertIsPresent, type UnPromisify } from '@ijyu-3166/ts-utils'

export type GetPosts = UnPromisify<
  ReturnType<(typeof PostRepositorySsr)['prototype']['getPosts']>
>

export class PostRepositorySsr {
  constructor(private prisma: PrismaClientDbMain) {}

  /**
   * @throws Error
   */
  getPost = async (postId: number) => {
    try {
      const post = this.prisma.post.findUnique({
        where: { id: postId },
        include: { author: true }
      })
      assertIsPresent(
        post,
        () => new HttpNotFound(`Post ${postId} can't be found`)
      )
      return post
    } catch (e) {
      throw new HttpInternalServerError({
        message: `Post ${postId} can't be retrieved`,
        cause: e instanceof Error ? e : undefined
      })
    }
  }

  /**
   * @throws Error
   */
  getPosts = async (options?: { limit?: number; offset?: number }) => {
    const { limit, offset } = options ?? {}
    try {
      return await this.prisma.post.findMany({
        skip: offset,
        take: limit,
        where: {
          publishedAt: {
            not: null
          }
        },
        include: {
          author: {
            select: {
              firstName: true,
              lastName: true,
              username: true
            }
          }
        },
        orderBy: { publishedAt: 'desc' }
      })
    } catch (e) {
      throw new HttpInternalServerError({
        message: `Posts can't be retrieved`,
        cause: e instanceof Error ? e : undefined
      })
    }
  }
}
