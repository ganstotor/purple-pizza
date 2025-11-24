import { NavLink, Outlet, useNavigate } from "react-router-dom";
import styles from './Layout.module.css'
import Button from "../../components/Button/Button";
import cn from 'classnames';
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RooState } from "../../store/store";
import { getProfile, userActions } from "../../store/user.slice";
import { useEffect } from "react";




export function Layout() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((s: RooState) => s.user.profile);
  const items = useSelector((s: RooState) => s.cart.items);

  useEffect(() => {
dispatch(getProfile())
  }, [dispatch]);

  const logout = () => {
    dispatch(userActions.logout());
    navigate('/auth/login');
  }

  return <div className={styles['layout']}>
    <div className={styles['sidebar']}>
      <div className={styles['user']}>
        <img className={styles['avatar']} src="/man.png" height="70px" alt="" />
        <div className={styles['name']}>
          {profile?.name}
        </div>
        <div className={styles['email']}>
        {profile?.email}
        </div>
      </div>
      <div className={styles['menu']}>
        <NavLink to='/' className={({ isActive }) => cn(styles['link'], {
          [styles.active]: isActive
        })}>
          <img src="/menu.svg" height="25px" alt="" />

          Меню</NavLink >
        <NavLink to='/cart' className={({ isActive }) => cn(styles['link'], {
          [styles.active]: isActive
        })}>
          <img src="/cart.svg" height="25px" alt="" />
          Корзина <span className={styles['cart-count']}>{items.reduce((acc, item) => acc += item.count, 0)}</span></NavLink>

      </div>
      <Button className={styles['exit']} onClick={logout}>
        <img src="/logout.svg" height="20px" alt="" />
        Выход
      </Button>
    </div>
    <div className={styles['content']}>
      <Outlet />
    </div>
  </div>
}