import sqlalchemy as sa
from data.modelbase import ModelBase

#Erstellung der Urlaub-Tabelle:
class Urlaub(ModelBase):
    #Tabellenname:
    __tablename__='urlaub'

    #Tabellenspaltennamen:
    id_urlaub = sa.Column('id_urlaub',sa.Integer,primary_key=True, autoincrement=True)
    zeitraum = sa.Column('zeitraum',sa.String,nullable=False)
    titel = sa.Column('titel',sa.String,nullable=False)

    #Funktion, die eine Zeile aus der Tabelle in Diktionär umwandelt:
    def to_dict(self):
        return dict(id_urlaub=self.id_urlaub,
                zeitraum=self.zeitraum,
                titel=self.titel
                    )