from datetime import datetime
from datetime import timedelta
from random import randint
from os import urandom
import cherrypy

from util import UTC


EVENTS = [
    ('Salami turkey', 'Salami consequat excepteur picanha ribeye corned beef.'),
    ('Brisket short loin', 'Adipisicing sausage chicken non. Eu culpa ball tip sunt.'),
    ('Bacon ipsum dolor', 'Turkey cupim strip steak salami pariatur voluptate, swine quis frankfurter.'),
    ('Capicola pig', 'Beef occaecat brisket, cow id fatback capicola ipsum sed beef steak pork aliqua pastrami.'),
    ('Pastrami ex ullamco', 'Ad rump pork belly, t-bone sirloin beef ribs meatball eiusmod nulla andouille tempor'),
    ('Kielbasa labore', 'Short loin ham hock, tri-tip in meatloaf frankfurter voluptate t-bone burgdoggen mollit.'),
    ('Culpa lorem shoulder', 'Drumstick ball tip cupim consectetur, ut minim boudin qui.'),
    ('Aliqua ut reprehenderit', 'Drumstick enim pastrami beef ribs lorem, jerky labore proident picanha velit jowl.'),
    ('Consequat sed incididunt', 'Ea magna meatloaf short loin in, consectetur bresaola prosciutto alcatra flank.'),
    ('Fatback pancetta kevin', 'Tempor adipisicing pastrami velit chuck laboris ut tri-tip short swine proident in.'),
    ('Pig short frankfurter veniam', 'Sunt tenderloin biltong laboris pancetta, short loin dolore hamburger flank.')
]

LOCATIONS = [
  ('Florida Capitol', '400 S Monroe St', 'Tallahassee'),
  ('Lake Ella Park', '200 S Lake Ella Dr', 'Tallahassee'),
  ('Cascades Park', '1001 S Gadsden St', 'Tallahassee'),
  ('Florida State University', '600 W College Ave', 'Tallahassee')
]


@cherrypy.expose()
class EventService(object):
    @cherrypy.tools.json_out()
    def GET(self, *args, **kwargs):
        events = []
        for index, event in enumerate(EVENTS):
            events.append(build_event(*event, happening_now=index == 0))
        cherrypy.response.headers['access-control-allow-origin'] = '*'
        return events


def build_event(name, description, happening_now=False):
    now = datetime.utcnow().replace(tzinfo=UTC())
    start = now
    if not happening_now:
        start = add_random_hours(add_random_days(start))
    else:
        start -= timedelta(minutes=30)
    (location_name, location_street, location_city) = LOCATIONS[randint(0, len(LOCATIONS) - 1)]
    return {
        'id': random_id(),
        'name': name,
        'description': description,
        'created': now.isoformat(),
        'updated': now.isoformat(),
        'start': start.isoformat(),
        'end': add_random_hours(start).isoformat(),
        'location': {
            'name': location_name,
            'street': location_street,
            'city': location_city
        }
    }


def random_id():
    return urandom(8).encode('hex')


def add_random_days(date):
    days = randint(1, 30)
    return date + timedelta(days=days)


def add_random_hours(date):
    hours = randint(3, 10)
    return date + timedelta(hours=hours)
