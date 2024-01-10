import { Logout, Settings } from '@mui/icons-material';
import { Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material'
import React from 'react'
import AccountsMenu from './AccountsMenu';

function Nav() {
    return (
        <nav className=' bg-slate-900  flex flex-col md:flex-row md:justify-between'>
            <div className='flex flex-col md:flex-row md:justify-start w-full'>
                <div className='flex justify-start'>
                    <img
                        className="h-14 md:h-12 w-auto py-2 px-2 text-white"
                        src="/public/logo-no-background.svg"
                        alt="Task Snap"
                        style={{ fill: 'white', stroke: 'white' }}
                    />
                </div>
                <div className='sm:w-full'>
                    <ul className='font-bold text-white cursor-pointer h-full flex justify-start items-center w-full md:w-auto'>
                        <li className="w-full md:w-auto hover:bg-gray-400 px-2 content-center h-12  pt-2 "><span>TODOs</span></li>
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
