import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SelectLanguage from './select_language'
import './header.css'

export default class Header extends Component {
  render () {
    let saveText = 'Save'
    if (this.props.saved) {
      saveText = 'Saved'
    }
    if (this.props.saving) {
      saveText = 'Saving'
    }
    return <div className='header'>
      <div className='header-item'>
        <div className='header-title'>
          <a rel="noopener noreferrer" href='https://github.com/bakaoh/fluencebin' target='_blank'>
            Fluence<span className='title-bin'>Bin</span>
          </a>
        </div>
      </div>
      <div className='header-item'>
        <SelectLanguage mode={this.props.mode} onChange={this.props.onChangeMode}/>
      </div>
      <div className='header-item'>
        <button onClick={this.props.onNew}>New</button>
      </div>
      <div className='header-item'>
        <button disabled={this.props.saved || this.props.saving} onClick={(evt) => {
          evt.preventDefault()
          this.props.onSave()
        }}>{saveText}</button>
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
