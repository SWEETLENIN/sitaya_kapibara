import {PageHeader} from 'antd';
import DropdownDocuments from "./documents/DropdownDocuments.js";
import SKText from "./common/SKText.js";
import LogoutLinkButton from "./common/LogoutLinkButton";
import UserLoginInfo from "./common/UserLoginInfo";
import AvatarSK from "./common/AvatarSK";
import topQuickAccessArray from './common/TopQuickAccess';

const HeaderUser = ({auth}) => (
        <PageHeader
            title={[<AvatarSK/>, <SKText/>, ...topQuickAccessArray,]}
            extra={[
                <UserLoginInfo auth={auth}/>,
                <LogoutLinkButton auth={auth}/>
            ]}
        />
);

export default HeaderUser;
