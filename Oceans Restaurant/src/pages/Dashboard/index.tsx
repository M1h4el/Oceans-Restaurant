import { useState } from "react";
import { Outlet } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import TitleSection from "../../components/TitleSection/TitleSection";

function Dashboard() {
  const [screen, setScreen] = useState<string>('/dashboard');

  const getScreenName = (screen: string): string => {
    switch (screen) {
      case '/dashboard':
        return 'Home';
      case '/dashboard/sells':
        return 'Ventas';
      case '/dashboard/settings':
        return 'Configuración';
      case '/dashboard/profile':
        return 'Perfil';
      default:
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