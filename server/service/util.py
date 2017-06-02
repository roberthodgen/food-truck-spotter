from datetime import timedelta, tzinfo


class UTC(tzinfo):
    """ This `ztinfo` class is needed so `isoformat()` includes timezone information. """

    def utcoffset(self, dt):
        return timedelta(0)

    def tzname(self, dt):
        return 'UTC'

    def dst(self, dt):
        return timedelta(0)
