import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Dashboard } from '../pages/Dashboard/Dashboard';
import { Trackers } from '../pages/Trackers/Trackers';
import { TrackerDetails } from '../pages/TrackerDetails/TrackerDetails';
import { Activity } from '../pages/Activity/Activity';
import { Statistics } from '../pages/Statistics/Statistics';
import { Settings } from '../pages/Settings/Settings';
import { NotFound } from '../pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'trackers', element: <Trackers /> },
      { path: 'trackers/:id', element: <TrackerDetails /> },
      { path: 'activity', element: <Activity /> },
      { path: 'statistics', element: <Statistics /> },
      { path: 'settings', element: <Settings /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);