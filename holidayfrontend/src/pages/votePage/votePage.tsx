import axios from "axios";
import Backgroundc from "../../components/backgroundc";
import Navbar from "../../components/navbar/navbar";
import { useEffect, useState } from "react";
import { Button, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useNavigate } from "react-router-dom";

function VotePage() {
  const [familyMembers, setFamilyMembers] = useState<any>([]);
  const [holidays, setHolidays] = useState<any>([]);
  const [holidayID, setHolidayID] = useState(0);
  const [familyID, setFamilyID] = useState(0);
  const [priority, setPriority] = useState(1);
  const navigate = useNavigate();

  //Hier werden die Daten gespeichert, die an die Datenbank gesendet werden:
  const handleChangeFamilyID = (event: SelectChangeEvent) => {
    setFamilyID(parseInt(event.target.value));
  };
  const handleChangeHolidayID = (event: SelectChangeEvent) => {
    setHolidayID(parseInt(event.target.value));
  };
  const handleChangePriority = (event: SelectChangeEvent) => {
    setPriority(parseInt(event.target.value));
  };
  const priorities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  //Hier werden (aus den Daten im Backend)die Familienmitglieder und erstellte Wünsche erhalten:
  const getData = async () => {
    var resFamily = await axios.get("http://localhost:8080/familienmitglieder");
    console.log("response", resFamily.data);

    setFamilyMembers(resFamily.data);

    setFamilyID(resFamily.data[0]["id_familienmitglied"]);

    var resHoliday = await axios.get("http://localhost:8080/urlaubwunsch_u");
    setHolidays(resHoliday.data);
    setHolidayID(resHoliday.data[0]["id_urlaubwunsch"]);
  };

  //Hier wird an das Backend die Priorität gesendet:
  const onSubmit = (e: any) => {
    axios.post("http://localhost:8080/priorisiert", {
      id_familienmitglied: familyID,
      id_urlaubwunsch: holidayID,
      prio: priority,
    });
    alert("Vote succesfully!");
    navigate("/holiday");
  };

  //Dies ist ein Hook, der aufgerufen wird, wenn die Seite gerendert wird:
  useEffect(() => {
    getData();
  }, []);

  //Komponentenbeschreibung:
  return (
    <>
      <div className="context">
        <Navbar />
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
          <form
            onSubmit={onSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              width: "20%",
              marginLeft: "750px",
            }}
          >{/*Hier sind die drei Auswhalmöglichkeiten, die zur Abtimmung führen: */}
            <Select
              id="selectFamily"
              value={familyID.toString()}
              label="Family"
              onChange={handleChangeFamilyID}
              sx={{
                color: "black",
                backgroundColor: "white",
                borderRadius: "5px",
                fontFamily: "Inter",
                marginBottom: "20px",
              }}
            >
              {familyMembers.map((familyMember: any) => (
                <MenuItem
                  key={familyMember["id_familienmitglied"]}
                  value={familyMember["id_familienmitglied"]}
                >
                  {familyMember["name"]}
                </MenuItem>
              ))}
            </Select>
            <Select
              id="selectHolidayID"
              value={holidayID.toString()}
              label="Holiday"
              onChange={handleChangeHolidayID}
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
                  key={holiday["id_urlaubwunsch"]}
                  value={holiday["id_urlaubwunsch"]}
                >
                  {holiday["ort"]}-{holiday["titel"]}-{holiday["zeitraum"]}
                </MenuItem>
              ))}
            </Select>

            <Select
              id="selectPriority"
              value={priority.toString()}
              label="Priority"
              onChange={handleChangePriority}
              sx={{
                color: "black",
                backgroundColor: "white",
                borderRadius: "5px",
                fontFamily: "Inter",
                marginBottom: "20px",
              }}
            >
              {priorities.map((prio: any) => (
                <MenuItem key={prio} value={prio}>
                  {prio}
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
          </form>
        </div>
      </div>
      <Backgroundc />
    </>
  );
}

export default VotePage;
