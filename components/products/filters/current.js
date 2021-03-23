import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Current({ current, total }){
    
    const contCurrent = useRef(null)

    useEffect(() => {
        gsap.to(contCurrent.current, {
            opacity: 1,
            translateY: 0,
            delay: 2
        })
    }, [])

    return(
        <>
            <style jsx>{`
                span {
                    color: #616161;
                    
                    opacity: 0;
                    transform: translateY(-50px)
                } 

                @media (max-width: 767.98px) {
                    span {
                        display: none;
                    }
                }   
            `}</style>
            <span ref={contCurrent}>{current} de {total}</span>
        </>
    )
}