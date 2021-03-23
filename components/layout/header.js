import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'

import Container from './container'

export default function Header() {

    const header = useRef(null)
    const title = useRef(null)

    useEffect(() => {
        gsap.to(title.current, {
            opacity: 0
        })

        gsap.to(header.current, {
            height: 412,
            delay: .5,
            opacity: 1,
            ease: "circ.out"
        })

        gsap.to(title.current, {
            opacity: 1,
            delay: 1.3,
            translateY: 0
        })
    }, [])

    return(
        <>
            <style jsx>{`
                header {
                    background-color: #6EE8FF;
                    color: #fff;
                    display: flex;
                    align-items: flex-end;
                    padding-bottom: 3rem;
                    background-image: url('header-x1.png');
                    background-size: cover;

                    height: 0;
                    opacity: 0
                }    

                h1 {
                    opacity: 0,
                    transform: translateY(-50px)
                }
            `}</style>
            
            <header ref={header}>
                <Container>
                    <h1 ref={title}>Electronics</h1>
                </Container>
            </header>
        </>
    )
}