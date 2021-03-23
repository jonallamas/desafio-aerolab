import Header from './layout/header'
import ProductsList from './products/list'

export default function HomeSection({ products }) {

    return(
        <>
            <Header />
            <ProductsList products={ products } />
        </>
    )
}
