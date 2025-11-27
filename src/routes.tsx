import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import NFTDetail from './pages/NFTDetail';
import About from './pages/About';
import Resources from './pages/Resources';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Home',
    path: '/',
    element: <Home />,
    visible: false,
  },
  {
    name: 'Marketplace',
    path: '/marketplace',
    element: <Marketplace />,
  },
  {
    name: 'NFT Detail',
    path: '/nft/:id',
    element: <NFTDetail />,
    visible: false,
  },
  {
    name: 'About Us',
    path: '/about',
    element: <About />,
  },
  {
    name: 'Resources',
    path: '/resources',
    element: <Resources />,
  },
  {
    name: 'FAQ',
    path: '/faq',
    element: <FAQ />,
  },
  {
    name: 'Contact',
    path: '/contact',
    element: <Contact />,
  },
];

export default routes;