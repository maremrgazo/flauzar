import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar.tsx';
import { AppSidebar } from './components/app-sidebar.tsx';
import { GlobalProvider } from "./GlobalContext";
import Footer from './components/Footer';
import { ThemeProvider } from "@/components/theme-provider"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <GlobalProvider>
        <SidebarProvider>
          <div className="flex h-screen w-screen overflow-hidden">
            {/* Sidebar on the left */}
            <AppSidebar />

            {/* Main content area with React Flow */}
            <main className="flex flex-1 flex-col overflow-hidden">
              {/* Sidebar trigger button */}
              <SidebarTrigger className="absolute top-2 left-2 z-10" />

              {/* Footer at the top */}
              <div>
              <Footer />
              </div>

              {/* React Flow container */}
              <div className="flex-1 overflow-hidden relative">
                <App />
              </div>
            </main>
          </div>
        </SidebarProvider>
      </GlobalProvider>
    </ThemeProvider>
  </StrictMode>
);