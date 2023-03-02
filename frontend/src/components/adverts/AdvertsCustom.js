import AdvertsMain from "./AdvertsMain";
import AdvertsAdmin from "./AdvertsAdmin";

const AdvertsCustom = ({auth}) => {

    const renderSwitch = roles => {
        if (!roles) return (<AdvertsMain/>);
        if (roles.includes('ADMIN')) return (<AdvertsAdmin auth={auth}/>);
        return (<AdvertsMain/>);
    };

    return (renderSwitch(auth?.token?.roles));

}

export default AdvertsCustom;