import React, { useEffect } from 'react';
import { useNavStore } from './stores/useNavStore';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DocumentViewer } from './components/DocumentViewer';
import { OperatorControls } from './components/OperatorControls';
import { ProjectorDisplay } from './components/ProjectorDisplay';

export const App: React.FC = () => {
  const { theme, activeView, setActiveView } = useNavStore();

  // Check URL query parameters for projector window view mode
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('view') === 'projector') {
      setActiveView('projector');
    }
  }, [setActiveView]);

  if (activeView === 'projector') {
    return <ProjectorDisplay />;
  }

  return (
    <div className="min-h-screen flex flex-col" data-theme={theme}>
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        {activeView === 'operator' ? <OperatorControls /> : <DocumentViewer />}
      </div>
    </div>
  );
};

export default App;
