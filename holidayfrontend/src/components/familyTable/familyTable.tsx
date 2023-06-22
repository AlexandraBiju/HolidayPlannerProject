import { Button, Stack, TextField } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { GridApiCommunity } from "@mui/x-data-grid/internals";
import axios from "axios";
import _ from "lodash";
import { useEffect, useMemo, useRef, useState } from "react";

/*
Funktion,die die Daten aus der mui-Materialtabelle übernimmt und sie speichert:
*/
function useApiRef() {

  //Referenz auf die Mui-Komponente:
  const apiRef = useRef<null | GridApiCommunity>(null);

  //Erstellt einen Haken,der alle Parameter der Tabelle in MUI speichert:
  const _columns = useMemo(
    () =>
      columns.concat({
        field: "id_familienmitglied",
        headerName: "Delete member",
        width: 500,
        headerAlign: "center",
        align: "center",
        renderCell: (params) => {

          //Hier wird die jeweilige Tabelle gespeichert:
          apiRef.current = params.api;
          return (
            <Stack>
              <Button
                sx={{ backgroundColor: "orange", textAlign: "right" }}
                onClick={() => deleteMember(params.value)}
              >
                Delete
              </Button>
            </Stack>
          );
        },
      }),
    [columns]
  );

  return { apiRef, columns: _columns };
}


//Funktion, die ein Familienmitglied löscht:
const deleteMember = (id: number) => {
  axios
    .delete("http://localhost:8080/familienmitglied/" + id)
    .then((response: any) => {
      alert("successfully deleted.");
      window.location.reload();
    });
};

//Hier werden die Spalten definiert, die man in die Tabelle einfügt:
const columns: GridColDef[] = [
  { field: "name", headerName: "Name", width: 500, editable: true },
  {
    field: "geburtstag",
    headerName: "Birth date",
    width: 500,
    align: "center",
    headerAlign: "center",
    type: "string",
    editable: true,
  },
];

/*
Familientabellenkomponente: 
*/
function FamilyTable() {
  const [familyMembers, setFamilyMembers] = useState<any>([]);
  const [addFamilyMember, setAddFamilyMember] = useState(false);
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");

  //Hier wird eine Anfrage an das Backend gestellt, um uns alle Familienmitglieder zur Verfügung zu stellen:
  const getData = () => {
    axios
      .get("http://localhost:8080/familienmitglieder")
      .then((response: any) => {
        console.log("response", response.data);
        var aux = response.data;
        for (let j = 0; j < aux.length; ++j) {
          aux[j]["id"] = aux[j]["id_familienmitglied"];
        }
        console.log(aux);
        setFamilyMembers(aux);
      });
  };

  //Hier wird eine Anfrage an das Backend gesendet, um ein Familienmitglied hinzuzufügen:
  const onSubmit = (e: any) => {
    axios
      .post("http://localhost:8080/familienmitglied", {
        geburtstag: birthDate,
        name: name,
      })
      .then(() => {
        getData();
      });
    setAddFamilyMember(false);
  };

  //Dies ist ein Hook, der aufgerufen wird, wenn die Seite gerendert wird:
  useEffect(() => {
    getData();
  }, []);

  //Zugriff auf die oben erstellte Referenz:
  const { apiRef, columns } = useApiRef();

  //Funktion, die die Daten in der Datenbank speichert:
  const handleSave = () => {
    var index = 0;
    apiRef.current!.getRowModels().forEach((value: any, key: any) => {
      if (_.isEqual(value, familyMembers[index])) {
        console.log(true);
      } else {
        console.log(false);
        axios.put(
          "http://localhost:8080/familienmitglied/" +
            value["id_familienmitglied"],
          value
        );
      }
      index += 1;
    });
    alert("Data succesfully changed!");
  };

  //Komponentenbeschreibung:
  return (
    <>
      <div className="area">
        <div
          style={{
            paddingTop: "30px",
            background: "#4e54c8",
            color: "#4e54c8",
            opacity: 0,
          }}
        >
          a
        </div>
        {addFamilyMember == false ? (
          <>
            <div
              style={{
                height: 300,
                width: "80%",
                marginLeft: "200px",
              }}
            >
              {/*Haupttabelle: */}
              <DataGrid
                sx={{
                  backgroundColor: "white",
                }}
                rows={familyMembers}
                columns={columns}
                initialState={{
                  pagination: { paginationModel: { pageSize: 5 } },
                }}
                pageSizeOptions={[5, 10, 25]}
                slots={{
                  toolbar: GridToolbar,
                }}
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              sx={{
                marginLeft: "200px",
                backgroundColor: "orange",
                color: "black",
                "&:hover": {
                  backgroundColor: "#F2F3F5",
                },
              }}
            >
              Save
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setAddFamilyMember(true);
              }}
              sx={{
                float: "right",
                marginRight: "183px",
                backgroundColor: "orange",
                color: "black",
                "&:hover": {
                  backgroundColor: "#F2F3F5",
                },
              }}
            >
              Add family member
            </Button>
          </>
        ) : (
            <form 
            onSubmit={onSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              width: "20%",
              marginLeft: "750px",
            }}
          >{/*Familienmitglied hinzufügen:*/}
            <TextField
              required
              onChange={(e) => setName(e.target.value)}
              variant="filled"
              label="Name"
              sx={{
                input: {
                  color: "black",
                  backgroundColor: "white",
                  borderRadius: "5px",
                  fontFamily: "Inter",
                },
                marginBottom: "20px",
              }}
            />
            <TextField
              required
              onChange={(e) => setBirthDate(e.target.value)}
              label="Geburtstag"
              variant="filled"
              sx={{
                input: {
                  color: "black",
                  backgroundColor: "white",
                  fontFamily: "Inter",
                },
                marginBottom: "20px",
              }}
            />
            <Button
              variant="contained"
              sx={{
                marginBottom: "20px",
                backgroundColor: "orange",
                color: "black",
                "&:hover": {
                  backgroundColor: "#F2F3F5",
                },
              }}
              type="submit"
            >
              submit
            </Button>
            <Button
              variant="contained"
              sx={{
                marginBottom: "20px",
                backgroundColor: "orange",
                color: "black",
                "&:hover": {
                  backgroundColor: "#F2F3F5",
                },
              }}
              onClick={() => {
                setAddFamilyMember(false);
                setBirthDate("");
                setName("");
              }}
            >
              cancel
            </Button>
          </form>
        )}
      </div>
    </>
  );
}

export default FamilyTable;
