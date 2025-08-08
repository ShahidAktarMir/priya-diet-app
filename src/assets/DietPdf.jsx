// src/organisms/DietPDF.jsx
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.4,
  },

  // Header Section
  header: {
    flexDirection: "row",
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 3,
    borderBottomColor: "#2563eb",
    alignItems: "center",
  },
  headerLeft: {
    flex: 2,
  },
  headerRight: {
    flex: 1,
    alignItems: "flex-end",
  },
  clinicName: {
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
    color: "#1e40af",
    marginBottom: 5,
  },
  clinicTagline: {
    fontSize: 12,
    color: "#6b7280",
    fontStyle: "italic",
  },
  dateInfo: {
    fontSize: 9,
    color: "#6b7280",
    textAlign: "right",
  },

  // Client Info Section
  clientSection: {
    backgroundColor: "#f8fafc",
    padding: 20,
    marginBottom: 25,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: "#1e40af",
    marginBottom: 15,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  clientInfoRow: {
    flexDirection: "row",
    marginBottom: 8,
    alignItems: "center",
  },
  clientLabel: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#374151",
    width: 80,
  },
  clientValue: {
    fontSize: 10,
    color: "#1f2937",
    flex: 1,
  },

  // Diet Plan Section
  dietSection: {
    marginBottom: 25,
  },
  dietTable: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  tableHeaderText: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#ffffff",
    textAlign: "center",
  },
  headerTiming: {
    width: "25%",
  },
  headerFood: {
    width: "55%",
  },
  headerNotes: {
    width: "20%",
  },

  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
    paddingVertical: 12,
    paddingHorizontal: 15,
    minHeight: 45,
  },
  evenRow: {
    backgroundColor: "#f9fafb",
  },
  cellTiming: {
    width: "25%",
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#1e40af",
    paddingRight: 10,
  },
  cellFood: {
    width: "55%",
    fontSize: 10,
    color: "#374151",
    paddingRight: 10,
    lineHeight: 1.3,
  },
  cellNotes: {
    width: "20%",
    fontSize: 9,
    color: "#6b7280",
    fontStyle: "italic",
  },

  // Instructions Section
  instructionsSection: {
    backgroundColor: "#fef3c7",
    padding: 20,
    marginBottom: 20,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#f59e0b",
  },
  instructionsTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "#92400e",
    marginBottom: 10,
  },
  instructionsList: {
    paddingLeft: 15,
  },
  instructionItem: {
    fontSize: 10,
    color: "#78350f",
    marginBottom: 5,
    lineHeight: 1.3,
  },

  // Foods to Avoid Section
  avoidSection: {
    backgroundColor: "#fee2e2",
    padding: 20,
    marginBottom: 25,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#ef4444",
  },
  avoidTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "#991b1b",
    marginBottom: 10,
  },
  avoidText: {
    fontSize: 10,
    color: "#7f1d1d",
    lineHeight: 1.3,
  },

  // Footer Section
  footer: {
    marginTop: "auto",
    paddingTop: 20,
    borderTopWidth: 2,
    borderTopColor: "#e5e7eb",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerLeft: {
    flex: 1,
  },
  footerRight: {
    flex: 1,
    alignItems: "flex-end",
  },
  footerText: {
    fontSize: 9,
    color: "#6b7280",
    lineHeight: 1.2,
  },
  signature: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#1e40af",
    marginBottom: 5,
  },
  credentials: {
    fontSize: 8,
    color: "#9ca3af",
    fontStyle: "italic",
  },
});

function DietPDF({ data }) {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const meals = [
    {
      timing: "Early Morning\n(7:00 AM)",
      food: data.earlyMorning || "As prescribed",
      notes: "On empty stomach",
    },
    {
      timing: "Breakfast\n(8:30 AM)",
      food: data.breakfast || "As prescribed",
      notes: "Main meal",
    },
    {
      timing: "Mid Morning\n(10:30 AM)",
      food: data.midMorning || "As prescribed",
      notes: "Light snack",
    },
    {
      timing: "Lunch\n(12:00-1:30 PM)",
      food: data.lunch || "As prescribed",
      notes: "Complete meal",
    },
    {
      timing: "Evening Snacks\n(5:00-6:00 PM)",
      food: data.eveningSnacks || "As prescribed",
      notes: "Light & healthy",
    },
    {
      timing: "Dinner\n(8:00-9:00 PM)",
      food: data.dinner || "As prescribed",
      notes: "Light dinner",
    },
  ];

  const instructions = [
    "Drink 8-10 glasses of water daily",
    "Eat meals at regular intervals",
    "Chew food slowly and properly",
    "Avoid processed and junk foods",
    "Include physical activity as recommended",
    "Report weekly for progress monitoring",
  ];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.clinicName}>Holistic Fitness by Priya</Text>
            <Text style={styles.clinicTagline}>
              Your Health & Nutrition Partner
            </Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.dateInfo}>Diet Plan Created</Text>
            <Text style={styles.dateInfo}>{currentDate}</Text>
          </View>
        </View>

        {/* Client Information */}
        <View style={styles.clientSection}>
          <Text style={styles.sectionTitle}>Client Information</Text>
          <View style={styles.clientInfoRow}>
            <Text style={styles.clientLabel}>Name:</Text>
            <Text style={styles.clientValue}>
              {data.name || "Not provided"}
            </Text>
            <Text style={styles.clientLabel}>Age:</Text>
            <Text style={styles.clientValue}>{data.age || "Not provided"}</Text>
          </View>
          <View style={styles.clientInfoRow}>
            <Text style={styles.clientLabel}>Gender:</Text>
            <Text style={styles.clientValue}>{data.sex || "Not provided"}</Text>
            <Text style={styles.clientLabel}>Height:</Text>
            <Text style={styles.clientValue}>
              {data.height || "Not provided"}
            </Text>
          </View>
          <View style={styles.clientInfoRow}>
            <Text style={styles.clientLabel}>BMI:</Text>
            <Text style={styles.clientValue}>
              {data.bmi || "Not calculated"}
            </Text>
          </View>
          {data.complications && (
            <View style={styles.clientInfoRow}>
              <Text style={styles.clientLabel}>Health Issues:</Text>
              <Text style={styles.clientValue}>{data.complications}</Text>
            </View>
          )}
          {data.goals && (
            <View style={styles.clientInfoRow}>
              <Text style={styles.clientLabel}>Goals:</Text>
              <Text style={styles.clientValue}>{data.goals}</Text>
            </View>
          )}
        </View>

        {/* Diet Plan Table */}
        <View style={styles.dietSection}>
          <Text style={styles.sectionTitle}>Daily Diet Plan</Text>
          <View style={styles.dietTable}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, styles.headerTiming]}>
                Timing
              </Text>
              <Text style={[styles.tableHeaderText, styles.headerFood]}>
                Food Items
              </Text>
              <Text style={[styles.tableHeaderText, styles.headerNotes]}>
                Notes
              </Text>
            </View>
            {meals.map((meal, index) => (
              <View
                key={index}
                style={[styles.tableRow, index % 2 === 1 && styles.evenRow]}
              >
                <Text style={styles.cellTiming}>{meal.timing}</Text>
                <Text style={styles.cellFood}>{meal.food}</Text>
                <Text style={styles.cellNotes}>{meal.notes}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* General Instructions */}
        <View style={styles.instructionsSection}>
          <Text style={styles.instructionsTitle}>
            🔔 Important Instructions
          </Text>
          <View style={styles.instructionsList}>
            {instructions.map((instruction, index) => (
              <Text key={index} style={styles.instructionItem}>
                • {instruction}
              </Text>
            ))}
          </View>
        </View>

        {/* Foods to Avoid */}
        {data.foodsToAvoid && (
          <View style={styles.avoidSection}>
            <Text style={styles.avoidTitle}>❌ Foods to Avoid</Text>
            <Text style={styles.avoidText}>{data.foodsToAvoid}</Text>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerLeft}>
            <Text style={styles.footerText}>
              This diet plan is valid for 4 weeks from the date of creation.
              {"\n"}
              Please follow up weekly for progress monitoring and adjustments.
            </Text>
            {data.notes && (
              <Text
                style={[
                  styles.footerText,
                  { marginTop: 8, fontStyle: "italic" },
                ]}
              >
                Additional Notes: {data.notes}
              </Text>
            )}
          </View>
          <View style={styles.footerRight}>
            <Text style={styles.signature}>Priya</Text>
            <Text style={styles.credentials}>Certified Nutritionist</Text>
            <Text style={styles.credentials}>Lifestyle & Health Modifier</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default DietPDF;
