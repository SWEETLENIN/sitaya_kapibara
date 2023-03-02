import {useState} from "react";
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {useLocation} from "react-router-dom";
import {Layout} from 'antd';

import EntryPage from "./components/entryPage/EntryPage";
import HeaderCustom from './components/headers/HeaderCustom';
import FooterCustom from './components/FooterCustom';
import WorkGroupAdmin from './components/workGroups/WorkGroupAdmin';
import MailingList from './components/MailingList/MailingList';
import Auth from './api/Auth';
import useToken from './hooks/useToken';
import MenuCustom from './components/menu/MenuCustom';
import AdvertsCustom from "./components/adverts/AdvertsCustom";
import UserRights from "./components/userRights/UserRights";
import UserAsozRights from "./components/userAsozRights/UserAsozRights";
import MenuAdminEffect from "./components/menu/MenuAdminEffect";
import FactIncomes from "./components/factIncomes/FactIncomes";
import Reports from "./components/reports/Reports";
import CNewReports from "./components/checkNewReports/CNewReports";
import TreeTNO from "./components/checkNewReports/TreeTNO";
import Periods from "./components/periods/Periods";
import Tasks from "./components/tasks/Tasks";
import NotAuthed from "./components/NotAuthed";
import NotFound from "./components/NotFound";

const {Content} = Layout

function App() {
  const [move, setMove] = useState({});
  const { token, setToken } = useToken();
  const auth = new Auth(token, setToken);
  const effectRegexp = /^\/effect/; // для проверки URL из фрейма ДИСКОР

  return (
    <Layout className="App" style={{minHeight: "100vh"}}>

      <Router>

        {// для страниц, которые показываются в ДИСКОРЕ не нужна шапка!
        effectRegexp.test(window.location.pathname)
          ? <></>
          : <HeaderCustom auth={auth}/>}
        <Content className="wrapper">
          <Routes>
            <Route
              path="/"
              exact
              element={<EntryPage auth={auth}/>}
            />

            <Route
              path="/menu"
              exact
              element={<MenuCustom auth={auth}/>}
            />
            <Route
                path="/adverts"
                exact
                element={<AdvertsCustom auth={auth}/>}
            />
            <Route path="/effect">
              <Route
                  path="user/:userId/rights"
                  element={<UserRights/>}
              />
              <Route
                  path="user_asoz/:userAsozId/rights"
                  element={<UserAsozRights/>}
              />
            </Route>
            <>
              {
                token?.roles != null && token.roles.includes('ADMIN')
                ? <Route path="/admin">
                    <Route index={false} path="menu" element={<MenuAdminEffect move={move} setMove={setMove}/>}/>
                    <Route index={false} path="monitoring" element={<FactIncomes/>}/>
                    <Route index={false} path="reports" element={<Reports/>}/>
                    <Route index={false} path="mailinglist" element={<MailingList/>}/>
                    <Route index={false} path="workgroups" element={<WorkGroupAdmin/>}/>
                    <Route index={false} path="tno" element={<CNewReports/>}/>
                    <Route index={false} path="menuTree" element={<TreeTNO/>}/>
                    <Route index={false} path="periods" element={<Periods/>}/>
                    <Route index={false} path="tasks" element={<Tasks/>}/>
                </Route>
                : <></>
              }
            </>
            <Route
              path="/not-authed"
              element={<NotAuthed/>}
            />
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </Content>
        {// для страниц, которые показываются в ДИСКОРЕ не нужен подвал!
          effectRegexp.test(window.location.pathname)
          ? <></>
          : <FooterCustom/>}

      </Router>
    </Layout>
  );
}

export default App;
