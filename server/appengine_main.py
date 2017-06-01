from main import build_app

from google.appengine.ext.webapp.util import run_wsgi_app

app = build_app()
run_wsgi_app(app)
