import {PageHeader} from 'antd';
import AvatarRZD from './common/AvatarRZD.js';
import EffectLogo from "./common/EffectLogo.js";
import LoginLinkButton from './common/LoginLinkButton.js';
import DropdownDocuments from "./documents/DropdownDocuments";
import topQuickAccessArray from './common/TopQuickAccess';

const HeaderGuest = () => {
    return (

        <PageHeader
            title={[<AvatarRZD/>, <EffectLogo/>]}
            extra={[
                ...topQuickAccessArray,
                <LoginLinkButton/>
            ]}
        />);
};

export default HeaderGuest;
