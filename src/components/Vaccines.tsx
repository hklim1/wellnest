import { View, Text, StyleSheet, ScrollView } from "react-native";
import SymptomsButton from "./SymptomsButton";
import { useState } from "react";

interface VaccinesProps {
  onAdd: (_: string) => void;
  onRemove: (_: string) => void;
}

const Vaccines = ({ onAdd, onRemove }: VaccinesProps) => {
  const [vaccines, setVaccines] = useState(new Set());
  return (
    <ScrollView style={styles.background}>
      <View style={{ padding: 16 }}>
        <View style={styles.category}>
          <SymptomsButton
            SymptomTitle="Chickenpox"
            RightMargin={10}
            onToggle={(isActive) => {
              if (isActive) {
                onAdd("Chickenpox");
              } else {
                onRemove("Chickenpox");
              }
            }}
          />
          <SymptomsButton
            SymptomTitle="COVID-19"
            RightMargin={10}
            onToggle={(isActive) => {
              if (isActive) {
                onAdd("COVID-19");
              } else {
                onRemove("COVID-19");
              }
            }}
          />
          <SymptomsButton
            SymptomTitle="Flu"
            RightMargin={10}
            onToggle={(isActive) => {
              if (isActive) {
                onAdd("Flu");
              } else {
                onRemove("Flu");
              }
            }}
          />
        </View>
        <View style={styles.category}>
          <SymptomsButton
            SymptomTitle="Hepatitis A"
            RightMargin={10}
            onToggle={(isActive) => {
              if (isActive) {
                onAdd("Hepatitis A");
              } else {
                onRemove("Hepatitis A");
              }
            }}
          />
          <SymptomsButton
            SymptomTitle="Hepatitis B"
            RightMargin={10}
            onToggle={(isActive) => {
              if (isActive) {
                onAdd("Hepatitis B");
              } else {
                onRemove("Hepatitis B");
              }
            }}
          />
          <SymptomsButton
            SymptomTitle="HPV"
            RightMargin={10}
            onToggle={(isActive) => {
              if (isActive) {
                onAdd("HPV");
              } else {
                onRemove("HPV");
              }
            }}
          />
        </View>
        <View style={styles.category}>
          <SymptomsButton
            SymptomTitle="MenB"
            RightMargin={10}
            onToggle={(isActive) => {
              if (isActive) {
                onAdd("MenB");
              } else {
                onRemove("MenB");
              }
            }}
          />
          <SymptomsButton
            SymptomTitle="Meningococcal"
            RightMargin={10}
            onToggle={(isActive) => {
              if (isActive) {
                onAdd("Meningococcal");
              } else {
                onRemove("Meningococcal");
              }
            }}
          />
          <SymptomsButton
            SymptomTitle="MMR"
            RightMargin={10}
            onToggle={(isActive) => {
              if (isActive) {
                onAdd("MMR");
              } else {
                onRemove("MMR");
              }
            }}
          />
        </View>
        <View style={styles.category}>
          <SymptomsButton
            SymptomTitle="Pneumococcal"
            RightMargin={10}
            onToggle={(isActive) => {
              if (isActive) {
                onAdd("Pneumococcal");
              } else {
                onRemove("Pneumococcal");
              }
            }}
          />
          <SymptomsButton
            SymptomTitle="RSV"
            RightMargin={10}
            onToggle={(isActive) => {
              if (isActive) {
                onAdd("RSV");
              } else {
                onRemove("RSV");
              }
            }}
          />
          <SymptomsButton
            SymptomTitle="Shingles"
            RightMargin={10}
            onToggle={(isActive) => {
              if (isActive) {
                onAdd("Shingles");
              } else {
                onRemove("Shingles");
              }
            }}
          />
        </View>
        <View
          style={{ display: "flex", flexDirection: "row", maxWidth: "100%" }}
        >
          <SymptomsButton
            SymptomTitle="Tdap"
            RightMargin={10}
            onToggle={(isActive) => {
              if (isActive) {
                onAdd("Tdap");
              } else {
                onRemove("Tdap");
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
export default Vaccines;
