import json
import falcon
from familienmitglied.familienmitgliedService import FamilienmitgliedService

#Beschreibung der CRUD-Operationen für die folgenden Endpunkte in einem Netzwerk:
class FamilienmitgliedRessource:

    #Gibt alle Familienmitglieder zurück:
    def on_get_familienmitglieder(self, req, resp):
        familienmitgliedlist = FamilienmitgliedService.get_familienmitglieder()
        resp.text = json.dumps([f.to_dict() for f in familienmitgliedlist], ensure_ascii=False, indent=2)
        resp.status = falcon.HTTP_200

    #Gibt ein Familienmitglied basiert auf der ID zurück:
    def on_get_familienmitglied(self, req, resp, id_familienmitglied):
        resp.text=None
        f = FamilienmitgliedService.get_familienmitglied(int(id_familienmitglied))
        resp.text = json.dumps(f.to_dict(), ensure_ascii=False, indent=2)
        resp.status = falcon.HTTP_200

    #Hinzufügen eines Familienmitglieds:
    def on_post_familienmitglied(self, req, resp):
        familienmitglied_json = json.load(req.bounded_stream)
        FamilienmitgliedService.create_familienmitglied(familienmitglied_json)
        resp.text = "Familienmitglied erfolgreich hinzugefügt."
        resp.status = falcon.HTTP_201
        resp.content_type = falcon.MEDIA_TEXT

    #Familienmitglied aktualisieren:
    def on_put_familienmitglied(self, req, resp, id_familienmitglied):
        familienmitglied_json = json.load(req.bounded_stream)
        FamilienmitgliedService.update_familienmitglied(id_familienmitglied, familienmitglied_json)
        resp.text = "Familienmitglied erfolgreich aktualisiert."
        resp.status = falcon.HTTP_OK
        resp.content_type = falcon.MEDIA_TEXT

    #Löschen eines Familienmitglieds:
    def on_delete_familienmitglied(self, req, resp, id_familienmitglied):
        FamilienmitgliedService.delete_familienmitglied(id_familienmitglied)
        resp.text = "Familienmitglied erfolgreich gelöscht."
        resp.status = falcon.HTTP_OK
        resp.content_type = falcon.MEDIA_TEXT

    #Priorität hinzufügen(d.h.Familienmitglied kann wählen):
    def on_post_priorisiert(self,req,resp):
        priorisiert_json = json.load(req.bounded_stream)
        FamilienmitgliedService.create_priorisiert(priorisiert_json)
        resp.text = "Priorität erfolgreich hinzugefügt."
        resp.status = falcon.HTTP_201
        resp.content_type = falcon.MEDIA_TEXT


