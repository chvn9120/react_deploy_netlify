import React from 'react'

// const Header = ({ arg1, arg2, ..}) => {
const Header = (args) => {
    return (
        <header>
            <h1>
                {/* and call with the arg name, it works also. */}
                {args.title}
            </h1>
        </header>
    )
}

Header.defaultProps = {
    title: 'default title',
}

export default Header
