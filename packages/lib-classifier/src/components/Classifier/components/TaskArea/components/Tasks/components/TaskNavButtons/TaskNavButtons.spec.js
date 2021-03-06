import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import TaskNavButtons from './TaskNavButtons'
import NextButton from './components/NextButton'
import DoneButton from './components/DoneButton'
import BackButton from './components/BackButton'
import DoneAndTalkButton from './components/DoneAndTalkButton'
import ExpertOptions from './components/ExpertOptions'

const classification = { gold_standard: false }

describe('TaskNavButtons', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<TaskNavButtons classification={classification} />)
    expect(wrapper).to.be.ok()
  })

  it('should not render a NextButton component if props.showNextButton is false and and props.completed is false', function () {
    const wrapper = shallow(<TaskNavButtons classification={classification} />)
    expect(wrapper.find(NextButton)).to.have.lengthOf(0)
  })

  it('should render ExpertOptions', function () {
    const wrapper = shallow(<TaskNavButtons classification={classification} />)
    expect(wrapper.find(ExpertOptions)).to.have.lengthOf(1)
  })

  describe('when props.showNextButton is true', function () {
    let wrapper
    beforeEach(function () {
      wrapper = shallow(<TaskNavButtons classification={classification} goToNextStep={() => {}} showNextButton />)
    })

    it('should render a NextButton component', function () {
      wrapper.setProps({ showNextButton: true })
      expect(wrapper.find(NextButton)).to.have.lengthOf(1)
    })

    it('should not render a BackButton if props.showBackButton is false', function () {
      expect(wrapper.find(BackButton)).to.have.lengthOf(0)
    })

    it('should render a BackButton if props.showBackButton is true', function () {
      wrapper.setProps({ showBackButton: true })
      expect(wrapper.find(BackButton)).to.have.lengthOf(1)
    })

    it('should disable the Next button when disabled.', function () {
      wrapper.setProps({ disabled: true })
      expect(wrapper.find(NextButton).prop('disabled')).to.be.true()
    })

    it('should render ExpertOptions', function () {
      expect(wrapper.find(ExpertOptions)).to.have.lengthOf(1)
    })
  })

  describe('when props.completed is true and props.showNextButton is false', function () {
    let wrapper
    before(function () {
      wrapper = shallow(<TaskNavButtons completed classification={classification} />)
    })

    it('should render a NextButton component if props.completed is true and props.showNextButton is false', function () {
      expect(wrapper.find(NextButton)).to.have.lengthOf(1)
    })

    it('should render ExpertOptions', function () {
      expect(wrapper.find(ExpertOptions)).to.have.lengthOf(1)
    })
  })

  describe('the default rendering', function () {
    let wrapper
    beforeEach(function () {
      wrapper = shallow(<TaskNavButtons classification={classification} />)
    })

    it('should render a DoneButton component', function () {
      expect(wrapper.find(DoneButton)).to.have.lengthOf(1)
    })

    it('should render a DoneAndTalkButton component', function () {
      expect(wrapper.find(DoneAndTalkButton)).to.have.lengthOf(1)
    })

    it('should render a BackButton if props.showBackButton is true', function () {
      wrapper.setProps({ showBackButton: true })
      expect(wrapper.find(BackButton)).to.have.lengthOf(1)
    })

    it('should disable the Done button when disabled.', function () {
      wrapper.setProps({ disabled: true })
      expect(wrapper.find(DoneButton).prop('disabled')).to.be.true()
    })

    it('should disable the Done & Talk button when disabled.', function () {
      wrapper.setProps({ disabled: true })
      expect(wrapper.find(DoneAndTalkButton).prop('disabled')).to.be.true()
    })

    it('should render ExpertOptions', function () {
      expect(wrapper.find(ExpertOptions)).to.have.lengthOf(1)
    })
  })
})
