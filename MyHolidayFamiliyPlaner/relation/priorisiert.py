import sqlalchemy as sa
from data.modelbase import ModelBase
from sqlalchemy.orm import relationship

from familienmitglied.familienmitglied import Familienmitglied
from urlaubwunsch.urlaubwunsch import Urlaubwunsch

#Das ist die Tabelle,die die Beziehung von vielen zu vielen in eins zu viele und viele zu eins umwandelt:
class Priorisiert(ModelBase):

    #Tabellenname:
    __tablename__ = 'priorisiert'

    #Tabellenspaltennamen:
    id_familientmitglied = sa.Column(sa.Integer, sa.ForeignKey("familienmitglied.id_familienmitglied", ondelete='CASCADE'), primary_key=True)
    id_urlaubwunsch = sa.Column(sa.Integer, sa.ForeignKey("urlaubwunsch.id_urlaubwunsch", ondelete='CASCADE'),primary_key=True)
    prio = sa.Column('prio', sa.Integer, nullable=False)

    #Beziehung, die Familienmitglied mit priorisiert verbindet(wird in der Modellbasis platziert,die viele (N) enthält):
    familienmitglied = relationship(Familienmitglied, primaryjoin=id_familientmitglied == Familienmitglied.id_familienmitglied, passive_deletes=True)
    #Beziehung, die Urlaubwunsch mit priorisiert verbindet(wird in der Modellbasis platziert,die viele (N) enthält):
    urlaubwunsch = relationship(Urlaubwunsch, primaryjoin=id_urlaubwunsch == Urlaubwunsch.id_urlaubwunsch, passive_deletes=True)


