import React from 'react'

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset'
  text: string
  onClick?: () => void
}

export const Button: React.FC<ButtonProps> = ({
  type = 'button',
  text,
  onClick,
}) => {
  return (
    <button
      className="px-6 py-3 w-full btn-primary"
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  )
}
