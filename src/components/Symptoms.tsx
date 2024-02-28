import { View, Text, StyleSheet, ScrollView } from "react-native";
import SymptomsButton from "./SymptomsButton";
import { useState } from "react";

interface SymptomsProps {
  onAdd: (_: string) => void;
  onRemove: (_: string) => void;
}

const Symptoms = ({ onAdd, onRemove }: SymptomsProps) => {
  const [activeSymptoms, setActiveSymptoms] = useState(new Set());
  console.log(activeSymptoms);
  return (
    <ScrollView style={styles.background}>
      <View style={{ padding: 16 }}>
        <Text
          style={{ fontFamily: "Inter500", fontSize: 16, marginBottom: 10 }}
        >
          General
        </Text>
        <View style={styles.category}>
          <SymptomsButton
            SymptomTitle="Chest Pain"
            RightMargin={10}
            onToggle={(isActive) => {
              if (isActive) {
                onAdd("Chest Pain");
              } else {
                onRemove("Chest Pain");
              }
            }}
          />
          <SymptomsButton
            SymptomTitle="Chills/Shivering"
            RightMargin={10}
            onToggle={(isActive) => {
              if (isActive) {
                onAdd("Chills/Shivering");
              } else {
                onRemove("Chills/Shivering");
              }
            }}
          />
        </View>
        <View style={styles.category}>
          <SymptomsButton
            SymptomTitle="Cough"
            RightMargin={10}
            onToggle={(isActive) => {
              if (isActive) {
                onAdd("Cough");
              } else {
                onRemove("Cough");
              }
            }}
          />
          <SymptomsButton
            SymptomTitle="Discharge"
            RightMargin={10}
            onToggle={(isActive) => {
              if (isActive) {
                onAdd("Discharge");
              } else {
                onRemove("Discharge");
              }
            }}
          />
          <SymptomsButton
            SymptomTitle="Dizziness"
            RightMargin={10}
            onToggle={(isActive) => {
              if (isActive) {
                onAdd("Dizziness");
              } else {
                onRemove("Dizziness");
              }
            }}
          />
        </View>
        <View style={styles.category}>
          <SymptomsButton
            SymptomTitle="Fatigue"
            RightMargin={10}
            onToggle={(isActive) => {
              if (isActive) {
                onAdd("Fatigue");
              } else {
                onRemove("Fatigue");
              }
            }}
          />
          <SymptomsButton
            SymptomTitle="Fever"
            RightMargin={10}
            onToggle={(isActive) => {
              if (isActive) {
                onAdd("Fever");
              } else {
                onRemove("Fever");
              }
            }}
          />
          <SymptomsButton
            SymptomTitle="Headache"
            RightMargin={10}
            onToggle={(isActive) => {
              if (isActive) {
                onAdd("Headache");
              } else {
                onRemove("Headache");
              }
            }}
          />
        </View>
        <View style={styles.category}>
          <SymptomsButton
            SymptomTitle="Joint Pain"
            RightMargin={10}
            onToggle={(isActive) => {
              if (isActive) {
                onAdd("Joint Pain");
              } else {
                onRemove("Joint Pain");
              }
            }}
          />
          <SymptomsButton
            SymptomTitle="Muscle Fatigue"
            RightMargin={10}
            onToggle={(isActive) => {
              if (isActive) {
                onAdd("Muscle Fatigue");
              } else {
                onRemove("Muscle Fatigue");
              }
            }}
          />
        </View>
        <View style={styles.category}>
          <SymptomsButton
            SymptomTitle="Sneezing"
            RightMargin={10}
            onToggle={(isActive) => {
              if (isActive) {
                onAdd("Sneezing");
              } else {
                onRemove("Sneezing");
              }
            }}
          />
          <SymptomsButton
            SymptomTitle="Sweats"
            RightMargin={10}
            onToggle={(isActive) => {
              if (isActive) {
                onAdd("Sweats");
              } else {
                onRemove("Sweats");
              }
            }}
          />
          <SymptomsButton
            SymptomTitle="Swelling"
            RightMargin={10}
            onToggle={(isActive) => {
              if (isActive) {
                onAdd("Swelling");
              } else {
                onRemove("Swelling");
              }
            }}
          />
        </View>
        <Text
          style={{ fontFamily: "Inter500", fontSize: 16, marginBottom: 10 }}
        >
          Ear/Nose/Throat
        </Text>
        <View style={styles.category}>
          <SymptomsButton
            SymptomTitle="Dry Mouth"
            RightMargin={10}
            onToggle={(isActive) => {
              if (isActive) {
                onAdd("Dry Mouth");
              } else {
                onRemove("Dry Mouth");
              }
            }}
          />
          <SymptomsButton
            SymptomTitle="Ear Ringing"
            RightMargin={0}
            onToggle={(isActive) => {
              if (isActive) {
                onAdd("Ear Ringing");
              } else {
                onRemove("Ear Ringing");
              }
            }}
          />
        </View>
        <View style={styles.category}>
          <SymptomsButton
            SymptomTitle="Hearing Loss"
            RightMargin={10}
            onToggle={(isActive) => {
              if (isActive) {
                onAdd("Hearing Loss");
              } else {
                onRemove("Hearing Loss");
              }
            }}
          />
          <SymptomsButton
            SymptomTitle="Runny Nose"
            RightMargin={0}
            onToggle={(isActive) => {
              if (isActive) {
                onAdd("Runny Nose");
              } else {
                onRemove("Runny Nose");
              }
            }}
          />
        </View>
        <View style={styles.category}>
          <SymptomsButton
            SymptomTitle="Sore Throat"
            RightMargin={10}
            onToggle={(isActive) => {
              if (isActive) {
                onAdd("Sore Throat");
              } else {
                onRemove("Sore Throat");
              }
            }}
          />
          <SymptomsButton
            SymptomTitle="Stuffy Nose"
            RightMargin={0}
            onToggle={(isActive) => {
              if (isActive) {
                onAdd("Stuffy Nose");
              } else {
                onRemove("Stuffy Nose");
              }
            }}
          />
        </View>
        <View style={styles.category}>
          <SymptomsButton
            SymptomTitle="Toothache"
            RightMargin={10}
            onToggle={(isActive) => {
              if (isActive) {
                onAdd("Toothache");
              } else {
                onRemove("Toothache");
              }
            }}
          />
        </View>
        <Text
          style={{ fontFamily: "Inter500", fontSize: 16, marginBottom: 10 }}
        >
          Gastrointestinal
        </Text>
        <View style={styles.category}>
          <SymptomsButton
            SymptomTitle="Bloating"
            RightMargin={10}
            onToggle={(isActive) => {
              if (isActive) {
                onAdd("Bloating");
              } else {
                onRemove("Bloating");
              }
            }}
          />
          <SymptomsButton
            SymptomTitle="Diarrhea"
            RightMargin={10}
            onToggle={(isActive) => {
              if (isActive) {
                onAdd("Diarrhea");
              } else {
                onRemove("Diarrhea");
              }
            }}
          />
          <SymptomsButton
            SymptomTitle="Constipation"
            RightMargin={0}
            onToggle={(isActive) => {
              if (isActive) {
                onAdd("Constipation");
              } else {
                onRemove("Constipation");
              }
            }}
          />
        </View>
        <View style={styles.category}>
          <SymptomsButton
            SymptomTitle="Gassiness"
            RightMargin={10}
            onToggle={(isActive) => {
              if (isActive) {
                onAdd("Gassiness");
              } else {
                onRemove("Gassiness");
              }
            }}
          />
          <SymptomsButton
            SymptomTitle="Heartburn"
            RightMargin={10}
            onToggle={(isActive) => {
              if (isActive) {
                onAdd("Heartburn");
              } else {
                onRemove("Heartburn");
              }
            }}
          />
          <SymptomsButton
            SymptomTitle="Nausea"
            RightMargin={0}
            onToggle={(isActive) => {
              if (isActive) {
                onAdd("Nausea");
              } else {
                onRemove("Nausea");
              }
            }}
          />
        </View>
        <View style={styles.category}>
          <SymptomsButton
            SymptomTitle="Stomachache"
            RightMargin={10}
            onToggle={(isActive) => {
              if (isActive) {
                onAdd("Stomachache");
              } else {
                onRemove("Stomachache");
              }
            }}
          />
          <SymptomsButton
            SymptomTitle="Vomiting"
            RightMargin={0}
            onToggle={(isActive) => {
              if (isActive) {
                onAdd("Vomiting");
              } else {
                onRemove("Vomiting");
              }
            }}
          />
        </View>
        <Text
          style={{ fontFamily: "Inter500", fontSize: 16, marginBottom: 10 }}
        >
          Skin
        </Text>
        <View style={styles.category}>
          <SymptomsButton
            SymptomTitle="Blister"
            RightMargin={10}
            onToggle={(isActive) => {
              if (isActive) {
                onAdd("Blister");
              } else {
                onRemove("Blister");
              }
            }}
          />
          <SymptomsButton
            SymptomTitle="Burn"
            RightMargin={10}
            onToggle={(isActive) => {
              if (isActive) {
                onAdd("Burn");
              } else {
                onRemove("Burn");
              }
            }}
          />
          <SymptomsButton
            SymptomTitle="Cut/Scrape"
            RightMargin={0}
            onToggle={(isActive) => {
              if (isActive) {
                onAdd("Cut/Scrape");
              } else {
                onRemove("Cut/Scrape");
              }
            }}
          />
        </View>
        <View
          style={{ display: "flex", flexDirection: "row", maxWidth: "100%" }}
        >
          <SymptomsButton
            SymptomTitle="Dryness"
            RightMargin={10}
            onToggle={(isActive) => {
              if (isActive) {
                onAdd("Dryness");
              } else {
                onRemove("Dryness");
              }
            }}
          />
          <SymptomsButton
            SymptomTitle="Itching"
            RightMargin={10}
            onToggle={(isActive) => {
              if (isActive) {
                onAdd("Itching");
              } else {
                onRemove("Itching");
              }
            }}
          />
          <SymptomsButton
            SymptomTitle="Rash"
            RightMargin={0}
            onToggle={(isActive) => {
              if (isActive) {
                onAdd("Rash");
              } else {
                onRemove("Rash");
              }
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "white",
  },
  category: {
    display: "flex",
    flexDirection: "row",
    maxWidth: "100%",
    marginBottom: 10,
  },
});
export default Symptoms;
