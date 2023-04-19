import {PageHeader} from 'antd';
import AvatarSK from './common/AvatarSK.js';
import SKText from "./common/SKText.js";
import LoginLinkButton from './common/LoginLinkButton.js';
import DropdownDocuments from "./documents/DropdownDocuments";
import topQuickAccessArray from './common/TopQuickAccess';

const HeaderGuest = () => {
    return (

        <PageHeader
            title={[<AvatarSK/>, <SKText/>]}
            extra={[
                ...topQuickAccessArray,
                <LoginLinkButton/>
            ]}
        />);
};

export default HeaderGuest;
