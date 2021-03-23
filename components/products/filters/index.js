import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Filters({ current, total, active, onChange }) {

    const filters = useRef(null)
    const buttonMost = useRef(null)
    const buttonLowest = useRef(null)
    const buttonHighest = useRef(null)

    useEffect(() => {
        gsap.to(filters.current, {
            opacity: 1,
            translateY: 0,
            delay: 2
        })

        gsap.to(buttonMost.current, {
            delay: 2.3,
            translateY: 0,
            opacity: 1
        })

        gsap.to(buttonLowest.current, {
            delay: 2.6,
            translateY: 0,
            opacity: 1
        })

        gsap.to(buttonHighest.current, {
            delay: 2.9,
            translateY: 0,
            opacity: 1
        })
    }, [])
   
    return(
        <>
            <style jsx>{`
                div {
                    margin-left: 1rem;
                    border-left: 1px solid #D9D9D9;
                    padding-left: 1rem;
                    color: #A3A3A3;

                    opacity: 0;
                    transform: translateY(-50px)
                }

                span {
                    margin-right: .5rem
                }

                button {
                    border: none;
                    background-color: #EDEDED;
                    color: #A3A3A3;
                    padding: .5rem 1.2rem;
                    border-radius: 50px;
                    outline: none;
                    margin: 0 .5rem;
                    cursor: pointer;
                    
                    transform: translateY(-50px);
                    opacity: 0
                }

                .active {
                    background-color: #0AD4FA;
                    color: #fff
                }   

                @media (max-width: 767.98px) {
                    div {
                        margin: 0;
                        padding: 0 .5rem;
                        border: none;
                        display: flex;
                        justify-content: space-between;
                    }

                    span {
                        display: none
                    }

                    button {
                        margin: 0
                    }
                } 
            `}</style>
            <div ref={filters}>
                <span>Sort by:</span>
                <button 
                    ref={buttonMost}
                    className={ active === 'mostRecent' ? 'active' : '' }
                    onClick={() => onChange('mostRecent')}
                >Most recent</button>
                <button 
                    ref={buttonLowest}
                    className={ active === 'lowestPrice' ? 'active' : '' }
                    onClick={() => onChange('lowestPrice')}
                >Lowest price</button>
                <button 
                    ref={buttonHighest}
                    className={ active === 'highestPrice' ? 'active' : '' }
                    onClick={() => onChange('highestPrice')}
                >Hightest price</button>
            </div>
        </>
    )
}