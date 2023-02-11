import {Pagination, Spin, Typography, Badge} from "antd";
import {useEffect, useState} from 'react';
import {advertsClient, getAdvertsPage, getAdvertsCount, getCards, getStatOtch} from "./AdvertsFunctions";

const {Title} = Typography;



const AdvertsMain = () => {
    const [adverts, setAdverts] = useState([]);
    const [advertsCount, setAdvertsCount] = useState(0);
    const [statOtchId, setStatOtchID] = useState(0)
    const onPaginationChange = async (page) => {
        const adverts = await getAdvertsPage(page - 1, 10);
        setAdverts(adverts);
    }



    useEffect(() => {
        const fetchAdverts = async () => {
            let statId = await getStatOtch();
            setStatOtchID(statId);
            const advert = await getAdvertsPage(0, 10);
            setAdverts(advert);
            const adverts_count = await getAdvertsCount();
            setAdvertsCount(adverts_count)
        };
        fetchAdverts();
    }, []);



    return (
        <>

            <Title level={3}>ОБЪЯВЛЕНИЯ</Title>
            {advertsCount === 0 || advertsCount===null
                ?
                <>
                    <h2>ОБЪЯВЛЕНИЙ НЕТ!</h2>
                </>
                :
                    adverts.length>0
                    ?
                    <>
                        <div className="Adverts">
                            {getCards(adverts, statOtchId)}
                        </div>
                        <Pagination showSizeChanger={false} total={advertsCount}
                                    onChange={(page) => onPaginationChange(page)}
                        />
                    </>
                    :
                    <>
                        <Spin tip="Загрузка..."/>
                    </>
            }
        </>
    );
};

export default AdvertsMain;
