import {Typography, Card, Spin, Button, Badge, Pagination} from "antd";
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {advertsClient, getAdvertsForAuth, getCards, getAdvertsCount, getStatOtch} from "./AdvertsFunctions";
const {Title} = Typography;


const AdvertsForAuth = () => {
    const [adverts, setAdverts] = useState([]);
    const [advertsCount, setAdvertsCount] = useState(0);
    const [statOtchId, setStatOtchID] = useState(0);


    useEffect(() => {
        const fetchAdverts = async () => {
            let statId = await getStatOtch();
            setStatOtchID(statId);
            const advert = await getAdvertsForAuth(0);
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
                          <div className="AdvertsforAuth">
                              {getCards(adverts, statOtchId)}
                          </div>
                          <Link to='/adverts'><Button class="show_all_advs" l>Cм. все</Button></Link>
                      </>
                      :
                      <>
                          <Spin tip="Загрузка..."/>
                      </>
              }
          </>
      );
};

export default AdvertsForAuth;
