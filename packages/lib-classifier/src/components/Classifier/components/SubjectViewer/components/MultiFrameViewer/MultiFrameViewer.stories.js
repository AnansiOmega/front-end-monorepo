import React from 'react'
import sinon from 'sinon'
import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import { Factory } from 'rosie'

import DecoratedMultiFrameViewerContainer, { MultiFrameViewerContainer } from './MultiFrameViewerContainer'
import ImageToolbar from '../../../ImageToolbar'
import SubjectViewerStore from '@store/SubjectViewerStore'
import readme from './README.md'
import backgrounds from '../../../../../../../.storybook/lib/backgrounds'

const config = {
  notes: {
    markdown: readme
  }
}

const subject = Factory.build('subject', {
  locations: [
    { 'image/jpeg': 'http://placekitten.com/500/300' },
    { 'image/jpeg': 'http://placekitten.com/300/500' },
    { 'image/jpeg': 'http://placekitten.com/500/300' },
    { 'image/jpeg': 'http://placekitten.com/300/500' },
    { 'image/jpeg': 'http://placekitten.com/500/300' },
    { 'image/jpeg': 'http://placekitten.com/300/500' },
    { 'image/jpeg': 'http://placekitten.com/500/300' },
    { 'image/jpeg': 'http://placekitten.com/300/500' },
    { 'image/jpeg': 'http://placekitten.com/500/300' },
    { 'image/jpeg': 'http://placekitten.com/300/500' }
  ],
  metadata: {
    default_frame: 7
  }
})

const mockStore = {
  classifications: {
    active: {
      annotations: new Map()
    }
  },
  fieldGuide: {},
  subjectViewer: SubjectViewerStore.create({ frame: subject.metadata.default_frame }),
  workflowSteps: {
    activeStepTasks: []
  }
}

function ViewerContext (props) {
  const { children, theme } = props
  return (
    <Provider classifierStore={mockStore}>
      <Grommet theme={theme}>
        {children}
      </Grommet>
    </Provider>
  )
}

const darkThemeConfig = Object.assign({}, config, { backgrounds: backgrounds.darkDefault })

storiesOf('Subject Viewers | MultiFrameViewer', module)
  .add('light theme', () => {
    return (
      <ViewerContext theme={zooTheme}>
        <Box height='500px' width='large'>
          <DecoratedMultiFrameViewerContainer
            enableInteractionLayer={false}
            subject={subject}
          />
        </Box>
      </ViewerContext>
    )
  }, config)
  .add('dark theme', () => {
    const darkZooTheme = Object.assign({}, zooTheme, { dark: true })
    return (
      <ViewerContext theme={darkZooTheme}>
        <Box height='500px' width='large'>
          <DecoratedMultiFrameViewerContainer
            enableInteractionLayer={false}
            subject={subject}
          />
        </Box>
      </ViewerContext>
    )
  }, darkThemeConfig)
  .add('pan / zoom', () => {
    return (
      <ViewerContext mode='light' theme={zooTheme}>
        <Box direction='row' height='500px' width='large'>
          <DecoratedMultiFrameViewerContainer
            enableInteractionLayer={false}
            subject={subject}
          />
          <ImageToolbar />
        </Box>
      </ViewerContext>
    )
  }, config)