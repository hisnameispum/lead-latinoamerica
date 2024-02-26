// Inspo, redbull form - https://elementor.com/blog/website-form-design-examples/

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import NavBar from '@/components/nav/NavBar'
import getIsValidUrl from '@/utils/getIsValidUrl'

import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'
import Step5 from './Step5'

export const textInputStyle = {
  '.MuiInputBase-input': {
    minHeight: {
      lg: '75px', 
      md: '32px'
    }, 
    fontSize: {
      lg: 36, 
      md: 24
    }, 
    lineHeight: 1.1,
  }
}

export default function AddProgramSlides() {
  const router = useRouter()
  const isMobile = useMediaQuery('(max-width:600px)')
  const [step, setStep] = useState(3)
  const [inputValue, setInputValue] = useState('')
  const [checkboxValues, setCheckboxValues] = useState([])
  const [errorText, setErrorText] = useState('')
  const [step1Value, setStep1Value] = useState('')
  const [step2Value, setStep2Value] = useState('')
  const [step3Value, setStep3Value] = useState('')
  const [step4Value, setStep4Value] = useState([])
  const [step5Value, setStep5Value] = useState('')
  const [answers, setAnswers] = useState({
    name: {
      label: 'What is the name of the program?', 
      type: 'text', 
      value: '', 
      validation: { min: 3 }, 
      validationMet: false
    }, 
    description: {
      label: 'A short description about the program', 
      type: 'text', 
      value: '', 
      multiline: true,
    }, 
    keywords: {
      label: 'Labels to help identify the uses', 
      infoText: 'Use commas to create new label, ie: funding, scholarship, after-school, etc.',
      type: 'text', 
      value: ''
    }, 
    programType: {
      label: 'What type of program is it?',
      infoText: 'Choose all that apply', 
      type: 'checkbox', 
      options: [
        {label: 'Summer', value: 'summer'}, 
        {label: 'Program', value: 'program',}, 
        {label: 'Internship', value: 'internship',}, 
        {label: 'Scholarship', value: 'scholarship',}
      ],
      value: [],
      validationMet: false,
      validation: { min: 1 }
    },  
    partnerUrl: {
      label: 'Link/URL for opportunity', 
      type: 'text', 
      value: '', 
      validation: (value) => {
        return getIsValidUrl(value)
      }
    }
  })

  const questionKeys = ['name', 'description', 'keywords', 'programType', 'partnerUrl']

  const currentKey = answers[questionKeys[step]]

  if (!currentKey) {
    return router.push('congrats')
  }

  const onNextClick = () => {
    let value = inputValue 
    let inputError = ''

    if (step === 0) {
      if (step1Value <= 3) {
        inputError = '3 character mininum'
      }
    }

    if (step === 1) {
      if (!step2Value) {
        inputError = 'Required'
      }
    }

    if (step === 3) {
      if (!step4Value.length) {
        inputError = 'Please select one'
      }
    }

    if (step === 4) {
      if (!getIsValidUrl(value)) {
        inputError = 'Please enter a valid URL'
      }
    }

    if (inputError) {
      setErrorText(inputError)

      return 
    }

    const objKey = questionKeys[step]
    const currObj = {...currentKey, value, validationMet: true}

    setAnswers({
      ...answers, 
      [objKey]: {...currObj}
    })
    setStep((prevState) => prevState + 1)

    const inputtedValue = answers[questionKeys[step + 1]]?.value || ''

    setInputValue(inputtedValue)
    setErrorText('')
    setCheckboxValues([])
  }

  const onPrevClick = () => {
    const oldValue = answers[questionKeys[step - 1]].value

    setStep((prevState) => prevState - 1)
    setErrorText('')
    setInputValue(oldValue)
  }

  return (
    <>
      <NavBar />

      <Box minHeight={!isMobile ? '90vh' : ''} display={!isMobile ? 'flex' : ''}>
        <Box 
          width={!isMobile ? '50%' : '100%'} 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          position="relative"
        >
          <Box p={4} mt={isMobile ? 8 : 0} textAlign={isMobile ? 'center' : ''}>
            <Typography mb={isMobile ? 2 : 0}>
              Question {step + 1} of {questionKeys.length}
            </Typography>
            <Typography variant={isMobile ? 'h3' : 'h1'} fontWeight={600}>
              {currentKey.label}
            </Typography>
          </Box>

          {(step > 0 && !isMobile) && (
            <Box position="absolute" bottom={50} right={32}>
              <button className='fade-button' onClick={onPrevClick}>
                Previous question
              </button>
            </Box>
          )}
        </Box>

        <Box 
          width={!isMobile ? '50%' : '100%'} 
          display="flex" 
          position="relative" 
          bgcolor={!isMobile ? 'rgb(245, 245, 245)' : ''}  
          alignItems="center" 
          p={4}
        >
          <Box width="100%">
            {step === 0 && (
              <Step1 
                errorText={errorText}
                value={step1Value}
                onChange={(event) => {
                  setStep1Value(event.target.value)

                  setErrorText('')
                }}
              />
            )}

            {step === 1 && (
              <Step2 
                errorText={errorText}
                value={step2Value}
                onChange={(event) => {
                  setStep2Value(event.target.value)

                  setErrorText('')
                }}
              />
            )}

            {step === 2 && (
              <Step3
                errorText={errorText}
                value={step3Value}
                onChange={(event) => {
                  setStep3Value(event.target.value)
                }}
              />
            )}

            {step === 3 && (
              <Step4
                errorText={errorText}
                value={step4Value}
                onChange={(value) => { 
                  console.log(value)
                  if (step4Value.includes(value)) {
                    const newValues = step4Value.filter((v) => v !== value)

                    setStep4Value(newValues)
                  } else {
                    setStep4Value([...step4Value, value])
                  }
                }}
              />
            )}

            {step === 4 && (
              <Step5
                errorText={errorText}
                value={step5Value}
                onChange={(event) => {
                  setStep5Value(event.target.value)
                }}
              />
            )}

            {!!currentKey.infoText && (
              <Typography color="GrayText">
                {currentKey.infoText}
              </Typography>
            )}
          </Box>

          {!isMobile && (
            <Box position="absolute" bottom={50}>
              <button 
                className='fade-button' 
                onClick={onNextClick}
              >
                {step === questionKeys.length - 1 ? 'Submit' : 'Next Question'}
              </button>
            </Box>
          )}
        </Box>
      </Box>

      {isMobile && (
        <>
          {step > 0 && (
            <Box display="flex" justifyContent="center" mb={3}>
              <button className='fade-button' onClick={onPrevClick} style={{ width: 260, padding: 0  }}>
                Previous question
              </button>
            </Box>
          )}

          <Box display="flex" justifyContent="center">
            <button 
              className='fade-button' 
              onClick={onNextClick}
            >
              {step === questionKeys.length - 1 ? 'Submit' : 'Next Question'}
            </button>
          </Box>
        </>

      )}
    </>
  )
}