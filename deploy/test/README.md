# Первичная установка ПО СИС ЭФФЕКТ НП

## Подготовительный этап
1. Создание директорий из под юзера docker    
```
mkdir /effect
mkdir /effect/backend
mkdir /effect/backend/logs
mkdir /effect/backend/files
mkdir /effect/backend/docs
mkdir /effect/backend/config
```    
2. Корректировка конфигурационного файла config.env (передается администратору отдельно)
```
DB_PASSWORD=ХХХХХХХ
PGAUTH_PASSWORD=ХХХХХХХ
# Вместо ХХХХХХХ вставить пароль для пользователя effect_pg 
```
3. Перенос конфигурационного файла config.env в директорию /effect/backend/config    
4. Перенос конфигураций docker-compose.yml в директорию /effect (передается администратору отдельно)

## Запуск контейнеров
1. Проверка наличия docker-compose.yml и сonfig.env в директориях        
```
ls /effect
ls /effect/backend/config
```    
2. Переход в директорию /effect    
`cd /effect`
3. Запуск контейнеров docker     
`docker-compose up -d`
4. Проверка контейнеров (должно быть 3 штуки react, nginx, fastapi)    
`docker ps`
5. Проверка старта backend приложения по логам   
```
cd /effect/backend/logs
tail -60f access.log
# В конце должны быть строки "Application startup complete."
```
6. Проверка работы в браузере    
```
http://10.248.71.210
http://10.248.71.210/api/v1/menu
```

## Остановка контейнеров
1. Остановка    
`docker-compose down`
2. Проверка удаления контейнеров (должен быть пустой список)    
`docker ps -a`
