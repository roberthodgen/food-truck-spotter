import os
import cherrypy
import service


PUBLIC = os.path.abspath(os.path.join(os.path.dirname(__file__), 'public'))

CONFIG = {
    '/build':{
        'tools.staticdir.on': True,
        'tools.staticdir.dir': os.path.join(PUBLIC, 'build')
    },
    '/assets': {
        'tools.staticdir.on': True,
        'tools.staticdir.dir': os.path.join(PUBLIC, 'assets')
    },
    '/service-worker.js': {
        'tools.staticfile.on': True,
        'tools.staticfile.filename': os.path.join(PUBLIC, 'service-worker.js')
    },
    '/manifest.json': {
        'tools.staticfile.on': True,
        'tools.staticfile.filename': os.path.join(PUBLIC, 'manifest.json')
    },
    '/api': {
        'request.dispatch': cherrypy.dispatch.MethodDispatcher()
    }
}


class RootService(object):
    def __init__(self):
        self.api = service.ApiService()

    @cherrypy.expose(['index.html'])
    def index(self):
        return open(os.path.join(PUBLIC, 'index.html'))

    @cherrypy.expose(['cordova.js'])
    def cordova(self):
        cherrypy.response.headers['content-type'] = 'application/json'
        return '// Provided so 404 won\'t bubble in the console :)'


def build_app():
    return cherrypy.Application(RootService(), '/', CONFIG)


if __name__ == '__main__':
    app = build_app()
    cherrypy.tree.mount(app)
    cherrypy.engine.signals.subscribe()
    cherrypy.engine.start()
    cherrypy.engine.block()
