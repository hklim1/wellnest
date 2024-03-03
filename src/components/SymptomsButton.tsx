import { Button } from "@rneui/themed";
import { useState } from "react";

interface SymptomTitleProps {
  SymptomTitle: string;
  RightMargin: number;
  onToggle: (isActive: boolean) => void;
}

const SymptomsButton = ({
  SymptomTitle,
  RightMargin,
  onToggle,
}: SymptomTitleProps) => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  console.log(buttonDisabled);

  return (
    <Button
      buttonStyle={{
        width: "auto",
        height: 44,
        backgroundColor: buttonDisabled ? "#0FA6B0" : "#EEF1F1",
        // backgroundColor: "red",
        padding: 10,
        borderRadius: 50,
        marginRight: RightMargin,
      }}
      titleStyle={{
        color: buttonDisabled ? "white" : "#6B6F6F",
        fontFamily: "Inter400",
        fontSize: 16,
      }}
      onPress={() => {
        setButtonDisabled(!buttonDisabled);
        onToggle(!buttonDisabled);
      }}
    >
      {SymptomTitle}
    </Button>
  );
};

export default SymptomsButton;
