from wsgiref.simple_server import make_server
import falcon
from urlaub.urlaubController import UrlaubController
from urlaub.urlaubRessource import UrlaubRessource
from urlaubwunsch.urlaubwunschRessource import UrlaubwunschRessource
from urlaubwunsch.urlaubwunschController import UrlaubwunschController
from familienmitglied.familienmitgliedController import FamilienmitgliedController
from familienmitglied.familienmitgliedRessource import FamilienmitgliedRessource

#Anwendung,die den Falcon-Server öffnet:
app = application = falcon.App()

ures=UrlaubRessource()
uwres=UrlaubwunschRessource()
fres=FamilienmitgliedRessource()

uc = UrlaubController(app,ures)
uwc=UrlaubwunschController(app,uwres)
fc=FamilienmitgliedController(app,fres)

if __name__=='__main__':
    with make_server("",8080,app) as httpd:
        print('Serving on port 8080...')
        httpd.serve_forever()
