import {useState} from "react";
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {useLocation} from "react-router-dom";
import {Layout} from 'antd';

import EntryPage from "./components/entryPage/EntryPage";
import HeaderCustom from './components/headers/HeaderCustom';
import FooterCustom from './components/FooterCustom';
import Auth from './api/Auth';
import useToken from './hooks/useToken';
import NotAuthed from "./components/NotAuthed";
import NotFound from "./components/NotFound";
import Food from "./components/food/Food";
import MainPage from "./components/mainPage/MainPage";
import FoodAdmin from "./components/food/FoodAdmin";
import RestarauntAdmin from "./components/restaraunts/RestarauntAdmin";
import Contacts from "./components/contacts/Contacts";

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
              // element={<EntryPage auth={auth}/>}
              element={<MainPage/>}
            />
            <Route
                path="/auth"
                exact
                element={<EntryPage auth={auth}/>}
            />
            <Route
              path="/food"
              exact
              // element={<EntryPage auth={auth}/>}
              element={<Food/>}
            />
            <Route
                path="/contacts"
                exact
                // element={<EntryPage auth={auth}/>}
                element={<Contacts/>}
            />
            <>
              {
                token?.roles != null && token.roles.includes('ADMIN')
                ? <Route path="/admin">
                    <Route index={false} path="food" element={<FoodAdmin/>}/>
                    <Route index={false} path="rest" element={<RestarauntAdmin/>}/>
                    {/*<Route index={false} path="reports" element={<Reports/>}/>*/}
                    {/*<Route index={false} path="mailinglist" element={<MailingList/>}/>*/}
                    {/*<Route index={false} path="workgroups" element={<WorkGroupAdmin/>}/>*/}
                    {/*<Route index={false} path="tno" element={<CNewReports/>}/>*/}
                    {/*<Route index={false} path="menuTree" element={<TreeTNO/>}/>*/}
                    {/*<Route index={false} path="periods" element={<Periods/>}/>*/}
                    {/*<Route index={false} path="tasks" element={<Tasks/>}/>*/}
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
