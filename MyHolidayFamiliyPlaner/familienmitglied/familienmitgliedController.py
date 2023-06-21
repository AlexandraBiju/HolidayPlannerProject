#Hier sind die Endpunkte in einem Netzwerk, mit denen wir auf das Backend zugreifen:
class FamilienmitgliedController:

    def __init__(self, app, res):
        self.app=app
        self.res=res

        self.app.add_route('/familienmitglieder', self.res, suffix='familienmitglieder')
        self.app.add_route('/familienmitglied/{id_familienmitglied}', self.res, suffix='familienmitglied')
        self.app.add_route('/familienmitglied', self.res, suffix='familienmitglied')
        self.app.add_route('/priorisiert',self.res,suffix='priorisiert')
