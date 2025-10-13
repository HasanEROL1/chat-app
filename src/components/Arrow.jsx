import React from 'react'

const Arrow = ({isAtBottom,handleScroll}) => {
  return (
      !isAtBottom &&
      <button className='sticky bottom-0 ml-auto bg-zinc-300 rounded-lg p-2 hover:bg-zinc-400 transition cursor-pointer shadow-black shadow-lg ' onClick={handleScroll}>
          <img src={"./arrow.svg"} className='w-4 h-4' />
      </button>
  )
}

export default Arrow