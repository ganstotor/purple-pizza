import { NavLink, Outlet, useNavigate } from "react-router-dom";
import styles from './Layout.module.css'
import Button from "../../components/Button/Button";
import cn from 'classnames';
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { userActions } from "../../store/user.slice";

export function Layout() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>()

  const logout = () => {
    dispatch(userActions.logout());
    navigate('/auth/login');
  }

  return <div className={styles['layout']}>
    <div className={styles['sidebar']}>
      <div className={styles['user']}>
        <img className={styles['avatar']} src="/man.png" height="70px" alt="" />
        <div className={styles['name']}>
          Александр Грицун
        </div>
        <div className={styles['email']}>
          ganstotor@gmail.com
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
          Корзина</NavLink>
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