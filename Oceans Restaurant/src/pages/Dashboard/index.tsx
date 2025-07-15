import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import TitleSection from "../../components/TitleSection/TitleSection";

function Dashboard() {
  const [screen, setScreen] = useState<string>('');
  const location = useLocation();

  console.log('location', location.pathname);

  useEffect(() => {
    setScreen(location.pathname);
  }, [location.pathname]);

  const getScreenName = (path: string): string => {
    switch (path) {
      case '/dashboard':
        return 'Home';
      case '/dashboard/sells':
        return 'Ventas';
      case '/dashboard/settings':
        return 'Configuración';
      case '/dashboard/profile':
        return 'Perfil';
      default:
        if (path.startsWith('/dashboard/sells')) {
          return 'Ventas';
        } else if (path.startsWith('/dashboard/settings')) {
          return 'Configuración';
        } else if (path.startsWith('/dashboard/profile')) {
          return 'Perfil';
        }
        return 'Home';
    }
  };

  const screenName = getScreenName(screen);

  return (
    <>
      <Layout setScreen={setScreen} />
      <TitleSection title={screenName} />
      <Outlet />
    </>
  );
}

export default Dashboard;