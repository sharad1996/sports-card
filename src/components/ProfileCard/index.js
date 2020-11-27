import React from "react";
import { Skeleton } from "@material-ui/lab";
import { Graph } from "./Graph";
import { getFormattedGraphData } from "./utility";
import Header from "./Header";
import "./styles.css";

function ProfileCard(props) {
  const formattedGraphData = getFormattedGraphData(props.profile);
  const condition = (classes1, classes2) =>
    props.toggleTheme ? classes1 : classes2;

  return (
    <div
      className={`custom-container p-0 ${condition(
        "bg-light border-light",
        "border-dark-100 bg-dark-100"
      )} `}
    >
      <Header data={props.profile} {...props} />
      {!props.loading && (
        <div
          className={`w-100 ${condition(
            "custom-border-bottom-light",
            "custom-border-bottom-dark"
          )} user-activity fs-3`}
        >
          <p
            className={`custom-padding-x m-0 text-left ${condition(
              "text-black-70",
              "text-grey-100"
            )}`}
          >
            Latest Activity:{" "}
            <span
              id="latest-activity"
              className={`${condition("text-black-100", "text-white")}`}
            >
              {`${props.profile.MostRecentRound.Score} (${props.profile.MostRecentRound.ScoreToPar}), ${props.profile.MostRecentRound.Course}, UK`}
            </span>
          </p>
        </div>
      )}
      {props.loading && (
        <div className="custom-padding-x mt-5">
          <Skeleton animation="wave" width={"100%"} height={25} />
        </div>
      )}
      {!props.loading && <Graph sgTrendData={formattedGraphData} {...props} />}
      {props.loading && (
        <div className="custom-padding-x">
          <Skeleton animation="wave" width={"100%"} height={300} />
        </div>
      )}
    </div>
  );
}

export { ProfileCard };
