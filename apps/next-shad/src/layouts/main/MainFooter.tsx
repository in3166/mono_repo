import styled from '@emotion/styled'
import GithubIcon from '@ijyu-3166/ui-lib/icons/social/github.svg'
import type { FC } from 'react'
import FooterWaves from '@/public/images/layout/footer-waves.svg'

const BgWaved = styled(FooterWaves)`
  //background-size: cover;
  object-fit: cover;
  position: absolute;
  width: 100%;
  object-position: center;
  display: block;
`

const FooterCtn = styled.footer`
  display: grid;
  .content,
  .bgImage {
    grid-area: 1 / 1;
  }
  .bgImage {
    z-index: -1;
  }
`

export const MainFooter: FC = () => {
  return (
    <FooterCtn>
      <div className={'bgImage'}>
        <BgWaved />
      </div>
      <div className={'content'}>
        <a
          href={'https://github.com/in3166/mono_repo'}
          target={'_blank'}
          rel={'noopener noreferrer'}>
          <GithubIcon />
        </a>
      </div>
    </FooterCtn>
  )
}
