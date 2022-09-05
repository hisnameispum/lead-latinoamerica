import React, { useState, useEffect, useRef, useMemo } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import debounce from 'lodash/debounce'
import Box from '@/components/generic/Box'
import { useSession, signOut } from 'next-auth/client'
import useLocale from '@/hooks/useLocale'
import en from '@/language/locales/en/navbar.json'
import es from '@/language/locales/es/navbar.json'
import Link from 'next/link'
import useMousePosition from '@/hooks/useMousePosition'

NavModal.propTypes = {
  anchorEl: PropTypes.object,
  setAnchorEl: PropTypes.func.isRequired,
}

function NavModal({ anchorEl, setAnchorEl }) {
  if (!anchorEl) {
    return null
  }

  const containerRef = useRef(null)
  const mousePosition = useMousePosition()

  const [session] = useSession()
  const t = useLocale() === 'en' ? en : es
  const dataName = anchorEl.dataset.name
  const isGetInvolvedButton = dataName === 'Get Involved'
  const isResourceButton = dataName === 'Resources'

  const { offsetLeft } = anchorEl

  const [innerWidth, setInnerWidth] = useState(window.innerWidth)
  const [left, setLeft] = useState(offsetLeft)

  useEffect(() => {
    const updateSize = debounce(() => setInnerWidth(window.innerWidth), 50)

    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  useEffect(() => {
    setLeft(offsetLeft)
  }, [innerWidth, anchorEl])

  const containerPosition = useMemo(() => {
    if (!containerRef.current) {
      return {}
    }

    const containerPositionAttributes =
      containerRef.current.getBoundingClientRect()

    return {
      top: containerPositionAttributes.top,
      left: containerPositionAttributes.left,
      bottom: containerPositionAttributes.bottom,
      right: containerPositionAttributes.right,
    }
  }, [containerRef.current, innerWidth])

  useEffect(() => {
    const { left, bottom, right } = containerPosition
    const { mouseX, mouseY } = mousePosition

    if (mouseX < left || mouseX > right || mouseY > bottom) {
      setAnchorEl(null)
    }
  }, [mousePosition, dataName])

  return (
    <Container left={left} ref={containerRef}>
      {isGetInvolvedButton && (
        <Box fd="column" display="flex">
          {!session ? (
            <Link href="/sign-in">Sign in</Link>
          ) : (
            <Link href="/" onClick={signOut}>
              Sign out
            </Link>
          )}

          <Link href="/add-program">{t.addOrg}</Link>
          <Link href="/home">{t.home}</Link>
          <a
            target="_blank"
            href="https://www.leadlatinoamerica.org/copy-of-our-team"
          >
            Our Team
          </a>
        </Box>
      )}

      {isResourceButton && (
        <Box display="flex" fd="column">
          <Link href="/resources/program">{t.programs}</Link>
          <Link href="/resources/scholarships">{t.scholarships}</Link>
          <Link href="/resources/internships">{t.internships}</Link>
          <Link href="/resources/summer">{t.summer}</Link>
        </Box>
      )}
    </Container>
  )
}

export default NavModal

const Container = styled.div`
  position: absolute;
  left: ${(props) => props.left}px;
  transition: 0.4s ease-in-out all;
  opacity: ${(props) => (props.left ? 1 : 0)};
  background-color: white;
  z-index: 1000;
  top: 70px;
  box-shadow: 5px 5px 6px -2px rgba(0, 0, 0, 0.5);
  padding: 20px;
  cursor: auto;
  border: 1px solid rgba(0, 0, 0, 0.1);

  a {
    color: black;
    text-decoration: none;
    margin-bottom: 10px;
  }

  a:visited {
    color: black;
  }
`
