import { useTranslation } from 'next-i18next'
import { NextSeo } from 'next-seo'
import type { FC } from 'react'
import { Banner } from '@/components/banner/Banner'
import { MainLayout } from '@/layouts/main'
import { CtaBlock, FeaturesBlock, HeroBlock } from '../blocks'
import { homeConfig } from '../home.config'

export const HomePage: FC = () => {
  const { t } = useTranslation(homeConfig.i18nNamespaces)

  return (
    <>
      <NextSeo
        title={t('home:page.title')}
        description="See https://github.com/in3166/mono_repo"
      />
      <MainLayout>
        <Banner />
        <HeroBlock />
        <FeaturesBlock />
        <CtaBlock />
      </MainLayout>
    </>
  )
}
