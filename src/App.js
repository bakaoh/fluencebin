import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {UnControlled as CodeMirror} from 'react-codemirror2'
import Header from './components/header'

import ModesService from './modes'
import APIService from './api'
import * as actions from './actions'

import './App.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/base16-dark.css'

// Welcome snippet, added and saved if no paste loaded
const INTRODUCTION = `## Welcome to FluenceBin!

** Basic usage**

1. Remove all the content from this default paste

2. Paste your content here

3. Click on save in the top menu

4. Copy the URL from your addressbar

5. Send to your friend

6. Profit!!

If you have any questions, open a issue here:
https://github.com/bakaoh/fluencebin/issues/new`

var modes = new ModesService()

class App extends Component {
  componentDidMount () {
    this.api = new APIService()
    const loadPaste = (hash) => {
      this.props.dispatch(actions.Reset())
      this.api.cat(hash).then((obj) => {
        this.props.dispatch(actions.ChangeText(obj.text))
        this.props.dispatch(actions.ChangeMode(obj.mode))
        this.props.dispatch(actions.Saved(hash))
      })
    }
    const hashFromURL = () => {
      return window.location.hash.substr(1, window.location.hash.length)
    }

    const initLoad = () => {
      if (window.location.hash.indexOf('Qm') !== -1) {
        loadPaste(hashFromURL())
        this.refs.editor.codeMirror.focus()
      } else {
        this.handleOnChange(null, null, INTRODUCTION)
        this.handleOnChangeMode('Markdown')
      }
    }
    initLoad()

    window.onhashchange = () => {
      if (hashFromURL() !== this.props.hash) {
        initLoad()
      }
    }
  }
  handleOnChange (editor, data, value) {
    if (value !== undefined && value !== this.props.text) {
      this.props.dispatch(actions.ChangeText(value))
    }
  }
  handleOnSave () {
    if (!this.props.saved) {
      this.props.dispatch(actions.Save())
      let to_save = null
      if (this.props.mode === 'Plain Text' || this.props.mode === null) {
        to_save = this.props.text
      } else {
        const { text, mode } = this.props
        to_save = JSON.stringify({
          text,
          mode
        })
      }
      this.api.add(to_save).then((hash) => {
        window.location.hash = hash
        this.props.dispatch(actions.Saved(hash))
      })
    }
  }
  handleOnNew (evt) {
    evt.preventDefault()
    this.props.dispatch(actions.Reset())
    window.history.replaceState({}, document.title, '/')
  }
  handleOnChangeMode (mode) {
    this.props.dispatch(actions.ChangeMode(mode))
  }
  render () {
    // TODO Extract editor component
    let found_mode = modes.find(this.props.mode)
    if (found_mode !== undefined) {
      found_mode = found_mode.mode
    } else {
      found_mode = 'null'
    }
    const options = {
      lineNumbers: true,
      theme: 'base16-dark',
      mode: found_mode
    }
    return <div>
      <Header
        mode={this.props.mode}
        onChangeMode={this.handleOnChangeMode.bind(this)}
        saving={this.props.saving}
        saved={this.props.saved}
        onSave={this.handleOnSave.bind(this)}
        onNew={this.handleOnNew.bind(this)}
      />
      <CodeMirror
        autoCursor={false}
        value={this.props.text}
        onChange={this.handleOnChange.bind(this)}
        options={options}
        ref='editor' />
    </div>
  }
}
App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  hash: PropTypes.string,
  text: PropTypes.string.isRequired,
  saving: PropTypes.bool.isRequired,
  saved: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
  return state
}

export default connect(
  mapStateToProps
)(App)
