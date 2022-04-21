import React, { useEffect, useState } from "react";
import "./Ucomplaints.css";
import ReportIcon from "@mui/icons-material/ReportGmailerrorred";
import Axios from "../../../constant/axios";
import { errorToast, infoToast } from "../../../constant/toast";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Ucomplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState("All");
  useEffect(() => {
    setLoading(true);
    if (options === "All") {
      Axios.get("/complaint/get/All")
        .then(({ data }) => {
          setLoading(false);
          if (data.status) {
            setComplaints(data.complaint);
          } else infoToast(data.message || "something wrong");
        })
        .catch((e) => {
          setLoading(false);
          errorToast("something wrong");
        });
    } else {
      Axios.get("/complaint/get/Own")
        .then(({ data }) => {
          setLoading(false);
          if (data.status) {
            if (options === "Solved") {
              setComplaints(
                data.complaint.filter((i) => i.status === "solved")
              );
            } else if (options === "Blocked")
              setComplaints(
                data.complaint.filter((i) => i.status === "blocked")
              );
            else setComplaints(data.complaint);
          } else infoToast(data.message || "something wrong");
        })
        .catch((e) => {
          setLoading(false);
          errorToast("something wrong");
        });
    }
  }, [options]);

  return (
    <div className="ucom-box-main">
      <div className="ucom-btns">
        <button
          onClick={() => setOptions("All")}
          style={{ background: options === "All" && "#ab72dc" }}
        >
          All
        </button>
        <button
          onClick={() => setOptions("Mycom")}
          style={{ background: options === "Mycom" && "#ab72dc" }}
        >
          My Complaints
        </button>
        <button
          onClick={() => setOptions("Solved")}
          style={{ background: options === "Solved" && "#ab72dc" }}
        >
          Solved
        </button>
        <button
          onClick={() => setOptions("Blocked")}
          style={{ background: options === "Blocked" && "#ab72dc" }}
        >
          Blocked
        </button>
      </div>
      <div className="ucom-content-main">
        {loading && (
          <div className="com-box">
            <center>
              <Box>
                <CircularProgress />
              </Box>
            </center>
          </div>
        )}
        {!loading && complaints.length === 0 && (
          <div className="com-box">
            <center>No complaints</center>
          </div>
        )}
        {complaints.length !== 0 &&
          !loading &&
          complaints.map((item) => {
            return (
              <div className="com-box">
                <p>{item.message}</p>
                {
                  options ==='All' &&
                <div className="report-btn">
                  <ReportIcon />
                </div>
                }
                {
                  options !== 'All' && item.reply &&
                <div className="reply-area">
                  <h6>Reply</h6>
                  <p>
                    {item.reply}
                  </p>
                </div>
                }
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Ucomplaints;
