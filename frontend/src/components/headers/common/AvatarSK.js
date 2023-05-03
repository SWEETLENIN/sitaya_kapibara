import {Avatar, Image} from "antd";
const url = 'https://sun9-2.userapi.com/impf/c624427/v624427993/8b7f/KD9mW_tlh2A.jpg?size=640x640&quality=96&sign=649178846b1ff1758dd0df54cf9ef342&c_uniq_tag=5gPf7vLAv77gxbYuABoNxBZLngg60IMJYbg78M3-_4g&type=album';

const AvatarSK = () => (
  <Image src="http://localhost:8000/api/v1/files/fa349e3e-c1b4-41e5-878f-2518e3f532f4" preview={false}
         width={30} height={40}/>
);

export default AvatarSK;
