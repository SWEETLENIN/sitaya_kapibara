import {PageHeader} from 'antd';
import DropdownDocuments from "./documents/DropdownDocuments.js";
import EffectLogo from "./common/EffectLogo.js";
import LogoutLinkButton from "./common/LogoutLinkButton";
import UserLoginInfo from "./common/UserLoginInfo";
import AvatarRZD from "./common/AvatarRZD";
import topQuickAccessArray from './common/TopQuickAccess';

const HeaderUser = ({auth}) => (
        <PageHeader
            title={[<AvatarRZD/>, <EffectLogo/>]}
            extra={[
                ...topQuickAccessArray,
                <UserLoginInfo auth={auth}/>,
                <LogoutLinkButton auth={auth}/>
            ]}
        />
);

export default HeaderUser;
