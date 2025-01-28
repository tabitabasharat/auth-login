import React from 'react'
import Header from './Header'

function Page() {
  return (
    <div>
{/* <Header/> */}
<Header/>
<div className='d-flex main-div justify-content-center align-items-center'>
    <div>
        <p className='p-tag1'>Sign in to your secure wallet!</p>
        <p className='p-tag2'>The next-gen <br/> crypto wallet<br/> & trading<br/> platform</p>
        <p className='p-tag3'>All of your cryptocurrency in one place — <br/>from Bitcoin and Ethereum to Litecoin and<br/> Ripple.</p>
    </div>
    <div>
        <img src='/illustration.svg' />
    </div>
</div>
    </div>
  )
}

export default Page
