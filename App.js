import { StatusBar } from "expo-status-bar";
import { ScrollView, Dimensions, View, Text, StyleSheet } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

console.log(SCREEN_WIDTH);

export default function App() {
  return (
    <View style={style.container}>
      <View style={style.city}>
        <Text style={style.cityname}>seoul</Text>
      </View>
      <ScrollView
        //터치해서 밀때 끝까지 밀어야지 넘거암
        pagingEnabled
        contentContainerStyle={style.weather}
        //스크롤방향은 수평으로
        horizontal
        //밑에 페이지표시줄 안보이게
        showsHorizontalScrollIndicator={false}
      >
        <View style={style.day}>
          <Text style={style.temperature}>27</Text>
          <Text style={style.description}>sunny</Text>
        </View>
        <View style={style.day}>
          <Text style={style.temperature}>27</Text>
          <Text style={style.description}>sunny</Text>
        </View>
        <View style={style.day}>
          <Text style={style.temperature}>27</Text>
          <Text style={style.description}>sunny</Text>
        </View>
        <View style={style.day}>
          <Text style={style.temperature}>27</Text>
          <Text style={style.description}>sunny</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  container: { flex: 1, backgroundColor: "tomato" },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityname: {
    fontSize: 68,
    fontWeight: "600",
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  temperature: {
    marginTop: 50,
    fontSize: 178,
  },
  description: {
    marginTop: -30,
    fontSize: 60,
  },
});
