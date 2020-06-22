import React, {useState, useImperativeHandle } from 'react'

const Toggle = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display : visible ? 'none' : ''}
  const showWhenVisible = { display : visible ? '' : 'none'}

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style = {hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style = {showWhenVisible}>
        <button onClick={toggleVisibility}>Cancel</button>
        {props.children}        
      </div>
    </div>
  )
})

export default Toggle
