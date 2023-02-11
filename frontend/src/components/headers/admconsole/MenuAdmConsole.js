import {Menu} from 'antd';
import {Link} from 'react-router-dom';

const MenuAdmConsole = () => (
  <Menu
      items={[
          {
              key: "Corr_menu",
              label: (<Link to="/admin/menu">Корректировка меню</Link>)
          },
          {
              key: "Rab_ads",
              label: (<Link to="/adverts">Работа с объявлениями</Link>),
          },
          {
              key: "New_reports_check",
              label: (<Link to="/admin/tno">Проверка новых отчетов</Link>)
          },
          {
              key: "Fact_prib",
              label: (<Link to="/admin/monitoring">Мониторинг отчетов</Link>)
          },
          {
              key: "Rab_sprav",
              label: "Работа со справочниками",
              children: [
                  {
                      key: "Tasks",
                      label: (<Link to="/admin/tasks">Задачи</Link>)
                  },
                  {
                      key: "Reports",
                      label: (<Link to="/admin/reports">Справки</Link>)
                  },
                  {
                      key: "WorkGroup",
                      label: (<Link to="/admin/workgroups">Рабочие группы</Link>)
                  },
                  {
                      key: "Periods",
                      label: (<Link to="/admin/periods">Периодичности</Link>)
                  },
                  {
                      key: "MailingList",
                      label: (<Link to="/admin/mailinglist">Электронные почты</Link>)
                  }
              ]
          }

      ]}
  />
);

export default MenuAdmConsole;
