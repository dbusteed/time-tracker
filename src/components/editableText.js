import React, { useState, useEffect } from "react"

const EditableText = ({
  childRef,
  text,
  children,
  placeholder
}) => {

  const [isEditing, setEditing] = useState(false)

  useEffect(() => {
    if (childRef && childRef.current && isEditing === true) {
      childRef.current.focus()
      childRef.current.select()
    }
  }, [isEditing, childRef])

  const handleKeyDown = (event) => {
    const { key } = event
    const keys = ["Escape", "Tab", "Enter"]
    if (keys.indexOf(key) > -1) {
      setEditing(false)
    }
  }

  return (
    <div>
      {
        isEditing 
        
        ? (
          <div
            onBlur={() => setEditing(false)}
            onKeyDown={e => handleKeyDown(e)}
            style={{display: "flex", justifyContent: "center"}}
          >
            {children}
          </div>
        ) 
        
        : (
          <div onClick={() => setEditing(true)}>
            <span>
              {text || placeholder || "Click to edit"}
            </span>
          </div>
        )
      }
    </div>
  )
}

export default EditableText