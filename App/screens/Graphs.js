import React from "react";
import { View, Dimensions, Text } from "react-native";

import { Header } from "../components/Header";
import { totalCounts } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import { LineChart, BarChart } from "react-native-chart-kit";
import { useAuth } from "../util/AuthManager";

const Graphs = () => {
  const { loading, data, refetch } = useQuery(totalCounts);


  const { isAuthorized } = useAuth();

  React.useEffect(() => {
    refetch();
  }, [isAuthorized]);


  const counts = data?.counts || [];

  const line = {
    labels: ["Posts", "Users"],
    datasets: [
      {
        data: counts,
        strokeWidth: 0, // optional
      },
    ],
  };

//   const users = newData?.users || [];

  return (
    <View>
      {!loading ? (
        <>
          <BarChart
            data={line}
            width={Dimensions.get("window").width -20} // from react-native
            height={220}
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 0.2) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 0,
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
              marginHorizontal: 10
            }}
          />
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default Graphs;
