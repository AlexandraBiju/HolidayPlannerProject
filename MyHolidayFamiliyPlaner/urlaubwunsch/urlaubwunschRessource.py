import json
import falcon
from urlaubwunsch.urlaubwunschService import UrlaubwunschService

#Beschreibung der CRUD-Operationen für die folgenden Endpunkte in einem Netzwerk:
class UrlaubwunschRessource:

    #Gibt alle Urlaubwünsche zurück:
    def on_get_urlaubwunsche(self, req, resp):
        urlaubwunschlist = UrlaubwunschService.get_urlaubwunsche()
        resp.text=json.dumps([u.to_dict() for u in urlaubwunschlist], ensure_ascii=False, indent=2)
        resp.status = falcon.HTTP_200

    #Gibt ein Urlaubwunsch basiert auf der ID zurück:
    def on_get_urlaubwunsch(self, req, resp, id_urlaubwunsch):
        resp.text=None
        u = UrlaubwunschService.get_urlaubwunsch(int(id_urlaubwunsch))
        resp.text = json.dumps(u.to_dict(), ensure_ascii=False, indent=2)
        resp.status = falcon.HTTP_200

    #Urlaubwunsch hinzufügen:
    def on_post_urlaubwunsch(self, req, resp):
        urlaubwunsch_json = json.load(req.bounded_stream)
        UrlaubwunschService.create_urlaubwunsch(urlaubwunsch_json)
        resp.text = "Urlaubwunsch erfolgreich hinzugefügt."
        resp.status = falcon.HTTP_201
        resp.content_type = falcon.MEDIA_TEXT

    #Urlaubwunsch aktualisieren:
    def on_put_urlaubwunsch(self, req, resp, id_urlaubwunsch):
        urlaubwunsch_json = json.load(req.bounded_stream)
        UrlaubwunschService.update_urlaubwunsch(id_urlaubwunsch, urlaubwunsch_json)
        resp.text = "urlaubwunsch erfolgreich aktualisiert."
        resp.status = falcon.HTTP_OK
        resp.content_type = falcon.MEDIA_TEXT

    #Urlaubwunsch löschen:
    def on_delete_urlaubwunsch(self, req, resp, id_urlaubwunsch):
        UrlaubwunschService.delete_urlaubwunsch(id_urlaubwunsch)
        resp.text = "urlaubwunsch erfolgreich gelöscht."
        resp.status = falcon.HTTP_OK
        resp.content_type = falcon.MEDIA_TEXT

    #Dies gibt den Namen des Urlaubs und den Wunsch zurück:
    def on_get_urlaub_urlaubwunsch(self,req,resp):
        resp.text = json.dumps(UrlaubwunschService.get_urlaub_urlaubwunsch(), ensure_ascii=False, indent=2)
        resp.status = falcon.HTTP_OK
        resp.content_type = falcon.MEDIA_TEXT
