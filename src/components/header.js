import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SelectLanguage from './select_language'
import './header.css'

export default class Header extends Component {
  render () {
    let saveClasses = 'save-button'
    let saveText = 'Save'

    if (this.props.saved) {
      saveClasses = saveClasses + '-disabled'
      saveText = 'Saved'
    }
    if (this.props.saving) {
      saveClasses = saveClasses + '-saving'
      saveText = 'Saving'
    }
    return <div className='header'>
      <div className='header-item'>
        <div className='header-title'>
          FluenceBin
        </div>
      </div>
      <div className='header-item'>
        <SelectLanguage mode={this.props.mode} onChange={this.props.onChangeMode}/>
      </div>
      <div className='header-item' onClick={this.props.onNew}>
        <a href='#'>New</a>
      </div>
      <div className={'header-item ' + saveClasses} onClick={(evt) => {
        evt.preventDefault()
        this.props.onSave()
      }}>
        <a href='#'>{saveText}</a>
      </div>
      <div className='header-item header-item-right'>
        <a rel="noopener noreferrer" href='https://github.com/bakaoh/fluencebin' target='_blank'>Source Code</a>
      </div>
      <div className='clear'></div>
    </div>
  }
}
Header.propTypes = {
  onChangeMode: PropTypes.func.isRequired,
  mode: PropTypes.string,
  saving: PropTypes.bool.isRequired,
  saved: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onNew: PropTypes.func.isRequired
}
