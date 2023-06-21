import sqlalchemy as sa
import sqlalchemy.orm as orm
from data.modelbase import ModelBase
#Eröffung  einer Session zur Datenbank:
class DBSession:

    __session = None

    @classmethod
    def get_session(cls):
        if cls.__session!=None:
            return cls.__session
#Die Anmeldeinformationen, die uns mit der Datenbank verbinden:
        connection_string="postgresql+psycopg2://postgres:1234@localhost/familyplaner"
        print(f"Connecting to database:{connection_string}")

        engine = sa.create_engine(connection_string,echo=True)
        Session = orm.sessionmaker(bind=engine)
        cls.__session=Session()

        ModelBase.metadata.create_all(engine)
        return cls.__session
