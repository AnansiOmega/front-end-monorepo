import { Markdownz, pxToRem } from '@zooniverse/react-components'
import { Box, Text } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import styled, { css } from 'styled-components'
import DdSelect from './DdSelect'

const StyledText = styled(Text)`
  margin: 0;
  padding: 0;
  width: 100%;

  > *:first-child {
    margin-top: 0;
  }
`

function DropdownTask (props) {
  const {
    annotation,
    className,
    disabled,
    task,
  } = props
  const { value } = annotation
  
  function setAnnotation (optionValue, optionIndex = 0, isPresetOption = false) {
    const newAnnotationValue = (value && value.slice(0, optionIndex)) || []
    newAnnotationValue[optionIndex] = {
      value: optionValue,
      option: isPresetOption,
    }
    annotation.update(newAnnotationValue)
    
    // TODO: if using cascading dropdowns, we probably need to wipe out all existing answers past optionIndex.
  }
  
  console.log('+++ annotation value: ', value.toJSON())
  
  return (
    <Box
      className={className}
      disabled={disabled}
    >
      <StyledText size='small' tag='legend'>
        <Markdownz>
          {task.instruction}
        </Markdownz>
      </StyledText>
      
      {task.selects.map((select, index) => {
        let options = []
        
        if (index === 0) {
          options = select.options['*'].slice()
        } else {
          const answerToPreviousSelect = value[index-1]
          if (answerToPreviousSelect) {
            options = select.options[answerToPreviousSelect.value]
          }
        }
    
        return (
          <DdSelect
            annotationValue={value && value[index]}
            index={index}
            options={options}
            selectConfig={select}
            setAnnotation={setAnnotation}
          />
        )
      })}
    </Box>
  )
}

DropdownTask.defaultProps = {
  className: '',
  disabled: false,
}

DropdownTask.propTypes = {
  annotation: PropTypes.shape({
    update: PropTypes.func,
    value: PropTypes.number
  }).isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  task: PropTypes.shape({
    help: PropTypes.string,
    instruction: PropTypes.string,
    required: PropTypes.bool,
    selects: PropTypes.arrayOf(PropTypes.shape({
      allowCreate: PropTypes.bool,
      id: PropTypes.string,
      options: PropTypes.object,  // TODO: make this a map
      required: PropTypes.bool,
      title: PropTypes.string,
    }))
  }).isRequired,
}

export default DropdownTask
