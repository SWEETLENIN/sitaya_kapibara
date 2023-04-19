import {PageHeader} from 'antd';
import AvatarSK from "./common/AvatarSK";
import SKText from "./common/SKText.js";
import LogoutLinkButton from "./common/LogoutLinkButton";
import UserLoginInfo from "./common/UserLoginInfo";
import topQuickAccessArray from './common/TopQuickAccess';

import DropdownDocuments from "./documents/DropdownDocuments";
import DropdownAdmConsole from "./admconsole/DropdownAdmConsole";

const HeaderAdmin = ({auth}) => (
        <PageHeader
            title={[<AvatarSK/>, <SKText/>,...topQuickAccessArray]}
            extra={[
                <DropdownAdmConsole/>,
                <UserLoginInfo auth={auth}/>,
                <LogoutLinkButton auth={auth}/>
            ]}
        />
);

export default HeaderAdmin;
