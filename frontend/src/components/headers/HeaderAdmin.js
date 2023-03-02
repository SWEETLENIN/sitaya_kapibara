import {PageHeader} from 'antd';
import AvatarRZD from "./common/AvatarRZD";
import EffectLogo from "./common/EffectLogo.js";
import LogoutLinkButton from "./common/LogoutLinkButton";
import UserLoginInfo from "./common/UserLoginInfo";
import topQuickAccessArray from './common/TopQuickAccess';

import DropdownDocuments from "./documents/DropdownDocuments";
import DropdownAdmConsole from "./admconsole/DropdownAdmConsole";

const HeaderAdmin = ({auth}) => (
        <PageHeader
            title={[<AvatarRZD/>, <EffectLogo/>]}
            extra={[
                <DropdownAdmConsole/>,
                ...topQuickAccessArray,
                <UserLoginInfo auth={auth}/>,
                <LogoutLinkButton auth={auth}/>
            ]}
        />
);

export default HeaderAdmin;
