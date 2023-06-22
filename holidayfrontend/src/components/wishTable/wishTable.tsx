import {
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
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
        field: "id_urlaubwunsch",
        headerName: "Delete wish",
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
                onClick={() => deleteWish(params.value)}
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

//Funktion, die ein Urlaubwunsch löscht:
const deleteWish = (id: number) => {
  axios
    .delete("http://localhost:8080/urlaubwunsch/" + id)
    .then((response: any) => {
      alert("successfully deleted.");
      window.location.reload();
    });
};

//Hier werden die Spalten definiert, die man in die Tabelle einfügt:
const columns: GridColDef[] = [
  { field: "ort", headerName: "Location", width: 500, editable: true },
  {
    field: "beschreibung",
    headerName: "Description",
    width: 500,
    align: "center",
    headerAlign: "center",
    type: "string",
    editable: true,
  },
];

/*
Urlaubwunschtabellenkomponente: 
*/
function WishTable() {
  const [wishes, setWishes] = useState<any>([]);
  const [addWish, setAddWish] = useState(false);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [holidayID, setHolidayID] = useState(0);
  const [holidays, setHolidays] = useState<any>([]);

   //Hier werden zwei Anfragen an das Backend gestellt, um uns die Urlaubwünsche und Namen zur Verfügung zu stellen:
  const getData = async () => {
    var resWishes = await axios.get("http://localhost:8080/urlaubwunsche");
    console.log("response", resWishes.data);
    var aux = resWishes.data;
    for (let j = 0; j < aux.length; ++j) {
      aux[j]["id"] = aux[j]["id_urlaubwunsch"];
    }
    console.log(aux);
    setWishes(aux);
    var resHoliday = await axios.get("http://localhost:8080/urlaube");
    setHolidays(resHoliday.data);
    setHolidayID(resHoliday.data[0]["id_urlaub"]);
  };

  //Hier wird eine Anfrage an das Backend gesendet, um ein Urlaubwunsch hinzuzufügen:
  const onSubmit = (e: any) => {
    axios
      .post("http://localhost:8080/urlaubwunsch", {
        ort: location,
        beschreibung: description,
        id_urlaub: holidayID,
      })
      .then(() => {
        getData();
      });
    setAddWish(false);
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
      if (_.isEqual(value, wishes[index])) {
        console.log(true);
      } else {
        console.log(false);
        axios.put(
          "http://localhost:8080/urlaubwunsch/" + value["id_urlaubwunsch"],
          value
        );
      }
      index += 1;
    });
    alert("Data succesfully changed!");
  };
  const handleChange = (event: SelectChangeEvent) => {
    setHolidayID(parseInt(event.target.value));
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
        {addWish == false ? (
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
                rows={wishes}
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
                setAddWish(true);
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
              Add wish
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
          >{/*Urlaubwunsch hinzufügen:*/}
            <TextField
              required
              onChange={(e) => setLocation(e.target.value)}
              variant="filled"
              label="Ort"
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
              onChange={(e) => setDescription(e.target.value)}
              label="Beschreibung"
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
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={holidayID.toString()}
              label="Holiday"
              onChange={handleChange}
              sx={{
                color: "black",
                backgroundColor: "white",
                borderRadius: "5px",
                fontFamily: "Inter",
                marginBottom: "20px",
              }}
            >
              {holidays.map((holiday: any) => (
                <MenuItem
                  key={holiday["id_urlaub"]}
                  value={holiday["id_urlaub"]}
                >
                  {holiday["titel"]} {holiday["zeitraum"]}
                </MenuItem>
              ))}
            </Select>
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
              Submit
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
                setAddWish(false);
                setLocation("");
                setDescription("");
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

export default WishTable;
