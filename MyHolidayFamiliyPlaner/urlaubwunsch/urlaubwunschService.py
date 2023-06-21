from sqlalchemy import text
from data.db_session import DBSession
from urlaubwunsch.urlaubwunsch import Urlaubwunsch

#Hier werden die Funktionalitäten endpunktbezogener CRUD-Operationen beschrieben:
class UrlaubwunschService:

    #Hier wird ein JSON-Objekt in eine Tabellenzeile konvertiert:
    @classmethod
    def __json_to_urlaubwunsch(cls, urlaubwunsch, json_urlaubwunsch):
        urlaubwunsch.ort = json_urlaubwunsch['ort']
        urlaubwunsch.beschreibung = json_urlaubwunsch['beschreibung']
        urlaubwunsch.id_urlaub = json_urlaubwunsch['id_urlaub']
        return urlaubwunsch

    #Diese Funktion wandelt die Antwort aus der Datenbank in JSON um:
    @classmethod
    def __query_urlaub_urlaubwunsch_to_json(cls,resp):
        result = []
        for elem in resp:
            result.append({"id_urlaubwunsch": elem[0], "ort": elem[1], "titel":elem[2], "zeitraum":elem[3]})
        return result

    #Hier wird die Session geöffnet,auf die Datenbank zugegriffen um alle Urlaubwünsche zu erhalten:
    @classmethod
    def get_urlaubwunsche(cls):
        session= DBSession.get_session()
        urlaubwunschlist = session.query(Urlaubwunsch).all()
        return urlaubwunschlist

    #Hier wird die Session geöffnet,auf die Datenbank zugegriffen um ein Urlaubwunsch basierend auf der ID zu erhalten:
    @classmethod
    def get_urlaubwunsch(cls, id_urlaubwunsch):
        session= DBSession.get_session()
        urlaubwunsch=session.query(Urlaubwunsch).get(id_urlaubwunsch)
        return urlaubwunsch

    #Hier wird die Session geöffnet,auf die Datenbank zugegriffen um ein Urlaubwunsch zu erstellen:
    @classmethod
    def create_urlaubwunsch(cls, json_urlaubwunsch):
        urlaubwunsch = Urlaubwunsch()
        urlaubwunsch = cls.__json_to_urlaubwunsch(urlaubwunsch, json_urlaubwunsch)
        session = DBSession.get_session()
        session.add(urlaubwunsch)
        session.commit()
    #Hier wird die Session geöffnet,auf die Datenbank zugegriffen um ein Urlaubwunsch basierend auf der ID zu aktualisieren:
    @classmethod
    def update_urlaubwunsch(cls, id_urlaubwunsch, json_urlaubwunsch):
        session = DBSession.get_session()
        urlaubwunsch = session.query(Urlaubwunsch).get(int(id_urlaubwunsch))
        cls.__json_to_urlaubwunsch(urlaubwunsch, json_urlaubwunsch)
        session.commit()

    #Hier wird die Session geöffnet,auf die Datenbank zugegriffen um ein Urlaubwunsch basierend auf der ID zu löschen:
    @classmethod
    def delete_urlaubwunsch(cls, id_urlaubwunsch):
        session = DBSession.get_session()
        urlaubwunsch = session.query(Urlaubwunsch).get(int(id_urlaubwunsch))
        session.delete(urlaubwunsch)
        session.commit()

    #Hier erhalten wir den Urlaubwunsch und den Namen:
    @classmethod
    def get_urlaub_urlaubwunsch(cls):
        session = DBSession.get_session()
        res = session.execute(text('SELECT ul.id_urlaubwunsch , ul.ort , u.titel , u.zeitraum FROM urlaubwunsch as ul '
                                   ', urlaub as u WHERE ul.id_urlaub = u.id_urlaub ;'))
        final = cls.__query_urlaub_urlaubwunsch_to_json(res.all())
        return final

