import React from "react";
import InputField from "../HomePage/Input";
import PropTypes from "prop-types";
export default function PointCheckboxList({
  busDetails,
  from,
  to,
  selectPoints,
  handlePointChange,
  stopType,
}) {
  const points = busDetails
    .filter((bus) => {
      if (stopType === "boardingStop") {
        return bus.from === from;
      } else if (stopType === "dropingStop") {
        return bus.to === to;
      }
      return false;
    })
    .flatMap((stop) => stop[stopType].map((point) => point.stopingPoint))
    .filter((value, index, self) => self.indexOf(value) === index);
  return (
    <>
      {points.map((point) => (
        <label key={point}>
          <InputField
            type="checkbox"
            value={point}
            checked={selectPoints.includes(point)}
            onChange={(e) => handlePointChange(e, stopType)}
          />
          {point}
          <br />
        </label>
      ))}
    </>
  );
}

PointCheckboxList.propTypes = {
  busDetails: PropTypes.array.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  selectPoints: PropTypes.array.isRequired,
  handlePointChange: PropTypes.func.isRequired,
  stopType: PropTypes.oneOf(["boardingStop", "dropingStop"]).isRequired,
};
