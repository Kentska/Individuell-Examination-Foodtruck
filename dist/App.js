import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Eta from './pages/Eta';
import Receipt from './components/ReceiptPage';
const App = () => (_jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Menu, {}) }), _jsx(Route, { path: "/cart", element: _jsx(Cart, {}) }), _jsx(Route, { path: "/eta", element: _jsx(Eta, {}) }), _jsx(Route, { path: "/receipt", element: _jsx(Receipt, {}) })] }) }));
export default App;
