import { sayHello } from '@ijyu-3166/core-lib'
import { AsyncMessage, Message } from '@ijyu-3166/ui-lib'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { NextSeo } from 'next-seo'
import type { FC } from 'react'
import { Banner } from '@/components/banner/Banner'
import { MainLayout } from '@/layouts/main'
import { Jumbotron, PoetryBlock } from '../blocks'
import { demoConfig } from '../demo.config'

export const DemoPage: FC = () => {
  const { t } = useTranslation(demoConfig.i18nNamespaces)

  return (
    <>
      <NextSeo
        title={t('demo:page.title')}
        description="Web-app nextjs monorepo example, https://github.com/in3166/mono_repo"
      />
      <MainLayout>
        <Banner />
        <h3>I&apos;m the web-app</h3>
        <Jumbotron />
        <ul>
          <li>{`Foo says: ${sayHello('World')} from @ijyu-3166/core-lib`}</li>
          <li>
            <Message message={'Bar react component from @ijyu-3166/ui-lib'} />
          </li>
          <li>
            <AsyncMessage apiUrl={'/api/hello'} />
          </li>
        </ul>
        <Image
          src={'/images/nextjs-logo.png'}
          alt={'logo'}
          width={400}
          height={240}
        />
        <div className={'pt-8'} />
        <PoetryBlock />
      </MainLayout>
    </>
  )
}
