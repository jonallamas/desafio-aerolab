import { useContext, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

import API from '../../lib/api/axios'
import { UserContext } from '../../lib/context/user'

import Coin from '../icons/coin'

export default function Navbar() {

    const { user, setUser } = useContext(UserContext)
    const [ status, setStatus ] = useState('ready')
    
    async function handleAddPoints() {
        setStatus('pending')
        const amount = 1000

        await API.post(
            '/user/points', 
            { 'amount': amount }
        ).then(res => {
            setUser({
                ...user,
                points: user.points + amount
            })
            setStatus('ready')
        }).catch(err => {
            console.timeLog(err)
        })
    }

    // Elementos para animación
    const contNav = useRef(null)

    useEffect(() => {
        gsap.to(contNav.current, {
            translateY: 0,
            opacity: 1,
        })
    }, [])

    return(
        
        <nav>
            <style jsx>{`
                nav {
                    top: .5rem;
                    height: 80px;
                    position: fixed;
                    width: 100%;
                    z-index: 10
                }

                @media (max-width: 767.98px) {
                    nav {
                        top: 0
                    }
                }

                .container {
                    background-color: #fff;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 1rem;
                    box-shadow: 0 18px 40px rgba(0,0,0,.1);
                    opacity: 0;
                    transform: translateY(-100px)
                }
                
                div {
                    display: flex;
                    align-items: center;
                    font-size: 1rem;
                    letter-spacing: -0.15px
                }

                .name {
                    margin-right: 1rem
                }

                .money {
                    background-color: #EDEDED;
                    display: flex;
                    padding: 4px 12px;
                    border-radius: 50px;
                    align-items: center
                }

                button {
                    margin-left: .5rem;
                    border: none;
                    background-color: #FF8800;
                    border-radius: 50px;
                    color: #fff;
                    padding: 9px 12px;
                    outline: none;
                    text-transform: uppercase;
                    font-size: .7rem;
                    cursor: pointer;
                    min-width: 60px;
                }

                button.disabled {
                    opacity: .7;
                    cursor: default;
                }
            `}</style>
            <div ref={contNav} className="container">
                <img src="aerolab-logo.svg" alt=""/>
                <div>
                    <span className="name">
                        { user.name }
                    </span>
                    <span className="money">
                        { user.points }
                        <Coin />
                    </span>
                    <button 
                        onClick={ () => handleAddPoints() }
                        className={ status === 'pending' ? 'disabled' : '' }
                    >{ status === 'pending' ? 'Wait...' : 'Add' }</button>
                </div>
            </div>
        </nav>
    )
}