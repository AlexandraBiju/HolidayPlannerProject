import json
import falcon
from urlaub.urlaubService import UrlaubService

#Beschreibung der CRUD-Operationen für die folgenden Endpunkte in einem Netzwerk:
class UrlaubRessource:

    #Gibt alle Urlaube zurück:
    def on_get_urlaube(self, req, resp):
        urlaublist = UrlaubService.get_urlaube()
        resp.text = json.dumps([u.to_dict() for u in urlaublist], ensure_ascii=False, indent=2)
        resp.status = falcon.HTTP_200

    #Gibt ein Urlaub basiert auf der ID zurück:
    def on_get_urlaub(self, req, resp, id_urlaub):
        resp.text = None
        u = UrlaubService.get_urlaub(int(id_urlaub))
        resp.text = json.dumps(u.to_dict(), ensure_ascii=False, indent=2)
        resp.status = falcon.HTTP_200

    #Urlaub hinzufügen:
    def on_post_urlaub(self, req, resp):
        urlaub_json = json.load(req.bounded_stream)
        UrlaubService.create_urlaub(urlaub_json)
        resp.text = "Urlaub erfolgreich hinzugefügt."
        resp.status = falcon.HTTP_201
        resp.content_type = falcon.MEDIA_TEXT

    #Urlaub aktualisieren:
    def on_put_urlaub(self, req, resp, id_urlaub):
        urlaub_json = json.load(req.bounded_stream)
        UrlaubService.update_urlaub(id_urlaub, urlaub_json)
        resp.text = "Urlaub erfolgreich aktualisiert."
        resp.status = falcon.HTTP_OK
        resp.content_type = falcon.MEDIA_TEXT

    #Urlaub Löschen:
    def on_delete_urlaub(self, req, resp, id_urlaub):
        UrlaubService.delete_urlaub(id_urlaub)
        resp.text = "Urlaub erfolgreich gelöscht."
        resp.status = falcon.HTTP_OK
        resp.content_type = falcon.MEDIA_TEXT

    #Gibt die von Familienmitgliedern vergebene Punktzahl zurück:
    def on_get_scores(self, req, resp):
        resp.text = json.dumps(UrlaubService.get_scores(), ensure_ascii=False, indent=2)
        resp.status = falcon.HTTP_OK
        resp.content_type = falcon.MEDIA_TEXT
