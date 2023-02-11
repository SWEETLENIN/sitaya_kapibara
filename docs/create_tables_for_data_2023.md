# Создание таблиц для данных в БД СИС ЭФФЕКТ НП

Скопировать файлы на ПК (передаются администратору по почте):    
- data_tables_create.sql

Скопировать на сервер файлы:    
- data_tables_create.sql

## Создание необходимых таблиц

`psql -U effect_pg -d effect -a -f data_tables_create.sql`
