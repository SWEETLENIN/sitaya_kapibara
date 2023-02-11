
## Разработка

!!! hint "IP сервера разработки" 
    10.248.131.31

### Установка docker на Centos 7.2

1. Скачать на официальном сайте Docker rpm пакеты для версии 7.2: 
    1. docker-ce (v.19.03.15)
    2. docker-ce-cli (v. 19.03.15)
    3. containerd.io 
    4. docker-compose-plugin (v. 2.10.2)
    5. docker-scan-plugin (v. 0.17.0)
2. перенести пакеты в директорию и перейти в нее. 
3. Установить средствами yum:
   ```commandline
       sudo yum install <modules_from_1>
       # где <modules_from_1> - модули из пункта один с корректными версиями!
   ```
4. Запустить сервис docker, поставить в автозапуск, проверить статус:
   ```commandline
       sudo systemctl start docker
       sudo systemctl enable docker
       sudo systemctl status docker
   ```

### Обновляем код из Git
Получаем последнюю версию кода из Git -> main.  

```commandline
    cd /webs/effect    
    git fetch origin main    
    git merge FETCH_HEAD
```

### Собираем frontend
Собираем контейнер frontend и проверяем наличие image.  

```commandline
    cd /webs/effect/frontend
    docker build . -t dev-react
    docker image list
    # д.б. dev-react с тэгом latest
```

### Собираем backend
Собираем контейнер backend и проверяем наличие image  

```commandline
    cd /webs/effect/backend
    docker build . -t dev-fastapi
    docker image list
    # д.б. dev-fastapi с тэгом latest
```

### Подготовка к запуску

1. Создаем папки для работы приложения
    ```commandline
        mkdir /effect
        mkdir /effect/backend
        mkdir /effect/backend/logs
        mkdir /effect/backend/config
        mkdir /effect/backend/files
        mkdir /effect/backend/docs
    ```
2. В корне `/effect` необходим файл конфига `docker-compose.yml`
3. В директории `/effect/backend/config` необходимо поместить файл конфига backend приложения с корректными аттрибутами

!!! hint "О создании директорий п. 4.1" 
    Директории каждый раз создавать не нужно, п. 4.1 указан для действий при первичном деплое

### Модификация `docker-compose.yml`

1. Для деплоя на разработке в качестве основы подойдет файл конфига на тесте
2. Необходимо изменить названия контейнеров в соответсвующих секция для front и back
3. Для секции `front` в аттрибуте `image` выставить название созданного на п.2 контейнера: `dev-react:latest`
4. Для секции `back` в аттрибуте `image` выставить название созданного на п.3 контейнера: `dev-fastapi:latest`
5. Сохраняем изменения

### Запуск контейнеров
```commandline
    cd /effect
    docker compose up -d
    # лечим "багулю" (подробности ниже)
    ifconfig | grep br-
    ip link set dev <br-*> promisc on
    # где <br-*> название интерфейса с предыдущего шага 
```

!!! Error "БАГУЛЯ"
    на сервере разработке есть проблемы с работой контейнеров, поэтому необходимо доп. "лечение".  
    у docker на сервере разработки есть проблема с переводом собственной подсети (bridge) в "неразборчивый режим"  
    Подробнее об этом [здесь](https://serverfault.com/questions/516123/packets-only-get-forwarded-when-tcpdump-running-on-bridge)  
    Поэтому необходимо после запуска контейнеров `docker compose up -d` принудительно выставить неразборчивый режим у нового интерфейса  
    Получаем название интерфейса через `ifconfig | grep br-`  
    Выполняем команду с указанием названия интерфейса с предыдущего шага: `ip link set dev <br-*> promisc on`


!!! Error "ЕЩЕ БАГУЛЯ"
    Операции по "лечению" багули нужно делать быстро, чтобы контейнер back не отвалился при попытке подключения к БД  
    Также при перезапуске контейнеров также нужно будет проделывать такую операцию!

