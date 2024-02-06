import { View, TouchableOpacity, Text, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import { themeColors } from "../../theme";
import { useDispatch, useSelector } from "react-redux";
import { selectedRestaurant } from "../slices/restaurantSlice";
import { removeFromCart, selectCartItems, selectCartTotal } from "../slices/cartSlice.jsx";

const CartScreen = () => {
  const restaurant = useSelector(selectedRestaurant);
  const navigation = useNavigation();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const [groupedItems, setGroupedItems] = useState({});
  const dispatch = useDispatch();
  const deliveryFee = 3;

  useEffect(() => {
    const items = cartItems.reduce((group, item) => {
      if (group[item.id]) {
        group[item.id].push(item);
      } else {
        group[item.id] = [item];
      }

      return group;
    }, {})

    setGroupedItems(items)
    console.log(cartItems)
  }, [cartItems])

  return (
    <View className="bg-white flex-1">
      <View className="relative py-4 shadow-sm">
        <TouchableOpacity
          style={{ backgroundColor: themeColors.bgColor(1) }}
          className="absolute z-10 rounded-full p-1 shadow top-20 left-4"
          onPress={() => navigation.goBack()}
        >
          <Icon.ArrowLeft strokeWidth={3} stroke="white" />
        </TouchableOpacity>
        <View>
          <Text className="text-center font-bold text-xl mt-20">Your Cart</Text>
          <Text className="text-center text-gray-500">{restaurant.name}</Text>
        </View>
      </View>

      <View
        style={{ backgroundColor: themeColors.bgColor(0.2) }}
        className="flex-row px-4 items-center"
      >
        <Image
          source={require("../../assets/images/bikeGuy.png")}
          className="w-20 h-20 rounded-full"
        />
        <Text className="flex-1 pl-4 font-semibold">
          Deliver in 20:30 minutes
        </Text>
        <TouchableOpacity>
          <Text className="font-bold" style={{ color: themeColors.text }}>
            Change
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="bg-white pt-5"
      >
        {Object.entries(groupedItems).map(([key, items]) => {
          let dish = items[0];
          return (
            <View
              key={key}
              className="flex-row items-center spacex-3 py-2 px-4 bg-white rounded-3xl mb-3 shadow-md"
            >
              <Text className="font-bold px-3" style={{ color: themeColors.text }}>
                {items.length} x
              </Text>
              <Image className="h-14 w-14 rounded-full" source={dish.image}/>
              <Text className="flex-1 font-bold text-gray-700 px-3">{dish.name}</Text>
              <Text className="font-semibold text-base">${dish.price}</Text>
              <TouchableOpacity onPress={() => dispatch(removeFromCart({id: dish.id}))} className="p-1 rounded-full mx-3" style={{backgroundColor: themeColors.bgColor(1)}}>
                <Icon.Minus strokeWidth={2} height={20} width={20} stroke={"white"}/>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
      <View style={{backgroundColor: themeColors.bgColor(0.2)}} className="p-6 px-8 rounded-t-3xl space-y-4">
        <View className="flex-row justify-between">
          <Text className="font-semibold">Subtotal</Text>
          <Text className="font-semibold">${cartTotal}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="font-semibold">Delivery Fee</Text>
          <Text className="font-semibold">${deliveryFee}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="font-extrabold text-lg">Order Total</Text>
          <Text className="font-extrabold text-lg">${cartTotal + deliveryFee}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("OrderPrepairing")} className="p-3 rounded-full" style={{backgroundColor: themeColors.bgColor(1)}}>
            <Text className="text-white text-center font-bold text-lg">Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartScreen;
