import { ScrollView, Text, View } from "react-native";

import MonthlyExpenses from "@/components/game/MonthlyExpenses";
import PetInteraction from "@/components/game/PetInteraction";
import VisualPiggyBank from "@/components/game/VisualPiggyBank";
import { useGame } from "@/context/GameContext";

export default function GameScreen() {
  const { gameState } = useGame();

  const pets = {
    dog: 15,
    cat: 12,
    hamster: 8,
    fish: 5,
    bird: 10,
    turtle: 7,
  };

  const petCost = pets[gameState.selectedPet as keyof typeof pets] || 15;

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        padding: 16,
        gap: 16,
      }}
    >
      <View
        style={{
          backgroundColor: "white",
          padding: 16,
          borderRadius: 12,
          borderWidth: 2,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
          }}
        >
          📅 Mês {gameState.currentMonth}
        </Text>

        <Text
          style={{
            fontSize: 18,
            marginTop: 8,
          }}
        >
          💰 Saldo: R$ {gameState.balance.toFixed(0)}
        </Text>

        <Text
          style={{
            fontSize: 18,
            marginTop: 4,
          }}
        >
          🌱 Investimentos: R$ {gameState.investmentBalance.toFixed(0)}
        </Text>
      </View>

      <PetInteraction />

      <VisualPiggyBank />

      <MonthlyExpenses
        currentMonth={gameState.currentMonth}
        balance={gameState.balance}
        petCost={petCost}
        onExpensesConfirm={(expenses) => {
          console.log("Gastos:", expenses);
        }}
      />
    </ScrollView>
  );
}
