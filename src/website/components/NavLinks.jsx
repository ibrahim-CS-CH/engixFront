import React from 'react'

const NavLinks = () => {
    const links = [{name: 'services'},{name: 'about us'},{name: 'our work'},{name: 'career'},{name: 'contact us'},{name: 'blog'}]
  return (
    <>
        {links.map((e, i) => (
            <div key={i}>
                <div className='px-3 text-left md:cursor-pointer'>
                    <h1 className='py-7'>{e.name}</h1>
                </div>
            </div>
        ))}
    </>
  )
}

export default NavLinks