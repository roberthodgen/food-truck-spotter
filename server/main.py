import cherrypy


@cherrypy.expose()
class EventService(object):
    @cherrypy.tools.json_out()
    def GET(self, *args, **kwargs):
        return [{
            'id': '6fc9a8c4f9a27948',
            'name': 'Food Truck Fridays',
            'description': 'Come see us this Friday for local Food Truck Fridays at Lorem Ipsum!',
            'start': '2017-06-02-31T20:00:00.000Z',
            'end': '2017-06-03T01:00:00.000Z',
            'created': '2017-05-31T01:13:42.810Z',
            'updated': '2017-05-31T01:13:42.810Z',
            'location': {
                'name': 'Lorem Ipsum',
                'street': '400 S Monroe St',
                'city': 'Tallahassee'
            }
        }]


def build_app():
    return cherrypy.Application(EventService(), '/api/events', {
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
