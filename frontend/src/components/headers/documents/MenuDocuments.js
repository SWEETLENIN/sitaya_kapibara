import {Menu} from "antd";

const MenuDocuments = () => (
    <Menu
        items={[
            {
                label: "1st menu item",
                key: "0"
            },
            {
                label: "2nd menu item",
                key: "1"
            },
            {
                label: "3rd menu item",
                key: "3"
            }
        ]}
    />
);

export default MenuDocuments;
