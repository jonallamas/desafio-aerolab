import { useEffect, useMemo, useState, useRef } from 'react'
import { gsap } from 'gsap'

import Product from './product'
import Filters from './filters/'
import Current from './filters/current'
import Container from '../layout/container'

import API from '../../lib/api/axios'

export default function ProductsList() {

    const [ products, setProducts ] = useState({})
    const [ filter, setFilter ] = useState('mostRecent')
    
    const filteredProducts = useMemo(() => {
        switch (filter) {
            case 'highestPrice':
                return [...products].sort((a, b) => b.cost - a.cost)
                break;
            case 'lowestPrice':
                return [...products].sort((a, b) => a.cost - b.cost)
                break;
            default:
                return products
                break;
        }
    })

    useEffect(() => {
        API.get('/products').then(res => {
            setProducts(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    // Elementos para animación
    const filters = useRef(null)
    const list = useRef(null)

    useEffect(() => {
        gsap.to(filters.current, {
            opacity: 1,
            delay: 1
        })     
        
        gsap.to(list.current, {
            opacity: 1,
            delay: 1.5
        })
    }, [])

    return(
        <>
            <style jsx>{`
                .filters {
                    display: flex;
                    align-items: center;
                    padding: 1rem 0;
                    margin-top: 1rem;
                    border-bottom: 1px solid #D9D9D9;
                    
                    opacity: 0;
                }

                .list {
                    width: 100%;
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    grid-gap: 1.5rem;
                    padding: 2.6rem 0;

                    opacity: 0
                }

                @media (max-width: 767.98px) {
                    .list {
                        grid-template-columns: 1fr
                    }
                }
            `}</style>
            <Container>
                <div ref={filters} className="filters">
                    <Current 
                        current={filteredProducts.length} 
                        total={filteredProducts.length}
                    />
                    <Filters  
                        active={ filter } 
                        onChange={ setFilter } 
                    />
                </div>
                <div ref={list} className="list">
                    {
                        filteredProducts.length > 0 ? (
                            filteredProducts.map(product => 
                                <Product key={product._id} product={product} />
                            )
                        ) : ''
                    }
                </div>
            </Container>
        </>
    )
}