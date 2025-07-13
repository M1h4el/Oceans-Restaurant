interface useContextDashboard {
  screen: string;
  setScreen: React.Dispatch<React.SetStateAction<string>>;
  handleScreen?: (screenSelected: string) => void;
}

export type { useContextDashboard };