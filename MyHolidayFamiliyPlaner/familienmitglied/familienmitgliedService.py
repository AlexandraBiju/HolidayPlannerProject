from data.db_session import DBSession
from familienmitglied.familienmitglied import Familienmitglied
from relation.priorisiert import Priorisiert

#Hier werden die Funktionalitäten endpunktbezogener CRUD-Operationen beschrieben:
class FamilienmitgliedService:

    #Hier werden JSON-Objekte in eine Tabellenzeile konvertiert:
    @classmethod
    def __json_to_familienmitglied(cls, familienmitglied, json_familienmitglied):
        familienmitglied.geburtstag = json_familienmitglied['geburtstag']
        familienmitglied.name = json_familienmitglied['name']
        return familienmitglied

    @classmethod
    def __json_to_priorisiert(cls, priorisiert, json_priorisiert):
        priorisiert.id_familientmitglied = json_priorisiert['id_familienmitglied']
        priorisiert.id_urlaubwunsch = json_priorisiert['id_urlaubwunsch']
        priorisiert.prio = json_priorisiert['prio']
        return priorisiert

    #Hier wird die Session geöffnet,auf die Datenbank zugegriffen um alle Familienmitglieder zu erhalten:
    @classmethod
    def get_familienmitglieder(cls):
        session= DBSession.get_session()
        familienmitgliedlist = session.query(Familienmitglied).all()
        return familienmitgliedlist

    #Hier wird die Session geöffnet,auf die Datenbank zugegriffen um ein Familienmitglied basierend auf der ID zu erhalten:
    @classmethod
    def get_familienmitglied(cls, id_familienmitglied):
        session= DBSession.get_session()
        familienmitglied=session.query(Familienmitglied).get(id_familienmitglied)
        return familienmitglied

    #Hier wird die Session geöffnet,auf die Datenbank zugegriffen um ein Familienmitglied zu erstellen:
    @classmethod
    def create_familienmitglied(cls, json_familienmitglied):
        familienmitglied = Familienmitglied()
        familienmitglied = cls.__json_to_familienmitglied(familienmitglied, json_familienmitglied)
        session = DBSession.get_session()
        session.add(familienmitglied)
        session.commit()

    #Hier wird die Session geöffnet,auf die Datenbank zugegriffen um ein Familienmitglied basierend auf der ID zu aktualisieren:
    @classmethod
    def update_familienmitglied(cls, id_familienmitglied, json_familienmitglied):
        session = DBSession.get_session()
        familienmitglied = session.query(Familienmitglied).get(int(id_familienmitglied))
        cls.__json_to_familienmitglied(familienmitglied, json_familienmitglied)
        session.commit()

    #Hier wird die Session geöffnet,auf die Datenbank zugegriffen um ein Familienmitglied basierend auf der ID zu löschen:
    @classmethod
    def delete_familienmitglied(cls, id_familienmitglied):
        session = DBSession.get_session()
        familienmitglied = session.query(Familienmitglied).get(int(id_familienmitglied))
        session.delete(familienmitglied)
        session.commit()

    #erstellt einen Prioritätslink:
    @classmethod
    def create_priorisiert(cls,json_priorisiert):
        priorisiert=Priorisiert()
        priorisiert= cls.__json_to_priorisiert(priorisiert, json_priorisiert)
        session = DBSession.get_session()
        session.add(priorisiert)
        session.commit()