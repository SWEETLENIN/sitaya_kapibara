import {Avatar, Image} from "antd";
const url = 'https://sun9-2.userapi.com/impf/c624427/v624427993/8b7f/KD9mW_tlh2A.jpg?size=640x640&quality=96&sign=649178846b1ff1758dd0df54cf9ef342&c_uniq_tag=5gPf7vLAv77gxbYuABoNxBZLngg60IMJYbg78M3-_4g&type=album';

const AvatarSK = () => (
  <Avatar src={url} shape='square' size={'large'} gap={0}/>
);

export default AvatarSK;
