import React, { useState } from 'react'
import '../styles/components/Name.css'

interface NameProps {
  onSubmit: (name: string) => void
}

const Name: React.FC<NameProps> = ({ onSubmit }) => {
  const [name, setName] = useState('')

  return (
    <div
      className="name-container"
    >
      <form
        onSubmit={event => {
          event.preventDefault()
          onSubmit(name)
        }}
      >
        <label htmlFor="name">
          Qual o seu nome?
        </label>

        <input
          id="name"
          value={name}
          onChange={event => setName(event.target.value)}
        />

        <button>
          Confirmar
        </button>
      </form>
    </div>
  )
}

export default Name
