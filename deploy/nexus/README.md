# Размещение контейнеров в nexus.rzd
```
docker login nexus.rzd
docker tag <fastapi_image_ID> nexus.rzd/rzd-hub/oup/effect-fastapi:0.1
docker push nexus.rzd/rzd-hub/oup/effect-fastapi:0.1
docker tag <nginx_image_ID> nexus.rzd/rzd-hub/oup/effect-nginx-test:0.1
docker push nexus.rzd/rzd-hub/oup/effect-nginx-test:0.1
docker tag 45787adbac7b nexus.rzd/rzd-hub/oup/effect-react-dev:0.1
docker push nexus.rzd/rzd-hub/oup/effect-react-dev:0.1
docker rmi <fastapi_image_name>
docker rmi <nginx_image_name>
docker rmi <react_image_name>
```

# Перезалив с тем же тэгом
1. Создаем новый контейнер    
`docker build . -t effect-fastapi`
2. Прикрепляем к нему наименование из репозитория nexus    
`docker tag <effect-fastapi_ID> nexus.rzd/rzd-hub/oup/effect-fastapi:0.1`
3. Заменяем образ в репозитории    
`docker push nexus.rzd/rzd-hub/oup/effect-fastapi:0.1`
4. Удаляем образ из п.1     
`docker rmi effect-fastapi`
