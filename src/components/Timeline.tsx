import { Text, View, StyleSheet, Pressable } from "react-native";
import {
  Dependent,
  Medication,
  Symptom,
  Vaccination,
  eventNote,
  useDependentIds,
  useDependents,
} from "../app/utils/firebaseUtils";
import { useUserId } from "../app/utils/globalStorage";
import { UserIcon } from "./UserIcons";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Feather } from "@expo/vector-icons";
import { Icon } from "@rneui/themed";

interface TimelineProps {
  accountId: string;
}

// interface TimelineDictProps {
//     date: [
//         {type: string,
//         activeSymptoms: string[],
//         time: string}
//     ]
// }

const Timeline = ({ accountId }: TimelineProps) => {
  const { userId, setUserId } = useUserId();

  const dayjs = require("dayjs");
  var utc = require("dayjs/plugin/utc");
  dayjs.extend(utc);

  const dependentsIdsArray = useDependentIds(userId!);
  const dependents = useDependents(dependentsIdsArray);

  const dependentSymptoms =
    dependents?.[accountId]?.symptoms ?? ({} as { [_: string]: Symptom });

  const dependentMedications =
    dependents?.[accountId]?.medications ?? ({} as { [_: string]: Medication });

  const dependentVaccinations =
    dependents?.[accountId]?.vaccines ?? ({} as { [_: string]: Vaccination });

  const dependentNotes =
    dependents?.[accountId]?.eventNotes ?? ({} as { [_: string]: eventNote });

  const timelineDict: {
    [date: string]: {
      type: string;
      time?: string;
      description: string[];
    }[];
  } = {};

  let counter = 0;

  for (const symptomId in dependentSymptoms) {
    const symptomInfo = dependentSymptoms[symptomId];
    // console.log(symptomId, symptomInfo);
    const seconds = symptomInfo.date.seconds;
    const secondsToDate = new Date(seconds * 1000);
    const formattedDate = dayjs(secondsToDate).format("ddd, MMM DD, YYYY");

    if (formattedDate in timelineDict) {
      timelineDict[formattedDate].push({
        type: "Symptom(s)",
        time: symptomInfo["time"],
        description: symptomInfo["activeSymptoms"] ?? [],
      });
    } else {
      timelineDict[formattedDate] = [
        {
          type: "Symptom(s)",
          time: symptomInfo["time"],
          description: symptomInfo["activeSymptoms"] ?? [],
        },
      ];
    }
  }

  for (const medicationId in dependentMedications) {
    const medicationInfo = dependentMedications[medicationId];
    const medicationName = [medicationInfo["name"]];

    const seconds = medicationInfo.date.seconds;
    const secondsToDate = new Date(seconds * 1000);
    const formattedDate = dayjs(secondsToDate).format("ddd, MMM DD, YYYY");

    if (formattedDate in timelineDict) {
      timelineDict[formattedDate].push({
        type: "Medication",
        time: medicationInfo["time"],
        description: medicationName ?? [],
      });
    } else {
      timelineDict[formattedDate] = [
        {
          type: "Medication",
          time: medicationInfo["time"],
          description: medicationName ?? [],
        },
      ];
    }
  }

  for (const vaccinationId in dependentVaccinations) {
    const vaccinationInfo = dependentVaccinations[vaccinationId];
    const vaccinationName = vaccinationInfo["selectedVaccines"];

    const seconds = vaccinationInfo.date.seconds;
    const secondsToDate = new Date(seconds * 1000);
    const formattedDate = dayjs(secondsToDate).format("ddd, MMM DD, YYYY");

    if (formattedDate in timelineDict) {
      timelineDict[formattedDate].push({
        type: "Vaccination",
        description: vaccinationName ?? [],
      });
    } else {
      timelineDict[formattedDate] = [
        {
          type: "Vaccination",
          description: vaccinationName ?? [],
        },
      ];
    }
  }

  for (const noteId in dependentNotes) {
    const noteInfo = dependentNotes[noteId];
    // console.log(symptomId, symptomInfo);
    const seconds = noteInfo.date.seconds;
    const secondsToDate = new Date(seconds * 1000);
    const formattedDate = dayjs(secondsToDate).format("ddd, MMM DD, YYYY");

    if (formattedDate in timelineDict) {
      timelineDict[formattedDate].push({
        type: "Note",
        time: noteInfo["time"],
        description: [noteInfo["noteTitle"]] ?? [],
      });
    } else {
      timelineDict[formattedDate] = [
        {
          type: "Note",
          time: noteInfo["time"],
          description: [noteInfo["noteTitle"]] ?? [],
        },
      ];
    }
  }

  const sortedTimelines = Object.keys(timelineDict).sort((a, b) => {
    const aDate = Date.parse(a.replaceAll(",", ""));
    const bDate = Date.parse(b.replaceAll(",", ""));
    if (aDate > bDate) {
      return -1;
    }
    if (bDate > aDate) {
      return 1;
    } else {
      return 0;
    }
  });

  console.log(sortedTimelines);

  const timeConvert = (time: string) => {
    let hours = parseInt(time.slice(0, 2));
    if (hours <= 12) {
      return time + " " + "AM";
    } else {
      hours -= 12;
      return hours + time.slice(2, 5) + " " + "PM";
    }
  };

  return (
    <View>
      {sortedTimelines.map((date) => {
        const timelineEvents = timelineDict[date];
        return (
          <View style={styles.timelineContainer}>
            <Text style={styles.dateText}>{date.toUpperCase()}</Text>
            {timelineEvents.map((event) => {
              let time = event.time;
              //   const time = dayjs(event.time).format("h:mm A");
              const type = event.type;
              const descriptions = event.description;
              let dotColor = "";
              if (type === "Symptom(s)") {
                dotColor = "#D16D6A";
              }
              if (type === "Medication") {
                dotColor = "#ECB476";
              }
              if (type === "Vaccination") {
                dotColor = "#8A7EBE";
              }
              if (type === "Note") {
                dotColor = "#9DC284";
              }
              if (time) {
                if (time.length === 5) {
                  time = timeConvert(time);
                }
              }
              return (
                <View style={styles.contentContainer}>
                  <View style={styles.dotContainer}>
                    <Icon name="circle" color={dotColor} size={15} />
                  </View>
                  <View style={styles.textContainer}>
                    {descriptions.map((description) => {
                      return (
                        <View>
                          <Text style={styles.descriptionText}>
                            {description}
                          </Text>
                        </View>
                      );
                    })}
                    <Text style={styles.typeText}>{type}</Text>
                  </View>
                  <View style={styles.timeContainer}>
                    <Text style={styles.descriptionText}>{time}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    // borderColor: "red",
    // borderWidth: 2,
    flexDirection: "row",
    width: 346,
    marginBottom: 10,
    // height: 100,
  },
  dateText: {
    color: "#6B6F6F",
    fontFamily: "Inter600",
    fontSize: 14,
    marginTop: 10,
    marginBottom: 7,
  },
  descriptionText: {
    fontFamily: "Inter400",
    fontSize: 14,
    color: "black",
  },
  dotContainer: {
    width: 20,
    // borderColor: "green",
    // borderWidth: 2,
    marginRight: 8,
    marginTop: 3,
  },
  textContainer: {
    width: "auto",
    // borderColor: "blue",
    // borderWidth: 2,
  },
  timeContainer: {
    position: "absolute",
    right: 0,
  },
  timelineContainer: {},
  typeText: {
    fontFamily: "Inter400",
    fontSize: 14,
    color: "#6B6F6F",
  },
});

export default Timeline;
