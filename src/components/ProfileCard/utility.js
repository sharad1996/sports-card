import { profileData } from "./player_profile_data__2_";

function getFormattedGraphData(profile) {
  const formattedData = profile.SGTrend
    .map((i) => ({
      date: new Date(`${i.Date} ${i.Year}`)
        .toLocaleDateString()
        .replaceAll("/", "-"),
      value: i.SGTotal,
      tooltipContent: i.SGTotal,
    }))
    .sort((i) => new Date(i.date));

  return formattedData;
}

function getAllProfileData () {
  return profileData;
}
export { getFormattedGraphData, getAllProfileData };

