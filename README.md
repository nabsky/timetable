# timetable
Учёт рабочего времени сотрудников (marionette)

Перед запуском установить CouchDB (http://couchdb.apache.org/) и прописать в его настройках  (etc/couchdb/local.ini) CORS:


```
[httpd]
enable_cors = true

[cors]
origins = *
credentials = true
headers = accept, authorization, content-type, origin, referer
methods = GET, PUT, POST, HEAD, DELETE
```

Запускать на компе с включенной вебкамерой. Чтобы Chrome каждый раз не запрашивал разрешение на доступ к камере прописать в его ярлыке ключ 
```
--use-fake-ui-for-media-stream
```
