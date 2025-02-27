// /api/auth/ 하위 경로는 모두 'nextAuthConfig'가 처리
import NextAuth from 'next-auth'
import { nextAuthConfig } from '@/config/next-auth.config'

export default NextAuth(nextAuthConfig)
