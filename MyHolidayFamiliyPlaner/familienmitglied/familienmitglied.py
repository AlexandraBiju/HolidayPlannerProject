import sqlalchemy as sa
from data.modelbase import ModelBase

#Erstellung der Familienmitglieder-Tabelle:
class Familienmitglied(ModelBase):
    #Tabellenname:
    __tablename__='familienmitglied'

    #Tabellenspaltennamen:
    id_familienmitglied = sa.Column('id_familienmitglied',sa.Integer,primary_key=True, autoincrement=True)
    geburtstag = sa.Column('geburtstag',sa.String,nullable=False)
    name = sa.Column('name',sa.String,nullable=False)

    #Funktion, die eine Zeile aus der Tabelle in Diktionär umwandelt:
    def to_dict(self):
        return dict(id_familienmitglied=self.id_familienmitglied,
                geburtstag=self.geburtstag,
                name=self.name
                    )
