from sqlalchemy import text
from data.db_session import DBSession
from urlaub.urlaub import Urlaub

#Hier werden die Funktionalitäten endpunktbezogener CRUD-Operationen beschrieben:
class UrlaubService:

    #Hier wird ein JSON-Objekt in eine Tabellenzeile konvertiert:
    @classmethod
    def __json_to_urlaub(cls, urlaub, json_urlaub):
        urlaub.zeitraum = json_urlaub['zeitraum']
        urlaub.titel = json_urlaub['titel']
        return urlaub

    #Hier wird eine Tabellenzeile in JSON-Objekt konvertiert:
    @classmethod
    def __query_score_to_json(cls, resp):
        result = []
        for elem in resp:
            result.append({"id_urlaub": elem[0], "prio": elem[1]})
        return result

    #Hier wird die Session geöffnet,auf die Datenbank zugegriffen um alle Urlaube zu erhalten:
    @classmethod
    def get_urlaube(cls):
        session= DBSession.get_session()
        urlaublist = session.query(Urlaub).all()
        return urlaublist

    #Hier wird die Session geöffnet,auf die Datenbank zugegriffen um ein Urlaub basierend auf der ID zu erhalten:
    @classmethod
    def get_urlaub(cls, id_urlaub):
        session= DBSession.get_session()
        urlaub=session.query(Urlaub).get(id_urlaub)
        return urlaub

    #Hier wird die Session geöffnet,auf die Datenbank zugegriffen um ein Urlaub zu erstellen:
    @classmethod
    def create_urlaub(cls, json_urlaub):
        urlaub = Urlaub()
        urlaub = cls.__json_to_urlaub(urlaub, json_urlaub)
        session = DBSession.get_session()
        session.add(urlaub)
        session.commit()

    #Hier wird die Session geöffnet,auf die Datenbank zugegriffen um ein Urlaub basierend auf der ID zu aktualisieren:
    @classmethod
    def update_urlaub(cls, id_urlaub, json_urlaub):
        session = DBSession.get_session()
        urlaub = session.query(Urlaub).get(int(id_urlaub))
        cls.__json_to_urlaub(urlaub, json_urlaub)
        session.commit()

    #Hier wird die Session geöffnet,auf die Datenbank zugegriffen um ein Urlaub basierend auf der ID zu löschen:
    @classmethod
    def delete_urlaub(cls, id_urlaub):
        session = DBSession.get_session()
        urlaub = session.query(Urlaub).get(int(id_urlaub))
        session.delete(urlaub)
        session.commit()

    #Hier wird die Summe der Punkte für einen Urlaub erhalten:
    @classmethod
    def get_scores(cls):
        session = DBSession.get_session()
        res = session.execute(text('SELECT u.id_urlaub, SUM(p.prio) FROM urlaub as ul,  urlaubwunsch as u, '
                                   'priorisiert as p  WHERE u.id_urlaubwunsch = p.id_urlaubwunsch  and ul.id_urlaub = '
                                   'u.id_urlaub  GROUP BY u.id_urlaub ORDER BY u.id_urlaub ASC;'))
        final = cls.__query_score_to_json(res.all())
        return final
