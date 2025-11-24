import { useSelector } from "react-redux";
import Headling from "../../components/Headling/Headling";
import type { RooState } from "../../store/store";
import CardItem from "../../components/CartItem/CartItem";
import { useEffect, useState } from "react";
import type { Product } from "../../interfaces/product.interface";
import axios from "axios";
import { PREFIX } from "../../helpers/API";
import styles from './Cart.module.css'

export function Cart() {
    const [cartProducts, setCartProducts] = useState<Product[]>([]);
    const items = useSelector((s: RooState) => s.cart.items);

    const getItem = async (id: number) => {
        const {data} = await axios.get<Product>(`${PREFIX}/products/${id}`);
        return data;
    };

    const loadAllItems = async() => {
        const res = await Promise.all(items.map(i => getItem(i.id)));
        setCartProducts(res);
    }

    useEffect(() => {
        loadAllItems();
    }, [items]);

    return <>
        <Headling className={styles['headling']}>Корзина</Headling>
        {items.map(i => {
        const product = cartProducts.find(p => p.id === i.id );
        if(!product) {
            return;
        }
        return <CardItem key={product.id} count={i.count} {...product}/>
    })}
    </>
}