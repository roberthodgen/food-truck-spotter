import cherrypy
from . import event


@cherrypy.expose()
class ApiService(object):
    def __init__(self):
        self.events = event.EventService()
