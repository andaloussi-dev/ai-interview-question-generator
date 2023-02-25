import React from 'react'
import Image from 'next/image'

function Instruction({image, content}: {image: string, content: string}) {
  return (
    <div className=" flex items-center space-x-3">
    <Image src={image} height={30} width={30} alt={""} />
    <p className="text-left font-medium"> {content} </p>
  </div>
  )
}

export default Instruction