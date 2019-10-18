import React from 'react'
import { render } from 'react-dom'
import Application from './containers/App'
import 'antd/dist/antd.css'
import css from './styles/style.css'
render(<Application />, document.querySelector('.container'))