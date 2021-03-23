export default function Container({ children }) {
    return(
        <>
            <style jsx>{`
                div {
                    max-width: 1200px;
                    width: 100%;
                    margin: 0 auto;
                    position: relative;
                    display: block;
                }    
            `}</style>
            
            <div>
                { children }
            </div>
        </>
    )
}