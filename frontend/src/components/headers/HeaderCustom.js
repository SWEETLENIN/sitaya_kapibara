import HeaderAdmin from './HeaderAdmin';
import HeaderUser from './HeaderUser';
import HeaderGuest from './HeaderGuest';
import {useNavigate} from 'react-router-dom';

const HeaderCustom = ({auth}) => {
    const navigate = useNavigate();
    
    const checkAuth = auth => {
        if (auth.config.tokenExpired()) {
            auth.clearTokens();
            navigate("/not-authed");
        }
    };
    const renderSwitch = roles => {
      if (!roles) return (<HeaderGuest/>);
      checkAuth(auth);
      if (roles.includes('ADMIN')) return (<HeaderAdmin auth={auth}/>);
      if (roles.includes('USER')) return (<HeaderUser auth={auth}/>);
      return (<HeaderGuest/>);
    };

    return (
      <div className="site-page-header-ghost-wrapper">
        {renderSwitch(auth?.token?.roles)}
      </div>
    );

}

export default HeaderCustom;
