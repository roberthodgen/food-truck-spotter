import cherrypy

import service


def build_app():
    return cherrypy.Application(service.EventService(), '/api/events', {
        '/': {
            'request.dispatch': cherrypy.dispatch.MethodDispatcher()
        }
    })


if __name__ == '__main__':
    app = build_app()
    cherrypy.tree.mount(app)
    cherrypy.engine.signals.subscribe()
    cherrypy.engine.start()
    cherrypy.engine.block()
