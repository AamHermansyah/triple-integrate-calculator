interface propTypes {
  onClick: () => void,
  className?: string,
  title?: string,
  disabled?: boolean
}

function ButtonResult({ onClick, className = '', title = '', disabled }: propTypes) {
  return (
    <button 
      type="button" 
      className={`${className} btn-gradient-01 text-sm sm:text-base p-4 text-white rounded disabled:cursor-wait disabled:opacity-50`}
      onClick={() => onClick()}
      disabled={disabled}
    >
      {title}
      <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none">
        <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#ffffff" strokeWidth="2"/>
        <path d="M9 10L15 10" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 14L15 14" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  )
}

export default ButtonResult