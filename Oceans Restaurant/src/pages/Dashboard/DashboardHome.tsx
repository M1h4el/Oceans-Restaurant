import CardsMenu from '../../components/CardsMenu/CardsMenu';
import SideBar from '../../components/SideBar/SideBar';
import styles from './DashboardHome.module.scss';

const DashboardHome = () => {

  return (
    <>
    <div className={styles.container}>
      <CardsMenu />
    </div>
    <SideBar />
    </>
  )
}

export default DashboardHome