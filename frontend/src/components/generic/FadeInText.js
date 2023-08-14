/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'

import useOnScreen from '@/hooks/useOnScreen'

const FadeInText = ({
  textArray,
  onlyRunOneTransition,
  fontSize,
  mobileFontSize,
  maxWidth,
}) => {
  const [animate, setAnimation] = useState(false)
  const ref = useRef()
  const isOnScreen = useOnScreen(ref)
  const [hasBeenOnScreen, setHasBeenOnScreen] = useState(false)

  useEffect(() => {
    if (hasBeenOnScreen) {
      return
    }

    if (isOnScreen && onlyRunOneTransition) {
      setAnimation(true)
      setHasBeenOnScreen(true)
      
      return
    }
    if (isOnScreen) {
      setAnimation(true)
    }
    if (!isOnScreen && !onlyRunOneTransition) {
      setAnimation(false)
    }
  }, [isOnScreen])

  return (
    <Container ref={ref} maxWidth={maxWidth}>
      {animate &&
        textArray &&
        textArray.map((text) => (
          <P key={text} {...{ fontSize, mobileFontSize }}>
            {' '}
            {text}{' '}
          </P>
        ))}
    </Container>
  )
}

export default FadeInText

FadeInText.propTypes = {
  textArray: PropTypes.array,
}

FadeInText.defaultProps = {
  textArray: [],
}

const fadeIn = keyframes`
	0% {
		opacity: 0;
		top: 30px; 
	}
	100% {
		opacity: 1;
		top: 0;
	}
`

const Container = styled.div`
  width: auto;
  position: relative;

  ${({ maxWidth }) =>
    maxWidth &&
    `
		max-width: ${maxWidth}px; 
	`}
`

const P = styled.p`
  animation: ${fadeIn} 2s;
  animation-iteration-count: 1;
  color: white;
  position: relative;
  color: white;
  font-size: ${(props) => (props.fontSize ? `${props.fontSize}px` : '24px')};

  @media screen and (max-width: 768px) {
    font-size: ${(props) =>
      props.mobileFontSize ? `${props.mobileFontSize}px` : '18px'};
  }
`
