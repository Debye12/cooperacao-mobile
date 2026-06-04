import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { router } from "expo-router";

import { COLORS } from "@/constants/colors";
import { useGame } from "@/context/GameContext";

export default function GameEnding() {
  const { gameState } = useGame();

  const totalEarned = gameState.monthlyIncome * 12;

  const finalBalance = gameState.balance + gameState.investmentBalance;

  const totalInvested = gameState.monthlyExpenses.reduce(
    (sum, month) => sum + (month.investments || 0),
    0,
  );

  const getPerformanceLevel = () => {
    if (finalBalance >= totalEarned * 1.2) {
      return "expert";
    }

    if (finalBalance >= totalEarned * 1.1) {
      return "great";
    }

    if (finalBalance >= totalEarned * 0.9) {
      return "good";
    }

    return "learning";
  };
  const performanceData = {
    expert: {
      emoji: "🏆",
      title: "MESTRE FINANCEIRO",
      message: "Você é um verdadeiro gênio do dinheiro!",
      achievement: "Conquistou o Troféu de Ouro",
    },

    great: {
      emoji: "⭐",
      title: "SUPER INTELIGENTE",
      message: "Parabéns! Você fez escolhas muito inteligentes!",
      achievement: "Conquistou a Medalha de Prata",
    },

    good: {
      emoji: "👍",
      title: "MUITO BOM",
      message: "Você aprendeu muito sobre dinheiro!",
      achievement: "Conquistou a Medalha de Bronze",
    },

    learning: {
      emoji: "📚",
      title: "CONTINUE APRENDENDO",
      message: "Cada erro é um aprendizado incrível!",
      achievement: "Conquistou o Certificado de Coragem",
    },
  };

  const performance =
    performanceData[getPerformanceLevel() as keyof typeof performanceData];

  const restartGame = () => {
    router.replace("/");
  };
  return (
    <ScrollView
      contentContainerStyle={{
        padding: 16,
        gap: 16,
      }}
    >
      <View style={styles.performanceCard}>
        <Text style={styles.emoji}>{performance.emoji}</Text>

        <Text style={styles.title}>{performance.title}</Text>

        <Text style={styles.message}>{performance.message}</Text>

        <View style={styles.statBox}>
          <Text style={styles.statLabel}>💰 Dinheiro Final</Text>

          <Text style={styles.statValue}>R$ {finalBalance.toFixed(0)}</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statLabel}>💎 Investido</Text>

          <Text style={styles.statValue}>R$ {totalInvested.toFixed(0)}</Text>
        </View>
      </View>
      {gameState.achievements.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>🏅 Suas Conquistas</Text>

          {gameState.achievements.map((achievement) => (
            <Text key={achievement} style={styles.achievement}>
              • {achievement}
            </Text>
          ))}
        </View>
      )}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>🎓 Você Virou um Expert</Text>

        <Text style={styles.lesson}>🐾 Como cuidar de um bichinho</Text>

        <Text style={styles.lesson}>🤔 Diferença entre querer e precisar</Text>

        <Text style={styles.lesson}>🌱 Fazer o dinheiro crescer</Text>

        <Text style={styles.lesson}>🛡️ Se preparar para emergências</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.finalText}>🎉 Sua aventura terminou!</Text>

        <Text style={styles.message}>
          {gameState.playerName}, você aprendeu muito sobre dinheiro e
          responsabilidade.
        </Text>

        <TouchableOpacity style={styles.button} onPress={restartGame}>
          <Text style={styles.buttonText}>Jogar Novamente 🎮</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = {
  performanceCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    alignItems: "center" as const,
    borderWidth: 2,
    borderColor: COLORS.border,
  },

  emoji: {
    fontSize: 80,
    marginBottom: 12,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold" as const,
    color: COLORS.dark,
    textAlign: "center" as const,
    marginBottom: 8,
  },

  message: {
    fontSize: 16,
    textAlign: "center" as const,
    color: COLORS.darkAccent,
    marginBottom: 16,
  },

  statBox: {
    width: "100%" as const,
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 12,
    marginTop: 10,
    alignItems: "center" as const,
  },

  statLabel: {
    fontSize: 14,
    color: COLORS.darkAccent,
  },

  statValue: {
    fontSize: 24,
    fontWeight: "bold" as const,
    color: COLORS.dark,
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: COLORS.border,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold" as const,
    color: COLORS.dark,
    marginBottom: 12,
    textAlign: "center" as const,
  },

  achievement: {
    fontSize: 16,
    color: COLORS.darkAccent,
    marginBottom: 8,
  },

  lesson: {
    fontSize: 16,
    color: COLORS.darkAccent,
    marginBottom: 10,
  },

  finalText: {
    fontSize: 24,
    fontWeight: "bold" as const,
    color: COLORS.dark,
    textAlign: "center" as const,
    marginBottom: 12,
  },

  button: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 20,
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold" as const,
    textAlign: "center" as const,
  },
};
