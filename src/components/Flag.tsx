import React from 'react'

interface FlagProps {
  countryCode: string
  size: '64' | '32'
}

const Flag: React.FC<FlagProps> = ({ countryCode = 'BR', size = '64' }) => {
  return (
    <img
      alt={'Bandeira de ' + countryCode}
      src={`https://www.countryflags.io/${countryCode}/flat/${size}.png`}
    />
  )
}

export default Flag
