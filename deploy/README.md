# deploy без docker на сервере разработки

## Деплой СИС ЭФФЕКТА НП без контейнера на сервере разработки

#### Работа с Git

1. Переходим в директорию /webs:    
`cd /webs`
2. Клонируем репозиторий с gitlab с использованием токена для сервера разработки    
(токен можно получить у Погорелого Кирилла Николаевича pogorelyikn@gvc.rzd 
или у Подшивалова Александра Павловича oup_podshivalovap@gvc.rzd):    
`git clone http://dev-server:<ACCESS_TOKEN>@gitlab-lb-01.gvc.oao.rzd/oup623/effect.git`
3. После этого в дирректории /webs появился проект в effect, переходим в него:    
`cd effect`

#### Настройка pip для работы с РЖД nexus

1. Создать файл /etc/pip.conf:    
`cd /etc`    
`touch pip.conf`
2. Через редактор файлов vi вставить следующее содержимое:    
«[global]    
trusted-host = nexus.rzd    
index = https://nexus.rzd/repository/pypi-proxy/simple    
index-url = https://nexus.rzd/repository/pypi-proxy/simple»

#### Создание виртуального пространства (venv), установка модулей

1. Создаём виртуальное пространство для установки модулей:    
`python3.8 –m venv venv`
2. Активируем вирутальное пространство:    
`source venv/bin/activate`
3. После этого переходим обратно в /webs/effect/backend и устанавливаем модули:    
`cd /webs/effect/backend`    
`pip install –r requirements.txt`
4. После отключаем виртуальное пространство (venv):    
`deactivate`

#### Настройка запуска через сервис systemctl

1. Переходим в сервисы для настройки фонового запуска:    
`cd /etc/systemd/system`
2. Создаем новый файл сервиса fastapi_effect.service:    
`touch fastapi_effect.service`
3. Поместить содержимое:    
«[Unit]    
Description=Uvicorn Daemon for fastapi    
After=network.target    
[Service]    
User=root    
Group=root    
WorkingDirectory=/webs/effect    
ExecStart=/webs/effect/venv/bin/uvicorn --host 0.0.0.0 --port 8000 backend.main:app --reload    
[Install]    
WantedBy=multi-user.target»
4. Запустить созданный сервис:    
`sudo systemctl start fastapi_effect.service`
5. Проверить запущенный сервис:    
`sudo systemctl status fastapi_effect.service`
6. Открыть ссылку для проверки:    
http://10.248.131.31:8000/api/v1/menu/0/children

#### Настройка логирования для uvicorn

1. В корне проекта создаем файл uvicorn_log.ini:    
`cd /webs/effect`    
`touch uvicorn_log.ini`
2. Вставляем содержимое в новый файл uvicorn_log.ini:    
«[loggers]    
keys=root    
[handlers]    
keys=logfile    
[formatters]    
keys=logfileformatter    
[logger_root]    
level=DEBUG    
handlers=logfile    
[formatter_logfileformatter]    
format=[%(asctime)s.%(msecs)03d] %(levelname)s [%(thread)d] - %(message)s    
[handler_logfile]    
class=handlers.RotatingFileHandler    
level=INFO    
args=('/webs/effect/backend/logs/acceess.log','a')    
formatter=logfileformatter»
3. Останавливаем текущий сервис:    
`sudo systemctl stop fastapi_effect.service`
4. Корректируем содержимое файла сервиса:    
`cd /etc/systemd/system`    
`vi  fastapi_effect.service`
5. Изменяем строку запуска:    
«ExecStart=/webs/effect/venv/bin/uvicorn --host 0.0.0.0 --port 8000 
backend.main:app --reload --log-config /webs/effect/uvicorn_log.ini»
6. Запускаем и проверяем статус:    
`sudo systemctl start fastapi_effect.service`    
`sudo systemctl status fastapi_effect.service`
7. Проверка наличия лога access.log в указанном расположении:    
`cd /webs/effect/backend/logs`    
`ls`


## Инструкция по внесению изменений на сервере разработки из репозитория:

1. Остановить работу приложений:    
    `sudo systemctl stop react_effet.service`    
    `sudo systemctl stop fastapi_effect.service`

2. Проверить статус работы приложений:    
    `sudo systemctl status react_effet.service`    
    `sudo systemctl status fastapi_effect.service`

3. Загрузить обновления из репозитория на сервер разработки:    
    `cd /webs/effect`    
    `git fetch origin main`    
    `git merge FETCH_HEAD`

4. Запустить и проверить статус работы приложений:    
   1. `sudo systemctl start fastapi_effect.service`      
    `sudo systemctl status fastapi_effect.service`    
           (После того, как статус станет Active, перейти к следующему шагу)
   2. `tail -100f backend/logs/acceess.log`    
           (В логе должна появиться строка:
            [Дата и время запуска] INFO [140220219926336] - Application startup complete.
            После появление в логе данной строки приложение fastapi - запущено)

   3. `sudo systemctl start react_effet.service`    
       `sudo systemctl status react_effet.service`    
           (После того, как статус станет Active, перейти к следующему шагу)
   4. Перейти по ссылке сервера разработки и проверить работу системы: http://10.248.131.31:8081