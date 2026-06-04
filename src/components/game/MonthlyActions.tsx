import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { COLORS } from "@/constants/colors";
import { useGame } from "@/context/GameContext";

import MonthlyExpenses from "./MonthlyExpenses";
import PetInteraction from "./PetInteraction";
import VisualPiggyBank from "./VisualPiggyBank";

export default function MonthlyActions() {
  const { gameState, updateGameState } = useGame();

  const handleExpensesConfirm = (
    expenses: Record<string, number>,
    extraEarnings = 0,
  ) => {
    const totalExpenses = Object.values(expenses).reduce(
      (sum, value) => sum + value,
      0,
    );

    const newBalance = gameState.balance + extraEarnings - totalExpenses;

    updateGameState({
      balance: Math.max(0, newBalance),
    });
  };

  const handleNextMonth = () => {
    updateGameState({
      currentMonth: gameState.currentMonth + 1,
      balance: gameState.balance + gameState.monthlyIncome,
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.month}>📅 Mês {gameState.currentMonth}</Text>

        <Text style={styles.money}>💰 R$ {gameState.balance.toFixed(0)}</Text>

        <Text style={styles.investment}>
          🌱 R$ {gameState.investmentBalance.toFixed(0)}
        </Text>
      </View>

      <PetInteraction />

      <VisualPiggyBank />

      <MonthlyExpenses
        currentMonth={gameState.currentMonth}
        balance={gameState.balance}
        petCost={15}
        onExpensesConfirm={handleExpensesConfirm}
      />

      <TouchableOpacity style={styles.nextButton} onPress={handleNextMonth}>
        <Text style={styles.nextButtonText}>Próximo Mês ➜</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    gap: 16,
  },

  header: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: "center",
  },

  month: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.dark,
  },

  money: {
    fontSize: 20,
    marginTop: 8,
    color: COLORS.secondary,
    fontWeight: "bold",
  },

  investment: {
    fontSize: 18,
    marginTop: 4,
    color: COLORS.primary,
    fontWeight: "600",
  },

  nextButton: {
    backgroundColor: COLORS.secondary,
    padding: 18,
    borderRadius: 12,
    marginBottom: 30,
  },

  nextButtonText: {
    color: COLORS.white,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});
