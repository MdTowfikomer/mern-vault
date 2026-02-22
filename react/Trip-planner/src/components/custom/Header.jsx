import React from 'react'
import { Button } from '../ui/button'
function Header() {
    return (
        <div className='p-3 shadow-sm flex justify-between items-center'>
            <img src="/logo.svg" alt="logo" />
            <div>
                <Button>Login</Button> &nbsp;
                <Button>Sign Up</Button>
            </div>
        </div>
    )
}

export default Header