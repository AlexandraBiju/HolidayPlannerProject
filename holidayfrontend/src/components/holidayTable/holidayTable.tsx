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
        field: "id_urlaub",
        headerName: "Delete holiday",
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
                onClick={() => deleteHoliday(params.value)}
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

//Funktion, die ein Urlaub löscht:
const deleteHoliday = (id: number) => {
  axios.delete("http://localhost:8080/urlaub/" + id).then((response: any) => {
    alert("successfully deleted.");
    window.location.reload();
  });
};

//Hier werden die Spalten definiert, die man in die Tabelle einfügt:
const columns: GridColDef[] = [
  { field: "titel", headerName: "Title", width: 300, editable: true },
  {
    field: "zeitraum",
    headerName: "Period",
    width: 300,
    align: "center",
    headerAlign: "center",
    type: "string",
    editable: true,
  },
  {
    field: "prio",
    headerName: "Score",
    width: 300,
    align: "center",
    headerAlign: "center",
    type: "string",
    editable: false,
  },
];

/*
Urlaubtabellenkomponente: 
*/
function HolidayTable() {
  const [holidays, setHolidays] = useState<any>([]);
  const [addHoliday, setAddHoliday] = useState(false);
  const [title, setTitle] = useState("");
  const [period, setPeriod] = useState("");

  //Hier werden zwei Anfragen an das Backend gestellt, um uns die Urlaube und Scores zur Verfügung zu stellen:
  const getData = async () => {
    var res = await axios.get("http://localhost:8080/urlaube");
    console.log("response", res.data);
    var aux = res.data;
    for (let j = 0; j < aux.length; ++j) {
      aux[j]["id"] = aux[j]["id_urlaub"];
      aux[j]["prio"] = 0;
    }
    var resScores = await axios.get("http://localhost:8080/urlaubscore");
    for (let j = 0; j < resScores.data.length; ++j) {
      for (let k = 0; k < aux.length; ++k) {
        if (aux[k]["id"] == resScores.data[j]["id_urlaub"]) {
          aux[k]["prio"] = resScores.data[j]["prio"];
        }
      }
    }
    console.log(aux);
    setHolidays(aux);
  };

  //Hier wird eine Anfrage an das Backend gesendet, um ein Urlaub hinzuzufügen:
  const onSubmit = (e: any) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/urlaub", {
        titel: title,
        zeitraum: period,
      })
      .then(() => {
        getData();
      });
    setAddHoliday(false);
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
      if (_.isEqual(value, holidays[index])) {
        console.log(true);
      } else {
        console.log(false);
        axios.put("http://localhost:8080/urlaub/" + value["id_urlaub"], value);
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
        {addHoliday == false ? (
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
                rows={holidays}
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
                setAddHoliday(true);
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
              Add holiday
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
          >{/*Urlaub hinzufügen:*/}
            <TextField
              required
              onChange={(e) => setTitle(e.target.value)}
              variant="filled"
              label="Titel"
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
              onChange={(e) => setPeriod(e.target.value)}
              label="Zeitraum"
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
              type="button"
              sx={{
                marginBottom: "20px",
                backgroundColor: "orange",
                color: "black",
                "&:hover": {
                  backgroundColor: "#F2F3F5",
                },
              }}
              onClick={() => {
                setAddHoliday(false);
                setTitle("");
                setPeriod("");
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

export default HolidayTable;
