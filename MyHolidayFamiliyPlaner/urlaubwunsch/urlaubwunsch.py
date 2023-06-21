import sqlalchemy as sa
from sqlalchemy.orm import relationship

from data.modelbase import ModelBase
from urlaub.urlaub import Urlaub

#Erstellung der Urlaubwunsch-Tabelle:
class Urlaubwunsch(ModelBase):
    #Tabellenname:
    __tablename__ = 'urlaubwunsch'

    #Tabellenspaltennamen:
    id_urlaubwunsch = sa.Column('id_urlaubwunsch', sa.Integer, primary_key=True, autoincrement=True)
    ort = sa.Column('ort', sa.String, nullable=False)
    beschreibung = sa.Column('beschreibung', sa.String, nullable=False)
    id_urlaub = sa.Column(sa.Integer, sa.ForeignKey("urlaub.id_urlaub", ondelete='CASCADE'), nullable=False)

    #Beziehung, die Urlaub mit Urlaubwunsch verbindet(wird in der Modellbasis platziert,die viele (N) enthält):
    urlaubwunsch = relationship(Urlaub, primaryjoin=id_urlaub == Urlaub.id_urlaub, passive_deletes=True)

    #Funktion, die eine Zeile aus der Tabelle in Diktionär umwandelt:
    def to_dict(self):
        return dict(id_urlaubwunsch=self.id_urlaubwunsch,
                    ort=self.ort,
                    beschreibung=self.beschreibung,
                    id_urlaub=self.id_urlaub)
