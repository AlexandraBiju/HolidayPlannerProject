#Hier sind die Endpunkte in einem Netzwerk, mit denen wir auf das Backend zugreifen:
class UrlaubController:

    def __init__(self, app, res):
        self.app=app
        self.res=res

        self.app.add_route('/urlaube', self.res, suffix='urlaube')
        self.app.add_route('/urlaub/{id_urlaub}', self.res, suffix='urlaub')
        self.app.add_route('/urlaub', self.res, suffix='urlaub')
        self.app.add_route('/urlaubscore', self.res, suffix='scores')


