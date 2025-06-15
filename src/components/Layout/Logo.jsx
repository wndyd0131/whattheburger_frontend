const Logo = () => {
  return (
    <div className="
      flex
      basis-1/5
      justify-start

      max-md:basis-0
      max-md:mt-5
      max-md:mb-15
      max-md:self-start
    ">
      <a className="flex items-center" href="/">
        <img className="h-18 min-w-18" src="/private/logo/whattheburger-logo.png"/>
        <p className="flex font-['Whatthefont'] text-[#FE7800] text-2xl">Whattheburger</p>
      </a>
    </div>
  )
}

export default Logo;