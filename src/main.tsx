import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import './i18n';
import { ToastContainer } from 'react-toastify';
import ErrorBoundary from './components/orther/error/ErrorBoundary.tsx';
import LoadingPage from './pages/LoadingPage/LoadingPage.tsx';
import { AuthProvider } from './context/auth/AuthContext.tsx';
import { TicketCatalogProvider } from './context/ticketCatalog/TicketCatalogContext.tsx';
import { TicketProvider } from './context/ticket/TicketContext.tsx';
import { LocationProvider } from './context/location/LocationContext.tsx';
import { VehicleProvider } from './context/vehicle/VehicleContext.tsx';
import { VehicleCatalogProvider } from './context/vehicleCatalog/VehicleCatalogContext.tsx';
import { SeatProvider } from './context/seat/SeatContext.tsx';
import { SeatCatalogProvider } from './context/seatCatalog/SeatCatalogContext.tsx';
// import { PostProvider } from './context/post/PostContext.tsx';
// import { PostCatalogProvider } from './context/post/PostCatalogContext.tsx';
import { AgeProvider } from './context/age/AgeContext.tsx';
import { ServiceProvider } from './context/service/ServiceContext.tsx';
import { CartProvider } from './context/cart/CartContext.tsx';
import { TripProvider } from './context/trip/TripContext.tsx';
import { BackupProvider } from './context/backup/DataContext.tsx';
import { PostProvider } from './context/post/PostContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<LoadingPage loading={true} />}>
        <ErrorBoundary>
          <AuthProvider>
            <CartProvider>
              <TicketCatalogProvider>
                <TicketProvider>
                  <LocationProvider>
                    <VehicleCatalogProvider>
                      <VehicleProvider>
                        <TripProvider>
                          <SeatCatalogProvider>
                            <SeatProvider>
                              {/* <PostCatalogProvider> */}
                              <PostProvider>
                                <AgeProvider>
                                  <ServiceProvider>
                                    <ToastContainer />
                                    <BackupProvider>
                                      <App />
                                    </BackupProvider>
                                  </ServiceProvider>
                                </AgeProvider>
                              </PostProvider>
                              {/* </PostCatalogProvider> */}
                            </SeatProvider>
                          </SeatCatalogProvider>
                        </TripProvider>
                      </VehicleProvider>
                    </VehicleCatalogProvider>
                  </LocationProvider>
                </TicketProvider>
              </TicketCatalogProvider>
            </CartProvider>
          </AuthProvider>
        </ErrorBoundary>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
