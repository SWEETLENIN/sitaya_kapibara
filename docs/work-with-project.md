## Подготовительная фаза
### Предварительные условия 
- установлен python 3.8.10
- установлена среда разработки PyCharm
- установлен Git
- получено приглашение в gitlab
- есть сетевой доступ:
    - до сервера nexus.rzd
    - до серверов разработки (10.248.131.31, 10.248.131.32)


###  Создание персонального токена gitlab
- авторизуемся в gitlab
- переходим по [ссылке](https://gitlab-lb-01.gvc.oao.rzd/-/profile/personal_access_tokens)
- заполняем поля:
    - название токена (пример - effect_podshivalov)
    - дата истечения (рекомендуется побольше выставить)
    - раздел "select scopes": "api"    

!!! Error "Осторожно" 
    после создания, вверху страницы будет представлен пароль токена, который показывается один раз, его необходимо сохранить.


### Clone проекта 
- открываем командную строку(cmd).
- переходи в родительскую директорию (Например: `C:\Users\KorneevYaI\Documents\DEVELOP`)
- пишем в cmd команду клонирования `git clone http://gitlab-lb-01.gvc.oao.rzd/oup623/effect.git`
- вводим имя пользователя (Логин электронной почты без домена. Пример: KorneevYaI)
- вводим пароль от УЗ или токен, сохраненный ранее на 2 этапе.

### Подключение к Nexus 
- перейти в папку `AppData\Roaming`, после в создать папку `pip`. (Пример пути: `C:\Users\KorneevYaI\AppData\Roaming\pip`)
- создаем файл `pip.ini` со следующим содержимым:  
  ```ini
       [global]  
       trusted-host = nexus.rzd  
       index = https://nexus.rzd/repository/pypi-proxy/simple  
       index-url = https://nexus.rzd/repository/pypi-proxy/simple   
  ```
- сохраняем файл.

### Создание venv и установка модулей
- открываем проект в Pycharm
- открываем `File->Settings->Project->Python Interpreter`
- нажимаем на шестеренку и добавляем новую виртуальную среду (все поля заполняются по дефолту).
- виртуальная среда должна быть расположена в папке venv. Указать новый Python Interpreter из папки venv\Scripts
- в терминале Pycharm перед директорией проекта должно быть указано (venv). 
- для установки модулей надо перейти в папку backend `cd backend` и выполнить команду: `pip install -r requirements.txt`

!!! hint "Если приписка venv отсутствует в терминале" 
    зайти в `File->Settings->Tools->Terminal` и в `Shell path` указать `cmd.exe`, после чего перезапустить Pycharm

## Запуск backend

### Через командную строку(cmd):

1. Переходим в папку effect.(Пример: `cd C:\Users\KorneevYaI\Documents\DEVELOP\effect`)    
2. Запускаем uvicorn: `uvicorn backend.main:app --reload`    
3. Проверяем в папке `backend/logs` запустился ли проект.    

### Через Pycharm
1. Открываем проект effect
2. Переходим во вкладку `Terminal`
3. Запускаем uvicorn: `uvicorn backend.main:app --reload`
4. Проверяем в папке `backend/logs` запустился ли проект.

## Полезные git команды
- Для создания своей ветки в терминале нужно прописать (имя должно быть без пробелов): `git checkout -b <branch_name>` 
- После корректировки в файлах, для добавления их в stage, пишем в терминале: `git add <filename>` или `gid add -A` для добавления всех файлов
- Проверить наличие файлов в stage можно с помощью команды `git status`
- Чтобы закоммитить файлы в локальном гите пишем в терминале: `git commit -m "<comment>"`
- Посмотреть содержимого последнего коммита можно с помощью `git show HEAD`
- Чтобы отобразить последние изменения в проекте, которые не включены в коммит: `git diff`
- Чтобы запушить файлы после коммита в свою ветку на удаленном репозитории: `git push origin <branch_name>`

