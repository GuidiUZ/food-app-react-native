import { StatusBar } from "expo-status-bar";
import { View, Text, TextInput, ScrollView } from "react-native";
import * as Icon from "react-native-feather";
import { themeColors } from "../../theme";
import Categories from "../components/Categories";
import { featured } from "../../constants";
import Featured from "../components/Featured";

const HomeScreen = () => {
  return (
    <View className="bg-white flex-1">
      <View className="flex-row items-center space-x-2 px-4 pb-2">
        <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-400 mt-16">
          <Icon.Search height="25" width="25" stroke="gray" />
          <TextInput className="ml-2 flex-1" placeholder="Restaurant" />
          <View className="flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-l-gray-400">
            <Icon.MapPin height="20" width="20" stroke="gray" />
            <Text className="text-gray-600">BS.AS</Text>
          </View>
        </View>
        <View
          style={{ backgroundColor: themeColors.bgColor(1) }}
          className="p-3 rounded-full mt-16"
        >
          <Icon.Sliders
            height="20"
            width="20"
            strokeWidth={2.5}
            stroke="white"
          />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <Categories />

        <View className="mt-5 ">
          {[featured, featured, featured].map((item, index) => {
            return (
              <Featured 
              key={index}
              title={item.title}
              restaurants={item.restaurants}
              description={item.description}
              />
            )
          })}
        </View>
      </ScrollView>
      <StatusBar barStyle="dark-content" />
    </View>
  );
};

export default HomeScreen;
