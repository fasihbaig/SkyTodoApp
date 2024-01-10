import { Logout, Settings } from '@mui/icons-material';
import { Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material'
import React from 'react'
import AccountsMenu from './AccountsMenu';

function Nav() {
    return (
        <nav className=' bg-slate-900  flex flex-col md:flex-row md:justify-between'>
            <div className='flex flex-col md:flex-row md:justify-start'>
                <div className='flex justify-start'>
                    <img
                        className="h-12 w-auto py-2 px-2"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Task Snap"
                    />
                    <h2 className="mt-1 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Task Snap
                    </h2>
                </div>
                <div>
                    <ul className='px-2 ml-2 mt-2'>
                        <li>TODOs</li>
                    </ul>
                </div>
            </div>
            <div>
                <div>
                    <AccountsMenu />
                </div>
            </div>
        </nav>
    )
}

export default Nav
