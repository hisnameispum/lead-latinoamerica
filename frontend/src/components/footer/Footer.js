import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'

import DynamicQuote from '@/components/content/quote/DynamicQuote'
import LinkUnderlineEffect from '@/components/generic/LinkUnderlineEffect'
import useLocale from '@/hooks/useLocale'
import en from '@/language/locales/en/footer.json'
import es from '@/language/locales/es/footer.json'

export default function Footer({ showQuote = true, style = {} }) {
  const t = useLocale() === 'en' ? en : es
  const isMobile = useMediaQuery('(max-width:768px)')

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      position='relative'
      bottom={0}
      style={{ ...style }}
      className="footer"
    >

      {showQuote && <DynamicQuote />}

      <Box
        width="100vw"
        display="flex"
        pl={2.5}
        style={{
          boxShadow: 'inset 0px 2px 12px 2px rgba(184, 177, 184, 0.4)',
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          p={2.5}
          fontSize={!isMobile ? 22 : 18}
          width="100%"
        >
          <p style={{ fontSize: !isMobile ? 24 : 20 , fontWeight: 'bold', marginBottom: 16 }}>
            {t.explore}
          </p>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              flexWrap: 'wrap',
              maxWidth: 550,
            }}
          >
            <LinkUnderlineEffect
              size="md"
              color="#222"
              hrefFormatted="/resources/program"
              text={t.programs}
            />
            <LinkUnderlineEffect
              size="md"
              color="#222"
              hrefFormatted="/resources/scholarships"
              text={t.scholarships}
            />
            <LinkUnderlineEffect
              size="md"
              color="#222"
              hrefFormatted="/resources/internships"
              text={t.internships}
            />
            <LinkUnderlineEffect
              size="md"
              color="#222"
              hrefFormatted="/resources/summer"
              text={t.summer}
            />
          </div>

          <LinkUnderlineEffect
            openInNewTab
            hrefFormatted="https://www.leadlatinoamerica.org/copy-of-our-team"
            color="#222"
            text={t.ourTeam}
          />

          <LinkUnderlineEffect
            size="md"
            hrefFormatted="/add-program"
            text={t.addYourOrg}
            color="#222"
          />
        </Box>
      </Box>
    </Box>
  )
}
