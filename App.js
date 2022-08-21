import * as Location from "expo-location";
import { useEffect, useState } from "react";
import {
  ScrollView,
  Dimensions,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Fontisto } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const API_KEY = processe.env.API_KEY;

const icons = {
  Cloud: "cloudy",
  Clear: "day-sunny",
  Snow: "snow",
  Rain: "rain",
  Thunderstorm: "lightning",
  Drizzle: "rains",
};

console.log(SCREEN_WIDTH);

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);

  const getWeather = async () => {
    //앱을 사용할 때만 위치를 사용함
    const { granted } = await Location.requestForegroundPermissionsAsync();
    // grandted , 허가를 받았다면
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });

    //도시명을 얻을 수 있음
    try {
      const location = await Location.reverseGeocodeAsync(
        {
          latitude,
          longitude,
        },
        { useGoogleMaps: false }
      );
      // setCity(location[0].city);
      // console.log(location[0].city);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alert&appid=${API_KEY}&units=metric`
      );
      const json = await response.json();
      // setDays(json.daily);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={style.container}>
      <View style={style.city}>
        <Text style={style.cityname}>{city}</Text>
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
        {days.length === 0 ? (
          <View style={style.day}>
            <ActivityIndicator
              style={{ marginTop: 10 }}
              color="white"
              size="large"
            />
          </View>
        ) : (
          days.map((day, index) => (
            <View key={index} style={style.day}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-end",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Text style={style.temperature}>
                  {parseFloat(day.temp.day).toFixed(1)}
                </Text>
              </View>
              <Fontisto
                name={icons[day.weather[0].main]}
                size={68}
                color="white"
              />

              <Text style={style.description}>{day.weather[0].main}</Text>
              <Text style={style.tinyText}>{day.weather[0].description}</Text>
            </View>
          ))
        )}
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
  tinyText: {
    fontSize: 20,
  },
});
