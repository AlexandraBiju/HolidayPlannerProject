#Hier sind die Endpunkte in einem Netzwerk, mit denen wir auf das Backend zugreifen:
class UrlaubwunschController:

    def __init__(self, app, res):
        self.app=app
        self.res=res

        self.app.add_route('/urlaubwunsche', self.res, suffix='urlaubwunsche')
        self.app.add_route('/urlaubwunsch/{id_urlaubwunsch}', self.res, suffix='urlaubwunsch')
        self.app.add_route('/urlaubwunsch', self.res, suffix='urlaubwunsch')
        self.app.add_route('/urlaubwunsch_u',self.res,suffix='urlaub_urlaubwunsch')