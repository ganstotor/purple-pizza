import styles from './CartItem.module.css'
import type { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store/store';
import { cartActions } from '../../store/cart.slice';
import type { CartItemProps } from './CartItem.props';

function CardItem(props: CartItemProps) {
  const dispatch = useDispatch<AppDispatch>()

  const increase = (e: MouseEvent) => {
    dispatch(cartActions.add(props.id));
  }

  const decrease = () => {
    dispatch(cartActions.remove(props.id));
  }

  const remove = () => {
    dispatch(cartActions.delete(props.id));
  }

    return (
        <div className={styles['item']}>
            <div className={styles['image']} style={{backgroundImage: `url('${props.image}')`}}></div>
            <div className={styles['description']}>
              <div className={styles['name']}>{props.name}</div>
              <div className={styles['price']}>{props.price}UAH</div>
            </div>
            <div className={styles['actions']}>
            <button className={styles['minus']} onClick={decrease}>
            <img src="/minus.svg" height='20px' alt="" />
            </button>
            <div className={styles['number']}>{props.count}</div>
            <button className={styles['plus']} onClick={increase}>
            <img src="/plus.svg" height='20px' alt="" />
            </button>
            <button className={styles['remove']} onClick={remove}>
            <img src="/close.svg" height='20px' alt="" />
            </button>
            </div>
        </div>
    )
}

export default CardItem;