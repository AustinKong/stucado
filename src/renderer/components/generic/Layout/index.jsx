import { Outlet } from 'react-router-dom';
import styles from './styles.module.css';
import Sidebar from '@components/generic/Layout/Sidebar';
import Banner from '@components/generic/Layout/Banner';

const Layout = () => {
  return (
    <>
      <Sidebar />
      <Banner />
      <div className={styles.page}>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
