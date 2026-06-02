import { ScrollView } from "react-native";

import MonthlyExpenses from "@/components/game/MonthlyExpenses";
import PetInteraction from "@/components/game/PetInteraction";
import VisualPiggyBank from "@/components/game/VisualPiggyBank";

export default function GameScreen() {
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        padding: 16,
        gap: 16,
      }}
    >
      <PetInteraction />

      <VisualPiggyBank />

      <MonthlyExpenses
        currentMonth={1}
        balance={50}
        petCost={15}
        onExpensesConfirm={(expenses) => {
          console.log("Gastos:", expenses);
        }}
      />
    </ScrollView>
  );
}
