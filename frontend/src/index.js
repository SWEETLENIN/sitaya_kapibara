import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import 'antd/dist/antd.css';

import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
