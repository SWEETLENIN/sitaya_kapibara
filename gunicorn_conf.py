from multiprocessing import cpu_count

#Socket Path
bind = "10.248.131.31:8000"

#Worker Options
workers = 1
worker_class = 'uvicorn.workers.UvicornWorker'

#Logging Options
loglevel = 'debug'
accesslog = '/webs/effect_prototype/logs/access.log'
errorlog = '/webs/effect_prototype/logs/error.log'
