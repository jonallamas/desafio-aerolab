import { useContext, useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

import API from '../../lib/api/axios'
import { UserContext } from '../../lib/context/user'

import Buy from '../icons/buy'
import Coin from '../icons/coin'

export default function Product({ product }) {

    const { user, purchaseStatus, setUser, setPurchaseStatus } = useContext(UserContext)
    const cantBuy = product.cost <= user.points

    async function handleRedeem() {
        if(user.points > 0){
            setPurchaseStatus('pending')
            await API.post(
                '/redeem', 
                { 'productId': product._id }
            ).then(res => {
                setUser({
                    ...user,
                    points: user.points - product.cost
                })
                setPurchaseStatus('ready')
            }).catch(err => {
                console.timeLog(err)
            })
        }
    }

    // Elementos para animación
    const refProduct = useRef(null)

    useEffect(() => {
        gsap.to(refProduct.current, {
            opacity: 1,
            delay: 2
        })
    }, [])

    return(
        <>
            <style jsx>{`
                .product {
                    position: relative;
                    background-color: #fff;
                    padding: 1.3rem;
                    transition-duration: .4s;

                    opacity: 0;
                }

                .product.available:hover {
                    transform: translateY(-1rem);
                    box-shadow: 0 18px 30px rgba(0,0,0,.1)
                }

                .icon {
                    position: absolute;
                    right: 1.3rem;
                    z-index: 3;
                    background: radial-gradient(#0AD4FA, #25BBF1);
                    border-radius: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    fill: #fff;
                    transition-duration: .4s;
                }

                .icon.disabled {
                    position: absolute;
                    right: 1.3rem;
                    z-index: 3;
                    background: rgba(97, 97, 97, .8);
                    border-radius: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 11px 15px;
                    color: #fff;
                    font-size: 14px;
                    line-height: 18px;
                }

                .icon.disabled span {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .icon.disabled span svg{
                    margin-left: .5rem;
                }

                .product.available:hover .icon {
                    fill: #0AD4FA;
                    background: #fff;
                }

                .photo {
                    width: 100%;
                    padding-bottom: .5rem;
                    margin-bottom: .5rem;
                    border-bottom: 1px solid #eee;
                }
                
                .photo img {
                    display: block;
                    width: 100%;
                    margin: 0 auto;
                }

                .photo.disabled img{
                    /*
                    */
                    filter: grayscale(1);
                    opacity: .65;
                }

                .info {
                    padding-top: 1.25rem;
                    display: flex;
                    flex-direction: column;
                }

                .category {
                    color: #A3A3A3;
                    font-size: 16px;
                    font-weight: 20px;
                }

                .name {
                    font-size: 18px;
                    line-height: 23px;
                }

                .subinfo {
                    opacity: 0;
                    position: absolute;
                    z-index: 2;
                    top: 0;
                    left: 0;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 100%;
                    padding: 1.5rem;
                    background-color: rgba(37, 187, 241, .86);
                    transition-duration: .4s;
                }

                .product.available:hover .subinfo {
                    opacity: 1;
                }

                .subinfo div {
                    font-size: 36px;
                    line-height: 45px;
                    color: #fff;
                    margin-bottom: .75rem;
                }

                .subinfo div span {
                    margin-right: .5rem;
                }

                button {
                    font-size: 18px;
                    line-height: 23px;
                    background-color: #fff;
                    color: #616161;
                    border: none;
                    border-radius: 50px;
                    height: 42px;
                    width: 100%;
                    outline: none;
                    cursor: pointer
                }

                button.disabled {
                    opacity: .7;
                    cursor: default
                }    
            `}</style>
            
            <div ref={refProduct} className={ cantBuy ? 'product available' : 'product'}>
                <span className={ cantBuy ? 'icon' : 'icon disabled' }>
                    { cantBuy ? (
                        <Buy />
                    ) : (
                        <span>
                            You need { product.cost - user.points }
                            <Coin />
                        </span>
                    )}
                </span>
                <div className={ cantBuy ? 'photo' : 'photo disabled' }>
                    <img src={product.img.url} alt=""/>
                </div>
                <div className="info">
                    <span className="category">{product.category}</span>
                    <span className="name">{product.name}</span>
                </div>
                { cantBuy ? (
                    <div className="subinfo">
                        <div>
                            <span>{product.cost}</span>
                            <Coin />
                        </div>
                        <button 
                            onClick={ () => handleRedeem() }
                            className={ purchaseStatus === 'pending' ? 'disabled' : '' }
                        >
                            { purchaseStatus === 'pending' ? 'Wait a moment...' : 'Redeem now' }
                        </button>
                    </div>
                ) : ''}
            </div>
        </>
    )
}