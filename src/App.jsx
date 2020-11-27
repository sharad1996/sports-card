import React from "react";
import { ProfileCard } from "./components";
import { getAllProfileData } from "./components/ProfileCard/utility";
import { ArrowForwardIos, ArrowBackIos } from "@material-ui/icons";

function App() {
  const [loading, setLoading] = React.useState(true);
  const [toggleTheme, setToggleTheme] = React.useState(true);
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [loading]);

  const profiles = getAllProfileData();

  return (
    <div>
      <div
        className="d-flex justify-content-end my-3"
        style={{ maxWidth: "69%" }}
      >
        <button
          id="light-btn"
          onClick={() => {
            setToggleTheme(true);
          }}
          className="outline-none bg-light rounded-pill"
        >
          Light
        </button>
        <button
          id="dark-btn"
          onClick={() => {
            setToggleTheme(false);
          }}
          className="outline-none bg-dark text-white rounded-pill"
        >
          Dark
        </button>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        {current > 0 && (
          <ArrowBackIos
            onClick={() => { setCurrent(current - 1); setLoading(true); } }
            color="primary"
            style={{ cursor: 'pointer' }}
          />
        )}
        {profiles.map(
          (item, index) =>
            index === current && (
              <ProfileCard
                key={index}
                profile={item}
                loading={loading}
                toggleTheme={toggleTheme}
              />
            )
        )}
        {current < profiles.length - 1 && (
          <ArrowForwardIos
            onClick={() => { setCurrent(current + 1); setLoading(true); } }
            color="primary"
            style={{ cursor: 'pointer' }}
          />
        )}
      </div>
    </div>
  );
}

export default App;
